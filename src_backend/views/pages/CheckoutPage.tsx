import { ShopUser } from "../../mongo/models/user";
import { BaseHtml } from "../components/BaseHtml";
import { CheckoutItem } from "../components/CheckoutItem.";
import { Login } from "../components/Login";
import { Ribbon } from "../components/Ribbon";

function currencyFormat(num: number) {
    return `R${num.toFixed(2)}`;
}

export function PageCheckout({ user }: { user?: ShopUser }) {
    const cart = user?.cart;
    const costTotal = cart?.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0) ?? 0;
    const shippingCost = 180.00;

    return <BaseHtml stylesheets={["page_checkout.css"]}>
        <body>
            <Ribbon user={user} />
            <Login type="login" hidden={true} />

            <div class="page_container">

                <div class="checkout_page">

                    <h1>Checkout Page</h1>


                    <div class="checkout_page_details">
                        {/* CART ITEM LIST */}
                        <div class="item_list">
                            {!cart ? <div class="checkout_empty"><h2>Your cart is emty</h2></div> : cart.map(({ item, quantity }) =>
                                <CheckoutItem item={item} quantity={quantity} />
                            )}
                        </div>

                        <div class="receipt_container">
                            {/* CART PAYMENT INFO */}
                            <div class="receipt">

                                <h2>Payment</h2>

                                <sl-divider></sl-divider>

                                {/* ITEM LIST */}
                                <div class="receipt_item_list">
                                    {!cart ? <div class="checkout_empty"><h2>Your cart is emty</h2></div> : cart.map(({ item, quantity }) =>
                                        <div class="receipt_item">
                                            <p class="receipt_item_id" style="display: none">{item.id}</p>
                                            <p class="receipt_item_name">{item.name}</p>
                                            <p class="receipt_item_cost">{`${currencyFormat(item.price)} x ${quantity} = ${currencyFormat(item.price * quantity)}`}</p>
                                        </div>
                                    )}
                                </div>

                                <sl-divider></sl-divider>

                                {/* VAT, Shipping */}

                                <div class="receipt_info">
                                    <p>SubTotal:</p>
                                    <p id="subtotal_amount">{currencyFormat(costTotal)}</p>
                                </div>

                                <br />
                                <div class="receipt_info">
                                    <p>VAT:</p>
                                    <p id="vat_amount">{currencyFormat(costTotal * 0.15)}</p>
                                </div>

                                <br />
                                <div class="receipt_info">
                                    <p>Shipping:</p>
                                    <p id="shipping_amount">{currencyFormat(shippingCost)}</p>
                                </div>

                                <sl-divider></sl-divider>

                                <div class="receipt_info receipt_total">
                                    <p>Total:</p>
                                    <p id="total_amount">{currencyFormat(costTotal + shippingCost + costTotal * 0.15)}</p>
                                </div>

                            </div>

                            {/* CHECKOUT BUTTON */}
                            <div class="checkout_button">
                                <sl-button type="primary" id="checkout_button">Checkout</sl-button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </body>

        <script type="module" src="/dist_frontend/checkout_page.js"></script>
    </BaseHtml>
}