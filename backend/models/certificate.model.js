import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);
