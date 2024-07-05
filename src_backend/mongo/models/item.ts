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

const itemSchema = new Schema<ShopItem>({
    id: String,
    name: String,
    description: String,
    longDescription: String,
    price: Number,
    stock: Number,
    category: String,
    images: [String],
});

export const itemModel = model('Item', itemSchema);