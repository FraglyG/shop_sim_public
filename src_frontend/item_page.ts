function toastNotification(title: string, description: string) {
    const alert = document.createElement('sl-alert');
    (alert as any).variant = 'primary';
    (alert as any).duration = '3000';
    (alert as any).closable = true;

    const icon = document.createElement('sl-icon');
    icon.slot = 'icon';
    (icon as any).name = 'info-circle';

    const strong = document.createElement('strong');
    strong.textContent = title;

    const br = document.createElement('br');

    const text = document.createTextNode(description);

    alert.appendChild(icon);
    alert.appendChild(strong);
    alert.appendChild(br);
    alert.appendChild(text);

    document.body.appendChild(alert);
    (alert as any).toast();
}

document.addEventListener("DOMContentLoaded", async () => {
    const buyButton = document.querySelector('.buy_button') as HTMLButtonElement;

    buyButton.addEventListener('click', async () => {
        // const response = await fetch('/v1/api/item/buy', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ itemId: 1 })
        // });

        // const result = await response.json();

        // if (!result.success) return toastNotification('Failed to buy item', result.error || 'Unknown error');

        toastNotification('Added To Cart', 'This item was succesfully added to your cart!');
    });
})