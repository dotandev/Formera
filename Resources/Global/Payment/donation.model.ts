import { Schema, Model, model, Document } from "mongoose";


const donationSchema = new Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    reference: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
})

export interface donationDocument extends Document {
    user_id: string;
    amount: number;
    transaction_id: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface donationModel extends Model<donationDocument> {
}

export default model<donationDocument, donationModel>('Donation', donationSchema)