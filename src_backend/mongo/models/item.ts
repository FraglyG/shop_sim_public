import { Schema, model } from 'mongoose';

export enum ItemCategory {
    Food = 'food',
    Drink = 'drink',
    Clothing = 'clothing',
    Electronics = 'electronics',
    Other = 'other',
}

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

function randomItemID() {
    return Date.now().toString(36) + "-" + crypto.randomUUID().split("-").splice(0, 3).join("-");
}

const itemSchema = new Schema<ShopItem>({
    id: {
        type: String,
        default: randomItemID,
        unique: true,
    },
    name: String,
    description: String,
    longDescription: String,
    price: Number,
    stock: Number,
    category: String,
    images: [String],

    ratingAverage: {
        type: Number,
        default: 0,
    },
    ratingCount: {
        type: Number,
        default: 0,
    },
});

export const itemModel = model('Item', itemSchema);