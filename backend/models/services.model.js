import mongoose, { Schema } from "mongoose";

const servicesSchema = new Schema({
    name: {
        type: String,
        required: [true, "Service name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Service description is required"],
        trim: true
    },
    keyFeatures: {
        type: [String],
        default: []
    },
    imageUrl: {
        type: String,
        default: ""
    },
    publicId: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Text index for search functionality if needed
servicesSchema.index({ name: "text" });

export const Service = mongoose.model("Service", servicesSchema);
