import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
        default: []
    }
}, { timestamps: true });

export const Experience = mongoose.model("Experience", experienceSchema);
