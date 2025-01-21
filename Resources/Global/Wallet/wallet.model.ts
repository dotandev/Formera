import { Schema, model, Model, Document } from "mongoose";

const walletSchema = new Schema({
    user: { type: String, required: true },
    balance: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    madeAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    accountNumber: { type: String, required: true },
})

export interface walletDocument extends Document {
    user: string;
    balance: number;
    madeAt: Date;
    updatedAt: Date;
}

export interface walletModel extends Model<walletDocument> {
}

export default model<walletDocument, walletModel>('Wallet', walletSchema)
