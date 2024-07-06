/*

<form class="shop_item">
    <p class="shop_item_id" style="display: none;"></p>
    <sl-input class="shop_item_name" label="Item Name" placeholder="Type Here..." required> </sl-input>
    <sl-input class="shop_item_description" label="Brief Description" placeholder="Type Here..." required> </sl-input>
    <sl-textarea class="shop_item_long_description" label="Item Description" placeholder="Type Here..." required> </sl-textarea>

    <div class="item_row" style="gap: 50px;">
        <sl-input style="width: 120px;" class="shop_item_price" type="number" label="Price" placeholder="Price..." required> </sl-input>
        <sl-input style="width: 120px;" class="shop_item_stock" type="number" label="Stock" placeholder="Stock..." required> </sl-input>
    </div>

    <sl-select class="shop_item_category" label="Category" required>
        <sl-option value="food">Food</sl-option >
        <sl-option value="drink">Drink</sl-option >
        <sl-option value="clothing">Clothing</sl-option >
        <sl-option value="electronics">Electronics</sl-option >
        <sl-option value="other">Other</sl-option >
    </sl-select>

    <sl-input class="shop_item_image" inputmode="url" label="Item Thumbnail" help-text="( For Example: https://example.com/image.png )" placeholder="Image URL..."> </sl-input>

    <div class="item_row shop_item_action_row">
        <sl-button class="shop_item_save" variant="success" size="small">
            <sl-icon slot="prefix" name="floppy"></sl-icon>
            Save
        </sl-button>
        <sl-button class="shop_item_delete" variant="danger" size="small">
            <sl-icon slot="prefix" name="trash"></sl-icon>
            Delete
        </sl-button>
    </div>
</form>

*/

import { toastNotification } from "./modules/notification.js";

const adminContent = document.getElementById("admin_content") as HTMLDivElement;

function clearAdminContent(complete: boolean = false) {
    if (!adminContent) return;

    while (adminContent.firstChild) adminContent.removeChild(adminContent.firstChild);
    if (!complete) adminContent.innerHTML = "<p>Nothing Here...</p>";
}

function createShopItem(item?: ShopItem) {
    const form = document.createElement("form");
    form.className = "shop_item";

    const id = document.createElement("p");
    id.className = "shop_item_id";
    id.style.display = "none";
    id.innerText = item?.id || "";
    form.appendChild(id);

    // GENERAL INFO

    const name = document.createElement("sl-input");
    name.className = "shop_item_name";
    (name as any).label = "Item Name";
    (name as any).placeholder = "Type Here...";
    (name as any).required = true;
    (name as any).value = item?.name || "";
    form.appendChild(name);

    const description = document.createElement("sl-input");
    description.className = "shop_item_description";
    (description as any).label = "Brief Description";
    (description as any).placeholder = "Type Here...";
    (description as any).required = true;
    (description as any).value = item?.description || "";
    form.appendChild(description);

    const longDescription = document.createElement("sl-textarea");
    longDescription.className = "shop_item_long_description";
    (longDescription as any).label = "Item Description";
    (longDescription as any).placeholder = "Type Here...";
    (longDescription as any).required = true;
    (longDescription as any).value = item?.longDescription || "";
    form.appendChild(longDescription);

    const itemRow = document.createElement("div");
    itemRow.className = "item_row";
    itemRow.style.gap = "50px";
    form.appendChild(itemRow);

    // PRICE + FINANCE

    const price = document.createElement("sl-input");
    price.className = "shop_item_price";
    price.style.width = "120px";
    (price as any).type = "number";
    (price as any).label = "Price";
    (price as any).placeholder = "Price...";
    (price as any).required = true;
    (price as any).value = item?.price || "";
    itemRow.appendChild(price);

    const stock = document.createElement("sl-input");
    stock.className = "shop_item_stock";
    stock.style.width = "120px";
    (stock as any).type = "number";
    (stock as any).label = "Stock";
    (stock as any).placeholder = "Stock...";
    (stock as any).required = true;
    (stock as any).value = item?.stock || "";
    itemRow.appendChild(stock);

    // CATEGORY

    const category = document.createElement("sl-select");
    category.className = "shop_item_category";
    (category as any).label = "Category";
    (category as any).required = true;
    form.appendChild(category);

    const food = document.createElement("sl-option");
    (food as any).value = "food";
    food.innerText = "Food";
    category.appendChild(food);

    const drink = document.createElement("sl-option");
    (drink as any).value = "drink";
    drink.innerText = "Drink";
    category.appendChild(drink);

    const clothing = document.createElement("sl-option");
    (clothing as any).value = "clothing";
    clothing.innerText = "Clothing";
    category.appendChild(clothing);

    const electronics = document.createElement("sl-option");
    (electronics as any).value = "electronics";
    electronics.innerText = "Electronics";
    category.appendChild(electronics);

    const other = document.createElement("sl-option");
    (other as any).value = "other";
    other.innerText = "Other";
    category.appendChild(other);

    setTimeout(() => {
        if (item) (category as any).value = item.category || "";
    }, 500)

    // IMAGE

    const image = document.createElement("sl-input");
    image.className = "shop_item_image";
    (image as any).inputmode = "url";
    (image as any).label = "Item Thumbnail";
    (image as any).helpText = "(e.g https://example.com/image.png)";
    (image as any).placeholder = "Image URL...";
    (image as any).value = item?.images[0] || "";
    form.appendChild(image);

    // ACTION ROW

    const actionRow = document.createElement("div");
    actionRow.className = "item_row shop_item_action_row";
    form.appendChild(actionRow);

    const save = document.createElement("sl-button");
    save.className = "shop_item_save";
    (save as any).variant = "success";
    (save as any).size = "small";
    actionRow.appendChild(save);

    const saveIcon = document.createElement("sl-icon");
    saveIcon.slot = "prefix";
    (saveIcon as any).name = "floppy";
    save.appendChild(saveIcon);

    save.innerText = item ? "Save" : "Create";

    const del = document.createElement("sl-button");
    del.className = "shop_item_delete";
    (del as any).variant = "danger";
    (del as any).size = "small";
    actionRow.appendChild(del);

    const delIcon = document.createElement("sl-icon");
    delIcon.slot = "prefix";
    (delIcon as any).name = "trash";
    del.appendChild(delIcon);

    del.innerText = "Delete";

    return form;
}

