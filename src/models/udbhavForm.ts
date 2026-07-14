import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUdbhav extends Document {
    category: string;
    subCategory: string;
    participants: string[];
    school: string;
    contact: string;
    email: string;
    class: string;
    age: string;
    choreographer?: string;
    paymentScreenshot: string;
    registrationId: string;
}

const udbhavSchema = new Schema<IUdbhav>({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    participants: {
        type: [String],
        required: true
    },
    school: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    choreographer: {
        type: String,
        default: ""
    },
    paymentScreenshot: {
        type: String,
        required: true
    },
    registrationId: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

export const UdbhavForm = models.UdbhavForm || model<IUdbhav>("UdbhavForm", udbhavSchema);
