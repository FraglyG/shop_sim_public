import { ShopUser } from "../../mongo/models/user";
import { BaseHtml } from "../components/BaseHtml";
import { Login } from "../components/Login";
import { Ribbon } from "../components/Ribbon";

export function PageBought({ user }: { user?: ShopUser }) {
    return <BaseHtml stylesheets={["page_bought.css"]}>
        <body>
            <Ribbon user={user} />
            <Login type="login" hidden={true} />

            <div class="page_container">
                <div class="bought_details">
                    <h1>Thank you for your purchase!</h1>
                    <p>Your order will be delivered to you shortly.</p>
                </div>
            </div>

        </body>

        <script src="/dist_frontend/home_page.js"></script>
    </BaseHtml>
}