const searchButton = document.getElementById("search_button") as HTMLButtonElement;
const searchBar = document.getElementById("search_bar") as HTMLInputElement;

searchButton.addEventListener("click", async () => {
    const search = searchBar.value;
    if (!search) return;

    clearAdminContent();

    const result = await fetch(`/v1/api/item/search?q=${search}`).then(res => res.json());
    if (!result) return;

    if (!result.success) return toastNotification("Something went wrong", result.error || "Unknown error", "danger");

    const items = result.items;
    if (!items) return clearAdminContent();

    const item = items[0];
    if (!item) return clearAdminContent();

    loadItem(item);
})

// ITEM LOADING

function loadItem(item?: ShopItem) {
    clearAdminContent(true);
    adminContent.appendChild(createShopItem(item));

    const saveButton = document.querySelector(".shop_item_save") as HTMLButtonElement;
    const deleteButton = document.querySelector(".shop_item_delete") as HTMLButtonElement;

    saveButton.addEventListener("click", storeCurrentItem);
    deleteButton.addEventListener("click", deleteCurrentItem);
}

// ITEM CRUD

function getItemFromInputs() {
    let id = (document.querySelector(".shop_item_id") as HTMLParagraphElement).innerText || undefined;
    let name = (document.querySelector(".shop_item_name") as HTMLInputElement).value;
    let description = (document.querySelector(".shop_item_description") as HTMLInputElement).value;
    let longDescription = (document.querySelector(".shop_item_long_description") as HTMLTextAreaElement).value;
    let price: string | number = (document.querySelector(".shop_item_price") as HTMLInputElement).value;
    let stock: string | number = (document.querySelector(".shop_item_stock") as HTMLInputElement).value;
    let category = (document.querySelector(".shop_item_category") as HTMLSelectElement).value;
    let image = (document.querySelector(".shop_item_image") as HTMLInputElement).value;

    // Convert to number
    price = parseFloat(price);
    stock = parseInt(stock);

    return { id, name, description, longDescription, price, stock, category, images: [image] };
}

async function deleteCurrentItem() {
    try {
        const currentItem = getItemFromInputs();
        if (!currentItem.id) return clearAdminContent();

        const result = await fetch(`/v1/api/item/delete/${currentItem.id}`, { method: "DELETE" }).then(res => res.json());

        if (!result) return toastNotification("Something went wrong", "Unknown error");
        if (!result.success) return toastNotification("Something went wrong", result.error || "Unknown error");

        clearAdminContent();
        toastNotification("Item Deleted", "The item has been successfully deleted", "success");
    } catch (error) {
        if (error instanceof Error) toastNotification("Something went wrong", error.message, "danger");
        else toastNotification("Something went wrong", "Unknown error", "danger");
    }
}

async function storeCurrentItem() {
    try {
        const currentItem = getItemFromInputs();
        if (!currentItem) return;

        const result = await fetch(`/v1/api/item/${currentItem.id ? "update" : "create"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentItem),
        }).then(res => res.json());

        if (!result) return toastNotification("Something went wrong", "Unknown error", "danger");
        if (!result.success) return toastNotification("Something went wrong", result.error || "Unknown error", "danger");

        const newItem = result.item;
        loadItem(newItem);

        toastNotification("Item Saved", "The item has been successfully saved", "success");
    } catch (error) {
        if (error instanceof Error) toastNotification("Something went wrong", error.message, "danger");
        else toastNotification("Something went wrong", "Unknown error", "danger");
    }
}

const newButton = document.getElementById("new_button") as HTMLButtonElement;
newButton.addEventListener("click", () => loadItem());