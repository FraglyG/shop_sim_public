export async function updateRibbonCartIcon() {
    try {
        const response = await fetch('/v1/api/item/get/cart');
        const result = await response.json();
        if (!result.success) {
            console.error('Failed to update ribbon cart icon', result.error || result.message || 'Unknown error');
            return;
        };

        const badge = document.getElementById("cart_badge");
        if (!badge) {
            console.error('Failed to update ribbon cart icon', 'Badge element not found');
            return;
        };

        const cartCount = result.cart.length;
        badge.style.display = cartCount <= 0 ? 'none' : '';
        badge.textContent = cartCount.toString();

    } catch (error) {
        console.error('Failed to update ribbon cart icon', error);
    }
}