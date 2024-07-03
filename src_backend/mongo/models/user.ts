import { Schema, model } from 'mongoose';

export interface ShopUser {
    id: string,
    username: string,
    passwordHash: string,
    sessionToken: string,
}

const userSchema = new Schema<ShopUser>({
    id: String,
    username: String,
    passwordHash: String,
    sessionToken: String,
});

export const userModel = model('User', userSchema);