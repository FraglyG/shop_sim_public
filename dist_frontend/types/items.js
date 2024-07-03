"use strict";
// TYPES
// Note: Would be better if these types are stored in a single location rather than cloned between frontend and backend
//       But I don't really have enough time to worry about that right now
var ItemCategory;
(function (ItemCategory) {
    ItemCategory["Food"] = "food";
    ItemCategory["Drink"] = "drink";
    ItemCategory["Clothing"] = "clothing";
    ItemCategory["Electronics"] = "electronics";
    ItemCategory["Other"] = "other";
})(ItemCategory || (ItemCategory = {}));
