import { Document, Schema, Model, model } from 'mongoose';

const PaymentSchema = new Schema({
    user:  { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    amount: { type: Number, required: true },
    transaction: { type: Schema.Types.ObjectId, required: true, ref: "Transactions" },
    paymentRef: { type: String, required: true },
    checkout: { type: String, required: true }, 
    status: { type: String, required: true },
    paidAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export interface PaymentDocument extends Document {
    user: string;
    amount: number;
    transaction: string;
    status: string;
    checkout: string;
    paymentRef: string;
    paidAt: Date;
    updatedAt: Date;
}

export interface PaymentModel extends Model<PaymentDocument> {}

export default model<PaymentDocument, PaymentModel>('Payment', PaymentSchema);

