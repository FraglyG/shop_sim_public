import { ShopItem } from "../../mongo/models/item";
import { ShopUser } from "../../mongo/models/user";
import { BaseHtml } from "../components/BaseHtml";
import { Ribbon } from "../components/Ribbon";

export function PageItem({ user, item }: { user?: ShopUser, item: ShopItem }) {
    const categoryName = item.category[0].toUpperCase() + item.category.substring(1).toLowerCase();
    const itemRating = item.ratingAverage ?? 0;

    return <BaseHtml stylesheets={["page_item.css"]}>
        <body>
            <Ribbon user={user} />

            {/* I know this hiarchy looks funny lol */}
            <div class="page_container_container">
                <div class="page_container">

                    <div class="breadcrumb">
                        <sl-breadcrumb>
                            <sl-breadcrumb-item href="/"> <sl-icon slot="prefix" name="house"></sl-icon> Home </sl-breadcrumb-item>
                            <sl-breadcrumb-item>{categoryName}</sl-breadcrumb-item>
                            <sl-breadcrumb-item href={"/item/" + item.id}>{item.name}</sl-breadcrumb-item>
                        </sl-breadcrumb>
                    </div>

                    <div class="item_page">
                        <img class="item_image" src={item.images[0]} />

                        <div class="item_info">
                            <h1 style="margin: 0; margin-bottom: 5px;">{item.name}</h1>
                            <p style="margin: 0;">{item.description}</p>

                            <div class="item_desc">
                                <sl-divider></sl-divider>

                                <p>{item.longDescription}</p>

                                <sl-divider></sl-divider>

                                <div style="display: flex; flex-direction: row; gap: 25px; align-items: center; ">
                                    <p>Price: R{item.price}</p>
                                    <p>Stock: {item.stock}</p>
                                </div>

                                <div style="display: flex; flex-direction: row; gap: 5px; align-items: center; ">
                                    <sl-rating label="Rating" value={itemRating} precision="0.1" readonly></sl-rating>
                                    <p style="margin: 0;" class="help_text_small">{item.ratingCount ?? 0} Ratings</p>
                                </div>
                            </div>

                            <div style="display: flex; align-items: center; justify-content: flex-start; width: 100%; margin-top: 50px; gap: 25px">
                                <sl-input class="buy_amount" type="number" placeholder="1" style="width: 100px;" pattern="/^[1-9]\d*$/" autocomplete="off"></sl-input>
                                <sl-button class="buy_button" variant="primary">Buy</sl-button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </body>

        <script type="module" src="/dist_frontend/item_page.js"></script>
    </BaseHtml>
}