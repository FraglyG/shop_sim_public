import { ShopItem } from "../../mongo/models/item";

function currencyFormat(num: number) {
    return `R${num.toFixed(2)}`;
}

export function CheckoutItem({ item, quantity }: { item: ShopItem, quantity: number }) {

    return <div class="checkout_item">
        <p class="checkout_item_id" style="display: none">{item.id}</p>
        <div class="checkout_item_image">
            <img src={item.images[0]} />
        </div>
        <div class="checkout_item_details">
            <div class="checkout_item_info">
                <p class="checkout_item_name">{item.name}</p>
                <p class="checkout_item_description">{item.description}</p>
            </div>
            <div class="checkout_item_pricing">
                <p class="checkout_item_price">{currencyFormat(item.price)}</p>
                <p class="help_text_small" style="margin-top: 4px;">X</p>
                <p class="checkout_item_count">{quantity}</p>
                <p class="help_text_small" style="margin-top: 4px;">=</p>
                <p class="checkout_item_total">{currencyFormat(item.price * quantity)}</p>
            </div>
        </div>
        <div class="checkout_item_action_ribbon">
            <sl-button class="checkout_item_remove" variant="danger" size="small" circle outline>
                <sl-icon name="x-lg"></sl-icon>
            </sl-button>
        </div>
    </div>
}