import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: [String],
        default: [],
        index: true
    },
    mainDescription: {
        type: String,
        required: true
    },
    projectOverview: {
        type: String,
        default: ""
    },
    projectChallenges: {
        type: String,
        default: ""
    },
    results: {
        type: String,
        default: ""
    },
    budget: {
        type: String,
        default: ""
    },
    timeline: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
    keyFeatures: {
        type: [String],
        default: []
    },
    technologies: {
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
    },
    additionalImages: {
        type: [
            {
                imageUrl: String,
                publicId: String
            }
        ],
        default: []
    },
    liveSiteLink: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Text index for search functionality
projectSchema.index({ projectName: "text", category: "text" });

export const Project = mongoose.model("Project", projectSchema);
