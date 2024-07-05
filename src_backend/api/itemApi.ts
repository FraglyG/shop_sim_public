import { itemModel } from "../mongo/models/item";
import { app, getUserFromRequest } from "../server";

type ItemBuyBody = {
    items: {
        itemId: string;
        quantity: number;
    }[];
}

type ItemRemoveBody = {
    items: string[];
}

async function purchaseItem(itemId: string, quantity: number) {
    const item = await itemModel.findOne({ id: itemId });

    if (!item) return { success: false, error: "Item not found" };
    if (item.stock < quantity) return { success: false, error: "Not enough in stock" };

    item.stock -= quantity;
    await item.save(); // Warning: This is not atomic and could lead to race-conditions in a real-world application

    return { success: true, item };
}

app.group("/v1/api/item", app =>
    app
        .get("/list", async () => {
            const items = await itemModel.find();
            return { success: true, items };
        })

        .post("/checkout", async ({ cookie }) => {
            const user = await getUserFromRequest(cookie);
            if (!user) return { success: false, error: "Not logged in" };

            const cart = user.cart;
            if (!cart || cart.length == 0) return { success: false, error: "Cart is empty" };

            const results = await Promise.all(cart.map(async cartItem => {
                const result = await purchaseItem(cartItem.item.id, cartItem.quantity);
                if (result.success) {
                    user.cart = user.cart.filter(item => item.item.id != cartItem.item.id);
                    user.markModified("cart");
                }
                return result;
            }));

            await user.save();
            for (const result of results) if (!result.success) return result;
            return { success: true };
        })

        .get("/get/:id", async ({ params }) => {
            const item = await itemModel.findOne({ id: params.id });
            return item;
        })

        .get("/get/cart", async ({ cookie }) => {
            const user = await getUserFromRequest(cookie);
            return { success: true, cart: user?.cart ?? [] };
        })

        // add item to the cart
        .post("/add", async ({ body, cookie }) => {
            const iBody = body as ItemBuyBody;
            if (!iBody.items) return { success: false, error: "No items provided" };

            const user = await getUserFromRequest(cookie);
            if (!user) return { success: false, error: "Not logged in" };

            for (const item of iBody.items) {
                // this is actually inefficient for bulk cart additions, but that is likely never gonna happen
                // since we only have functionality for adding a single item type in the cart at a time 

                // Prevent Cmd Injection
                if (typeof item.itemId !== "string" || typeof item.quantity !== "number") return { success: false, error: "Invalid item" };

                // Item Checks
                const shopItem = await itemModel.findOne({ id: item.itemId });
                if (!shopItem) return { success: false, error: "Item not found" };
                if (shopItem.stock < item.quantity) return { success: false, error: "Not enough in stock" };
                if (shopItem.stock <= 0) return { success: false, error: "Invalid quantity" };

                // Add to Cart
                const existingItem = user.cart.find(cartItem => cartItem.item.id == item.itemId);
                if (existingItem) existingItem.quantity += item.quantity;
                else user.cart.push({ item: shopItem, quantity: item.quantity });

                user.markModified("cart");
            }

            await user.save();
            return { success: true, cart: user.cart };
        })


        // remove item from the cart
        .post("/remove", async ({ body, cookie }) => {
            const iBody = body as ItemRemoveBody;
            if (!iBody.items) return { success: false, error: "No items provided" };

            const user = await getUserFromRequest(cookie);
            if (!user) return { success: false, error: "Not logged in" };

            for (const itemId of iBody.items) {
                user.cart = user.cart.filter(cartItem => cartItem.item.id != itemId);
                user.markModified("cart");
            }

            await user.save();
            return { success: true, cart: user.cart };
        })

)