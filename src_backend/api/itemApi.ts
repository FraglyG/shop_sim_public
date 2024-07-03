import { itemModel } from "../mongo/models/item";
import { app } from "../server";

type ItemBuyBody = {
    items: {
        itemId: string;
        quantity: number;
    }[];
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

        .post("/buy", async ({ body }: { body: ItemBuyBody }) => {
            if (!body.items) return { success: false, error: "No items provided" };

            const results = await Promise.all(body.items.map(item => purchaseItem(item.itemId, item.quantity)));
            if (results.some(result => !result.success)) return { success: false, error: "Failed to purchase some items" };

            const items = results.map(result => result.item);
            const totalCost = items.reduce((acc, item) => acc + item!.price, 0);

            return { success: true, cost: totalCost };
        })

        .get("/get/:id", async ({ params }) => {
            const item = await itemModel.findOne({ id: params.id });
            return item;
        })


)