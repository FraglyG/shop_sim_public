import { BaseHtml } from "../components/BaseHtml";
import { Login } from "../components/Login";
import { Ribbon } from "../components/Ribbon";

export function PageHome() {
    return <BaseHtml stylesheets={["page_home.css"]}>
        <body>
            <Ribbon />
            <Login type="login" hidden={true} />

            <div id="item_list" class="item_list"></div>
        </body>

        <script src="/dist_frontend/home_page.js"></script>
        <script src="/dist_frontend/authentication.js"></script>
    </BaseHtml>
}