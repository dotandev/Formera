import { Model, Schema, model } from "mongoose";

const notificationSchema: Schema = new Schema ({
    user: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

export const Notification = model('Notifications', notificationSchema)