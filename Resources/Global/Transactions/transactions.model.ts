import { Schema, model, Model, Document, DocumentSetOptions } from "mongoose";


const transactionSchema: Schema = new Schema({
    user: { type: String, required: true },
    amount: { type: Number, required: true },
})