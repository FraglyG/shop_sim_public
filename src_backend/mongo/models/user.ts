import { Schema, model } from 'mongoose';
import { ShopItem } from './item';

export type UserCartEntry = { item: ShopItem, quantity: number };

export interface ShopUser {
    id: string,
    username: string,
    passwordHash: string,
    sessionToken: string,

    cart: UserCartEntry[]
}

const userSchema = new Schema<ShopUser>({
    id: String,
    username: String,
    passwordHash: String,
    sessionToken: String,

    cart: {
        type: [Object],
        default: []
    }
});

export const userModel = model('User', userSchema);