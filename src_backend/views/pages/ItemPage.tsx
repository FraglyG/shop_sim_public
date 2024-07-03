import { BaseHtml } from "../components/BaseHtml";
import { Ribbon } from "../components/Ribbon";

export function PageItem() {
    return <BaseHtml stylesheets={["page_home.css"]}>
        <body>
            <Ribbon />

            <div id="item_list" class="item_list">

            </div>
        </body>

        <script src="/dist_frontend/item_page.js"></script>
    </BaseHtml>
}