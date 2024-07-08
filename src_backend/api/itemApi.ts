import { ItemCategory, itemModel } from "../mongo/models/item";
import { app, getUserFromRequest } from "../server";

/*
Hendrik's note:
    This API is very rushed.. I'm sorry - had to study for exams so i finished this super quickly
    If I could keep working on this though I'd split this API up into multiple APIs:
        - Item API
        - Cart API
        - Admin API
        - Checkout API

    This would make the code more modular and easier to maintain, as well as easier to understand!!
    We don't want to pump all functionality into one general API like this, it's not good practice :P

    Also, I would add a lot more input validation and error handling in a real-world application
*/


// SPECIFY TYPES 
//      These are also scuffed, if I had more time I'd have made these more generalized and reusable

type ItemBuyBody = {
    items: {
        itemId: string;
        quantity: number;
    }[];
}

type ItemRemoveBody = {
    items: string[];
}

type ItemCreateBody = {
    id?: string;
    name: string;
    description: string;
    longDescription: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
}

// Function for handling item purchase logic
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
        // returns a list of all items, to do this we just find all items in the item collection of our database!
        .get("/list", async () => {
            const items = await itemModel.find();
            return { success: true, items };
        })

        // Checkout the cart
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

        // search items
        //      In a real world application I'd add some tokenization + cosine similarity for better search results
        //      Although since this is only used by admins, it's not that important, you can even just use a Levenshtien distance checker
        .get("/search", async ({ query }) => {
            let items = await itemModel.find({ name: { $regex: query.q, $options: "i" } });
            if (!items || items.length == 0) items = await itemModel.find({ id: { $regex: query.q, $options: "i" } }); // search by id if no name matches
            return { success: true, items };
        })

        // get item by id
        .get("/get/:id", async ({ params }) => {
            const item = await itemModel.findOne({ id: params.id });
            return { success: true, item: item };
        })

        // get the user's cart
        .get("/get/cart", async ({ cookie }) => {
            const user = await getUserFromRequest(cookie);
            return { success: true, cart: user?.cart ?? [] };
        })

        // create new item
        .post("/create", async ({ body }) => {
            const iBody = body as ItemCreateBody;

            // Input Checks
            //  This is super ugly but I don't have time to make it look nice, i'm speedrunning this stuff so I can study for exams
            if (!iBody.name || typeof iBody.name !== "string") return { success: false, error: "Invalid name" };
            if (!iBody.description || typeof iBody.description !== "string") return { success: false, error: "Invalid description" };
            if (!iBody.longDescription || typeof iBody.longDescription !== "string") return { success: false, error: "Invalid long description" };
            if (!iBody.price || typeof iBody.price !== "number") return { success: false, error: "Invalid price" };
            if (!iBody.stock || typeof iBody.stock !== "number") return { success: false, error: "Invalid stock" };
            if (!iBody.category || typeof iBody.category !== "string") return { success: false, error: "Invalid category" };
            if (!iBody.images || !Array.isArray(iBody.images)) return { success: false, error: "Invalid images" };

            // Ensure Name is Unique 
            const existingItem = await itemModel.findOne({ name: iBody.name });
            if (existingItem) return { success: false, error: "Item already exists" };

            // Create Item
            const item = await itemModel.create({
                name: iBody.name,
                description: iBody.description,
                longDescription: iBody.longDescription,
                price: iBody.price,
                stock: iBody.stock,
                category: iBody.category,
                images: iBody.images,
            });

            return { success: true, item };
        })

        // Update Item
        .post("/update", async ({ body, params }) => {
            const iBody = body as ItemCreateBody;

            // Input Checks
            if (!iBody.id || typeof iBody.id !== "string") return { success: false, error: "Invalid id" };
            if (!iBody.name || typeof iBody.name !== "string") return { success: false, error: "Invalid name" };
            if (!iBody.description || typeof iBody.description !== "string") return { success: false, error: "Invalid description" };
            if (!iBody.longDescription || typeof iBody.longDescription !== "string") return { success: false, error: "Invalid long description" };
            if (!iBody.price || typeof iBody.price !== "number") return { success: false, error: "Invalid price" };
            if (!iBody.stock || typeof iBody.stock !== "number") return { success: false, error: "Invalid stock" };
            if (!iBody.category || typeof iBody.category !== "string") return { success: false, error: "Invalid category" };
            if (!iBody.images || !Array.isArray(iBody.images)) return { success: false, error: "Invalid images" };

            // Update Item
            const item = await itemModel.findOne({ id: iBody.id });
            if (!item) return { success: false, error: "Item not found" };

            item.name = iBody.name;
            item.description = iBody.description;
            item.longDescription = iBody.longDescription;
            item.price = iBody.price;
            item.stock = iBody.stock;
            item.category = iBody.category as ItemCategory;
            item.images = iBody.images;

            await item.save();
            return { success: true, item };
        })

        // Delete Item
        .delete("/delete/:id", async ({ params }) => {
            const item = await itemModel.findOne({ id: params.id });
            if (!item) return { success: false, error: "Item not found" };

            await itemModel.deleteOne({ id: params.id });
            return { success: true };
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

            // for (const itemId of iBody.items) {
            //     // this is kinda terrible ngl lmfao 💀
            //     // typa shit produced at 3 am
            //     user.cart = user.cart.filter(cartItem => cartItem.item.id != itemId);
            //     user.markModified("cart");
            // }

            // Way better:
            user.cart = user.cart.filter(cartItem => !iBody.items.includes(cartItem.item.id));
            user.markModified("cart");

            await user.save();
            return { success: true, cart: user.cart };
        })

)