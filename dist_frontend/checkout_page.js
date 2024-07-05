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
import { updateRibbonCartIcon } from "./modules/ribbonCart.js";
function getNumberFromElement(el) {
    var _a;
    return +((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.match(/\d+/g)[0]);
}
function currencyFormat(num) {
    return "R".concat(num.toFixed(2));
}
function removeCartItem(checkoutItem) {
    return __awaiter(this, void 0, void 0, function () {
        var itemId, itemCost, response, result, receiptItem, _loop_1, i, subtotalAmount, vatAmount, shippingAmount, totalAmount, newSubtotalAmount, newVatAmount, newShippingAmount, newTotalAmount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // remove element
                    checkoutItem.classList.add("anim_fade_left");
                    setTimeout(function () { return checkoutItem.remove(); }, 500);
                    itemId = checkoutItem.getElementsByClassName("checkout_item_id")[0].textContent;
                    itemCost = getNumberFromElement(checkoutItem.getElementsByClassName("checkout_item_total")[0]);
                    return [4 /*yield*/, fetch("/v1/api/item/remove", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ items: [itemId] })
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    if (!result.success)
                        alert(result.error);
                    receiptItem = document.getElementsByClassName("receipt_item_id");
                    _loop_1 = function (i) {
                        var item = receiptItem[i];
                        if (item.textContent != itemId)
                            return "continue";
                        var receipt = item.parentElement;
                        receipt.classList.add("anim_fade_top");
                        setTimeout(function () { return receipt.remove(); }, 500);
                    };
                    for (i = 0; i < receiptItem.length; i++) {
                        _loop_1(i);
                    }
                    subtotalAmount = document.getElementById("subtotal_amount");
                    vatAmount = document.getElementById("vat_amount");
                    shippingAmount = document.getElementById("shipping_amount");
                    totalAmount = document.getElementById("total_amount");
                    newSubtotalAmount = getNumberFromElement(subtotalAmount) - itemCost;
                    newVatAmount = newSubtotalAmount * 0.15;
                    newShippingAmount = getNumberFromElement(shippingAmount);
                    newTotalAmount = newSubtotalAmount + newVatAmount + newShippingAmount;
                    subtotalAmount.textContent = currencyFormat(newSubtotalAmount);
                    vatAmount.textContent = currencyFormat(newVatAmount);
                    totalAmount.textContent = currencyFormat(newTotalAmount);
                    // update ribbon cart notif
                    updateRibbonCartIcon();
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var removeButtons = document.getElementsByClassName("checkout_item_remove");
    var _loop_2 = function (i) {
        var button = removeButtons[i];
        var checkoutItem = button.parentElement.parentElement;
        button.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                removeCartItem(checkoutItem);
                return [2 /*return*/];
            });
        }); });
    };
    for (var i = 0; i < removeButtons.length; i++) {
        _loop_2(i);
    }
});
var buyButton = document.getElementById("checkout_button");
buyButton.addEventListener("click", function () { return __awaiter(void 0, void 0, void 0, function () {
    var buyResponse, buyResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Checkout button clicked");
                buyButton.setAttribute("loading", "");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4 /*yield*/, fetch("/v1/api/item/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({})
                    })];
            case 2:
                buyResponse = _a.sent();
                return [4 /*yield*/, buyResponse.json()];
            case 3:
                buyResult = _a.sent();
                if (!buyResult.success)
                    return [2 /*return*/, toastNotification("Failed to make purchase", buyResult.error || buyResult.message || "Unknown error", "danger")];
                // go to success page
                window.location.href = "/purchase/success";
                return [3 /*break*/, 6];
            case 4:
                error_1 = _a.sent();
                if (error_1 instanceof Error)
                    toastNotification("Failed to make purchase", error_1.message || "Unknown error", "danger");
                else
                    toastNotification("Failed to make purchase", "Unknown error", "danger");
                return [3 /*break*/, 6];
            case 5:
                buyButton.removeAttribute("loading");
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
