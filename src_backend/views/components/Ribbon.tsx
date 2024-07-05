import { ShopUser } from "../../mongo/models/user";
import { Logo } from "./Logo";

export function Ribbon({ user }: { user?: ShopUser }) {
    const username = user?.username;
    const initials = username ? username[0].toUpperCase() + username[1].toLowerCase() : undefined;

    const cartCount = user?.cart.length ?? 0;

    return <div class="main_ribbon">
        <Logo />

        <div class="main_ribbon_right">
            <sl-button style="margin-inline-start: 1rem;" size="large" circle href="/checkout">
                <sl-icon name="basket3"></sl-icon>
                <sl-badge id="cart_badge" variant="primary" pill style={cartCount <= 0 ? "display: none;" : ""}>{cartCount}</sl-badge>
            </sl-button>

            {username ? `<sl-avatar class="main_ribbon_avatar" initials="${initials}"></sl-avatar>` : `<sl-button class="main_ribbon_login">Login</sl-button>`}
        </div>

        <script src="/dist_frontend/components/ribbon.js"></script>
    </div>
}