"use strict";
// ELEMENTS
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
var itemList = document.getElementById("item_list");
// SITE FUNCTIONALITY
function loadItemHtml(item) {
    return __awaiter(this, void 0, void 0, function () {
        var card, image, strong, description, small, footer, moreInfoButton, rating;
        return __generator(this, function (_a) {
            card = document.createElement('sl-card');
            image = document.createElement('img');
            strong = document.createElement('strong');
            description = document.createElement('p');
            small = document.createElement('small');
            footer = document.createElement('div');
            moreInfoButton = document.createElement('sl-button');
            rating = document.createElement('sl-rating');
            card.classList.add('item_overview');
            image.slot = 'image';
            image.src = item.images[0];
            image.alt = "Image of the item";
            strong.classList.add("name");
            strong.textContent = item.name;
            description.classList.add("description");
            description.textContent = item.description;
            small.classList.add("stock");
            small.textContent = item.stock + " in stock";
            footer.slot = 'footer';
            moreInfoButton.variant = 'primary';
            moreInfoButton.pill = true;
            moreInfoButton.textContent = 'More Info';
            rating.precision = 0.1;
            rating.readonly = true;
            rating.value = item.ratingAverage;
            card.appendChild(image);
            card.appendChild(strong);
            card.appendChild(description);
            card.appendChild(small);
            card.appendChild(footer);
            footer.appendChild(moreInfoButton);
            footer.appendChild(rating);
            return [2 /*return*/, card];
        });
    });
}
function stockItems() {
    return __awaiter(this, void 0, void 0, function () {
        var response, results, _i, _a, item, itemHtml;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    itemList.innerHTML = "";
                    return [4 /*yield*/, fetch("/v1/api/item/list")];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    results = _b.sent();
                    if (!results.success) {
                        itemList.innerHTML = "<p class='error'>Failed to load items :(</p>";
                        return [2 /*return*/];
                    }
                    if (!results.items || results.items.length == 0) {
                        itemList.innerHTML = "<p class='error'>No items found :( </p>";
                        return [2 /*return*/];
                    }
                    _i = 0, _a = results.items;
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    item = _a[_i];
                    return [4 /*yield*/, loadItemHtml(item)];
                case 4:
                    itemHtml = _b.sent();
                    itemList.appendChild(itemHtml);
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log("Items loaded");
                    return [2 /*return*/];
            }
        });
    });
}
stockItems();
// CHECK IF LOGIN POPUP:
document.addEventListener("DOMContentLoaded", function () {
    var login = new URLSearchParams(window.location.search).get("login");
    if (login) {
        var loginPopup = document.querySelector(".login_form_container");
        if (!loginPopup)
            return;
        loginPopup.style.display = "block";
    }
});
