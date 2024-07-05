import { toastNotification } from "./modules/notification.js";
import { updateRibbonCartIcon } from "./modules/ribbonCart.js";

document.addEventListener("DOMContentLoaded", async () => {
    const itemId = window.location.pathname.split('/').pop();
    if (!itemId) return;

    const buyButton = document.querySelector('.buy_button') as HTMLButtonElement;

    buyButton.addEventListener('click', async () => {
        try {
            const rawQuantity = (document.querySelector('.buy_amount') as HTMLInputElement).value;
            const quantity = parseInt(rawQuantity || "1");
            if (!quantity || quantity <= 0) return toastNotification('Invalid Quantity', 'Please enter a valid quantity', 'danger');

            const response = await fetch('/v1/api/item/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: [{ itemId, quantity }] })
            });

            const result = await response.json();
            if (!result.success) return toastNotification('Failed to add item', result.error || result.message || 'Unknown error', 'danger');

            toastNotification('Added To Cart', 'This item was succesfully added to your cart!', 'success');
            updateRibbonCartIcon();
        } catch (error) {
            if (error instanceof Error) toastNotification('Failed to add item', error.message || 'Unknown error', 'danger');
            else toastNotification('Failed to add item', 'Unknown error', 'danger');
        }
    });
})