import { ShopUser } from "../../mongo/models/user";
import { BaseHtml } from "../components/BaseHtml";
import { Login } from "../components/Login";
import { Ribbon } from "../components/Ribbon";

export function PageAdmin({ user }: { user?: ShopUser }) {
    return <BaseHtml stylesheets={["page_admin.css"]}>
        <body>
            <Ribbon user={user} />
            <Login type="login" hidden={true} />

            <div class="page_container">
                <div class="admin_page">
                    <div class="admin_action_ribbon">

                        {/* NEW BUTTON */}
                        <sl-button id="new_button" variant="success">
                            <sl-icon slot="prefix" name="plus-lg"></sl-icon>
                            New
                        </sl-button>

                        {/* SEARCH BAR */}
                        <div class="admin_search_bar">
                            <sl-input id="search_bar" class="search_bar" placeholder="Search..." style="width: 200px;"> </sl-input>
                            <sl-button id="search_button"> <sl-icon slot="prefix" name="search"></sl-icon> </sl-button>
                        </div>

                    </div>

                    <br />

                    <div id="admin_content" class="admin_content">
                        {/* load all items here on frontend */}


                        {/* EXAMPLE */}
                        {/* 
                        
                        export interface ShopItem {
                            id: string,
                            name: string,
                            description: string,
                            longDescription: string,

                            price: number,
                            stock: number,
                            category: ItemCategory,
                            images: string[],

                            ratingAverage: number, // 0-5
                            ratingCount: number,
                        }
                        */}

                        <p>Nothing Here...</p>

                    </div>

                </div>
            </div>
        </body>

        <script type="module" src="/dist_frontend/admin_page.js"></script>
    </BaseHtml>
}