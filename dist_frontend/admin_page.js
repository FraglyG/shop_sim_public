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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { toastNotification } from "./modules/notification.js";
var adminContent = document.getElementById("admin_content");
function clearAdminContent(complete) {
    if (complete === void 0) { complete = false; }
    if (!adminContent)
        return;
    while (adminContent.firstChild)
        adminContent.removeChild(adminContent.firstChild);
    if (!complete)
        adminContent.innerHTML = "<p>Nothing Here...</p>";
}
function createShopItem(item) {
    var form = document.createElement("form");
    form.className = "shop_item";
    var id = document.createElement("p");
    id.className = "shop_item_id";
    id.style.display = "none";
    id.innerText = (item === null || item === void 0 ? void 0 : item.id) || "";
    form.appendChild(id);
    // GENERAL INFO
    var name = document.createElement("sl-input");
    name.className = "shop_item_name";
    name.label = "Item Name";
    name.placeholder = "Type Here...";
    name.required = true;
    name.value = (item === null || item === void 0 ? void 0 : item.name) || "";
    form.appendChild(name);
    var description = document.createElement("sl-input");
    description.className = "shop_item_description";
    description.label = "Brief Description";
    description.placeholder = "Type Here...";
    description.required = true;
    description.value = (item === null || item === void 0 ? void 0 : item.description) || "";
    form.appendChild(description);
    var longDescription = document.createElement("sl-textarea");
    longDescription.className = "shop_item_long_description";
    longDescription.label = "Item Description";
    longDescription.placeholder = "Type Here...";
    longDescription.required = true;
    longDescription.value = (item === null || item === void 0 ? void 0 : item.longDescription) || "";
    form.appendChild(longDescription);
    var itemRow = document.createElement("div");
    itemRow.className = "item_row";
    itemRow.style.gap = "50px";
    form.appendChild(itemRow);
    // PRICE + FINANCE
    var price = document.createElement("sl-input");
    price.className = "shop_item_price";
    price.style.width = "120px";
    price.type = "number";
    price.label = "Price";
    price.placeholder = "Price...";
    price.required = true;
    price.value = (item === null || item === void 0 ? void 0 : item.price) || "";
    itemRow.appendChild(price);
    var stock = document.createElement("sl-input");
    stock.className = "shop_item_stock";
    stock.style.width = "120px";
    stock.type = "number";
    stock.label = "Stock";
    stock.placeholder = "Stock...";
    stock.required = true;
    stock.value = (item === null || item === void 0 ? void 0 : item.stock) || "";
    itemRow.appendChild(stock);
    // CATEGORY
    var category = document.createElement("sl-select");
    category.className = "shop_item_category";
    category.label = "Category";
    category.required = true;
    form.appendChild(category);
    var food = document.createElement("sl-option");
    food.value = "food";
    food.innerText = "Food";
    category.appendChild(food);
    var drink = document.createElement("sl-option");
    drink.value = "drink";
    drink.innerText = "Drink";
    category.appendChild(drink);
    var clothing = document.createElement("sl-option");
    clothing.value = "clothing";
    clothing.innerText = "Clothing";
    category.appendChild(clothing);
    var electronics = document.createElement("sl-option");
    electronics.value = "electronics";
    electronics.innerText = "Electronics";
    category.appendChild(electronics);
    var other = document.createElement("sl-option");
    other.value = "other";
    other.innerText = "Other";
    category.appendChild(other);
    setTimeout(function () {
        if (item)
            category.value = item.category || "";
    }, 500);
    // IMAGE
    var image = document.createElement("sl-input");
    image.className = "shop_item_image";
    image.inputmode = "url";
    image.label = "Item Thumbnail";
    image.helpText = "(e.g https://example.com/image.png)";
    image.placeholder = "Image URL...";
    image.value = (item === null || item === void 0 ? void 0 : item.images[0]) || "";
    form.appendChild(image);
    // ACTION ROW
    var actionRow = document.createElement("div");
    actionRow.className = "item_row shop_item_action_row";
    form.appendChild(actionRow);
    var save = document.createElement("sl-button");
    save.className = "shop_item_save";
    save.variant = "success";
    save.size = "small";
    actionRow.appendChild(save);
    var saveIcon = document.createElement("sl-icon");
    saveIcon.slot = "prefix";
    saveIcon.name = "floppy";
    save.appendChild(saveIcon);
    save.innerText = item ? "Save" : "Create";
    var del = document.createElement("sl-button");
    del.className = "shop_item_delete";
    del.variant = "danger";
    del.size = "small";
    actionRow.appendChild(del);
    var delIcon = document.createElement("sl-icon");
    delIcon.slot = "prefix";
    delIcon.name = "trash";
    del.appendChild(delIcon);
    del.innerText = "Delete";
    return form;
}
var searchButton = document.getElementById("search_button");
var searchBar = document.getElementById("search_bar");
searchButton.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var search, result, items, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = searchBar.value;
                if (!search)
                    return [2 /*return*/];
                clearAdminContent();
                return [4 /*yield*/, fetch("/v1/api/item/search?q=".concat(search)).then(function (res) { return res.json(); })];
            case 1:
                result = _a.sent();
                if (!result)
                    return [2 /*return*/];
                if (!result.success)
                    return [2 /*return*/, toastNotification("Something went wrong", result.error || "Unknown error", "danger")];
                items = result.items;
                if (!items)
                    return [2 /*return*/, clearAdminContent()];
                item = items[0];
                if (!item)
                    return [2 /*return*/, clearAdminContent()];
                loadItem(item);
                return [2 /*return*/];
        }
    });
}); });
// ITEM LOADING
function loadItem(item) {
    clearAdminContent(true);
    adminContent.appendChild(createShopItem(item));
    var saveButton = document.querySelector(".shop_item_save");
    var deleteButton = document.querySelector(".shop_item_delete");
    saveButton.addEventListener("click", storeCurrentItem);
    deleteButton.addEventListener("click", deleteCurrentItem);
}
// ITEM CRUD
function getItemFromInputs() {
    var id = document.querySelector(".shop_item_id").innerText || undefined;
    var name = document.querySelector(".shop_item_name").value;
    var description = document.querySelector(".shop_item_description").value;
    var longDescription = document.querySelector(".shop_item_long_description").value;
    var price = document.querySelector(".shop_item_price").value;
    var stock = document.querySelector(".shop_item_stock").value;
    var category = document.querySelector(".shop_item_category").value;
    var image = document.querySelector(".shop_item_image").value;
    // Convert to number
    price = parseFloat(price);
    stock = parseInt(stock);
    return { id: id, name: name, description: description, longDescription: longDescription, price: price, stock: stock, category: category, images: [image] };
}
function deleteCurrentItem() {
    return __awaiter(this, void 0, void 0, function () {
        var currentItem, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    currentItem = getItemFromInputs();
                    if (!currentItem.id)
                        return [2 /*return*/, clearAdminContent()];
                    return [4 /*yield*/, fetch("/v1/api/item/delete/".concat(currentItem.id), { method: "DELETE" }).then(function (res) { return res.json(); })];
                case 1:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, toastNotification("Something went wrong", "Unknown error")];
                    if (!result.success)
                        return [2 /*return*/, toastNotification("Something went wrong", result.error || "Unknown error")];
                    clearAdminContent();
                    toastNotification("Item Deleted", "The item has been successfully deleted", "success");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error)
                        toastNotification("Something went wrong", error_1.message, "danger");
                    else
                        toastNotification("Something went wrong", "Unknown error", "danger");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function storeCurrentItem() {
    return __awaiter(this, void 0, void 0, function () {
        var currentItem, result, newItem, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    currentItem = getItemFromInputs();
                    if (!currentItem)
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch("/v1/api/item/".concat(currentItem.id ? "update" : "create"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(currentItem),
                        }).then(function (res) { return res.json(); })];
                case 1:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, toastNotification("Something went wrong", "Unknown error", "danger")];
                    if (!result.success)
                        return [2 /*return*/, toastNotification("Something went wrong", result.error || "Unknown error", "danger")];
                    newItem = result.item;
                    loadItem(newItem);
                    toastNotification("Item Saved", "The item has been successfully saved", "success");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    if (error_2 instanceof Error)
                        toastNotification("Something went wrong", error_2.message, "danger");
                    else
                        toastNotification("Something went wrong", "Unknown error", "danger");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var newButton = document.getElementById("new_button");
newButton.addEventListener("click", function () { return loadItem(); });
