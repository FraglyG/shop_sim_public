import { toastNotification } from "./modules/notification.js";
import { updateRibbonCartIcon } from "./modules/ribbonCart.js";

function getNumberFromElement(el: Element) {
    const numberString = el.textContent || "0";
    const numberRegexed = numberString.replace(/[^0-9.]/g, '');
    return parseFloat(numberRegexed);
}

function currencyFormat(num: number) {
    return `R${num.toFixed(2)}`;
}

async function removeCartItem(checkoutItem: HTMLDivElement) {
    // remove element
    checkoutItem.classList.add("anim_fade_left");
    setTimeout(() => checkoutItem.remove(), 500)

    // remove from cart
    const itemId = checkoutItem.getElementsByClassName("checkout_item_id")[0].textContent;
    const itemCost = getNumberFromElement(checkoutItem.getElementsByClassName("checkout_item_total")[0]);

    const response = await fetch("/v1/api/item/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: [itemId] })
    });

    const result = await response.json();
    if (!result.success) alert(result.error);

    // remove item from receipt
    const receiptItem = document.getElementsByClassName("receipt_item_id");
    for (let i = 0; i < receiptItem.length; i++) {
        const item = receiptItem[i] as HTMLParagraphElement;
        if (item.textContent != itemId) continue;

        const receipt = item.parentElement!;
        receipt.classList.add("anim_fade_top");
        setTimeout(() => receipt.remove(), 500)
    }

    // update receipt totals
    const subtotalAmount = document.getElementById("subtotal_amount") as HTMLParagraphElement;
    const vatAmount = document.getElementById("vat_amount") as HTMLParagraphElement;
    const shippingAmount = document.getElementById("shipping_amount") as HTMLParagraphElement;
    const totalAmount = document.getElementById("total_amount") as HTMLParagraphElement;

    const newSubtotalAmount = getNumberFromElement(subtotalAmount) - itemCost;
    const newVatAmount = newSubtotalAmount * 0.15;
    const newShippingAmount = getNumberFromElement(shippingAmount);
    const newTotalAmount = newSubtotalAmount + newVatAmount + newShippingAmount;

    subtotalAmount.textContent = currencyFormat(newSubtotalAmount);
    vatAmount.textContent = currencyFormat(newVatAmount);
    totalAmount.textContent = currencyFormat(newTotalAmount);

    // update ribbon cart notif
    updateRibbonCartIcon();
}

document.addEventListener("DOMContentLoaded", () => {
    const removeButtons = document.getElementsByClassName("checkout_item_remove");
    for (let i = 0; i < removeButtons.length; i++) {
        const button = removeButtons[i];
        const checkoutItem = button.parentElement!.parentElement!;

        button.addEventListener("click", async () => {
            removeCartItem(checkoutItem as HTMLDivElement)
        });
    }
})


const buyButton = document.getElementById("checkout_button") as HTMLButtonElement;
buyButton.addEventListener("click", async () => {
    console.log("Checkout button clicked")
    buyButton.setAttribute("loading", "");

    try {
        const buyResponse = await fetch("/v1/api/item/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });

        const buyResult = await buyResponse.json();
        if (!buyResult.success) return toastNotification("Failed to make purchase", buyResult.error || buyResult.message || "Unknown error", "danger");

        // go to success page
        window.location.href = "/purchase/success";

    } catch (error) {
        if (error instanceof Error) toastNotification("Failed to make purchase", error.message || "Unknown error", "danger");
        else toastNotification("Failed to make purchase", "Unknown error", "danger");
    } finally {
        buyButton.removeAttribute("loading");
    }
})