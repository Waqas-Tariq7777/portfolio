import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { Experience } from '../models/experience.model.js'

// 1. Add Experience
const addExperience = asyncHandler(async (req, res) => {
    const { startDate, endDate, title, companyName, description, technologies } = req.body;

    // Validate fields
    if (!startDate || !endDate || !title || !companyName || !description) {
        throw new ApiError(400, "All primary fields (startDate, endDate, title, companyName, description) are required");
    }

    // Parse technologies (supports array or comma-separated string)
    let techArray = [];
    if (technologies) {
        if (Array.isArray(technologies)) {
            techArray = technologies;
        } else if (typeof technologies === 'string') {
            techArray = technologies.split(',').map(tech => tech.trim());
        }
    }

    const experience = await Experience.create({
        startDate,
        endDate,
        title,
        companyName,
        description,
        technologies: techArray
    });

    if (!experience) {
        throw new ApiError(500, "Something went wrong while adding the experience");
    }

    return res.status(201).json(
        new ApiResponse(201, experience, "Experience added successfully")
    );
});

// 2. Edit / Update Experience
const editExperience = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate, title, companyName, description, technologies } = req.body;

    let updateData = {};
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (title !== undefined) updateData.title = title;
    if (companyName !== undefined) updateData.companyName = companyName;
    if (description !== undefined) updateData.description = description;

    if (technologies !== undefined) {
        if (Array.isArray(technologies)) {
            updateData.technologies = technologies;
        } else if (typeof technologies === 'string') {
            updateData.technologies = technologies.split(',').map(tech => tech.trim());
        }
    }

    const experience = await Experience.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!experience) {
        throw new ApiError(404, "Experience record not found");
    }

    return res.status(200).json(
        new ApiResponse(200, experience, "Experience updated successfully")
    );
});

// 3. Delete Experience
const deleteExperience = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
        throw new ApiError(404, "Experience record not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Experience deleted successfully")
    );
});

// 4. Get All Experiences
const getAllExperiences = asyncHandler(async (req, res) => {
    const experiences = await Experience.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, experiences, "Experiences retrieved successfully")
    );
});

export {
    addExperience,
    editExperience,
    deleteExperience,
    getAllExperiences
};
