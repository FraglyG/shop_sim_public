import { ShopUser } from "../../mongo/models/user";
import { Logo } from "./Logo";

export function Ribbon({ user }: { user?: ShopUser }) {
    const username = user?.username;
    const initials = username ? username[0].toUpperCase() + username[1].toLowerCase() : undefined;

    return <div class="main_ribbon">
        <Logo />

        <div class="main_ribbon_right">
            {username ? `<sl-avatar class="main_ribbon_avatar" initials="${initials}"></sl-avatar>` : `<sl-button class="main_ribbon_login">Login</sl-button>`}
        </div>

        <script src="/dist_frontend/components/ribbon.js"></script>
    </div>
}