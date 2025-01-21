import { Schema, model } from "mongoose";

// Unified Event Schema
const eventSchema: Schema = new Schema({
    name: { type: String, required: true },
    organizedBy: { type: String, required: true },
    organizerDetails: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { 
        address: { type: String, required: true }, 
        city: { type: String, required: false },
        country: { type: String, required: false },
        online: { 
            isOnline: { type: Boolean, required: true, default: false },
            streamingLink: { type: String, required: false } 
        }
    },
    capacity: { type: Number, required: true },
    ticketTypes: { 
        type: [{ 
            type: { type: String, required: true }, 
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            perks: { type: [String], required: false } 
        }], 
        required: true 
    },
    registeredUsers: { 
        type: [{ 
            userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
            registrationTime: { type: Date, required: true },
            ticketType: { type: String, required: true }, 
            ticketPrice: { type: Number, required: true },
            ticketQuantity: { type: Number, required: true },
            ticketId: { type: String, required: true },
            checkedIn: { type: Boolean, required: true, default: false }
        }], 
        required: false 
    },
    tags: { type: [String], required: false }, 
    eventType: { type: String, required: true, enum: ["Online", "Physical", "Hybrid"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Unified Ticket Schema
const ticketSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    ticketType: { type: String, required: true }, 
    ticketPrice: { type: Number, required: true },
    ticketQuantity: { type: Number, required: true },
    ticketId: { type: String, required: true },
    checkedIn: { type: Boolean, required: true, default: false },
    registrationTime: { type: Date, required: true },
    additionalDetails: { type: String, required: false }, // For any extra info like seat numbers
    QRCode: { type: String, required: false } 
});

export const BusinessEvent = model("Event", eventSchema);
export const Ticket = model("Ticket", ticketSchema);
