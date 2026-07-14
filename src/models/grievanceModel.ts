import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    referenceID: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const Grievance = mongoose.models.Grievance || mongoose.model('Grievance', grievanceSchema);