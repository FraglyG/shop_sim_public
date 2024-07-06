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

function randomUserId() {
    return Date.now().toString(36) + "-" + crypto.randomUUID().split("-").splice(0, 3).join("-");
}

const userSchema = new Schema<ShopUser>({
    id: {
        type: String,
        default: randomUserId,
        unique: true,
    },
    
    username: String,
    passwordHash: String,
    sessionToken: String,

    cart: {
        type: [Object],
        default: []
    }
});

export const userModel = model('User', userSchema);