import { ShopUser } from "../../mongo/models/user";
import { BaseHtml } from "../components/BaseHtml";
import { Login } from "../components/Login";
import { Ribbon } from "../components/Ribbon";

export function PageHome({ user }: { user?: ShopUser }) {
    return <BaseHtml stylesheets={["page_home.css"]}>
        <body>
            <Ribbon user={user} />
            <Login type="login" hidden={true} />

            <div id="item_list" class="item_list"></div>
        </body>

        <script src="/dist_frontend/home_page.js"></script>
    </BaseHtml>
}