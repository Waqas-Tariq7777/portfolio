import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { Project } from '../models/project.model.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js'

// 1. Add Project
const addProject = asyncHandler(async (req, res) => {
    const {
        projectName,
        category,
        mainDescription,
        projectOverview,
        projectChallenges,
        results,
        budget,
        timeline,
        date,
        keyFeatures,
        technologies,
        liveSiteLink
    } = req.body;

    // Validate required fields
    if (!projectName || !category || !mainDescription) {
        throw new ApiError(400, "Project Name, Category, and Main Description are required fields");
    }

    // Parse category (supports array or comma-separated string)
    let categoryArray = [];
    if (category) {
        if (Array.isArray(category)) {
            categoryArray = category;
        } else if (typeof category === 'string') {
            categoryArray = category.split(',').map(item => item.trim()).filter(item => item !== "");
        }
    }

    // Parse key features (supports array or comma-separated string)
    let featuresArray = [];
    if (keyFeatures) {
        if (Array.isArray(keyFeatures)) {
            featuresArray = keyFeatures;
        } else if (typeof keyFeatures === 'string') {
            featuresArray = keyFeatures.split(',').map(item => item.trim()).filter(item => item !== "");
        }
    }

    // Parse technologies (supports array or comma-separated string)
    let techArray = [];
    if (technologies) {
        if (Array.isArray(technologies)) {
            techArray = technologies;
        } else if (typeof technologies === 'string') {
            techArray = technologies.split(',').map(item => item.trim()).filter(item => item !== "");
        }
    }

    let imageUrl = "";
    let publicId = "";

    const coverFile = req.files?.image?.[0];
    if (coverFile) {
        const uploadResult = await uploadToCloudinary(coverFile.buffer, "projects");
        if (uploadResult && uploadResult.secure_url) {
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }
    }

    // Upload additional images
    let additionalImagesArray = [];
    if (req.files?.additionalImages) {
        for (const file of req.files.additionalImages) {
            const uploadResult = await uploadToCloudinary(file.buffer, "projects");
            if (uploadResult && uploadResult.secure_url) {
                additionalImagesArray.push({
                     imageUrl: uploadResult.secure_url,
                     publicId: uploadResult.public_id
                });
            }
        }
    }

    const project = await Project.create({
        projectName,
        category: categoryArray,
        mainDescription,
        projectOverview: projectOverview || "",
        projectChallenges: projectChallenges || "",
        results: results || "",
        budget: budget || "",
        timeline: timeline || "",
        date: date || "",
        keyFeatures: featuresArray,
        technologies: techArray,
        imageUrl,
        publicId,
        additionalImages: additionalImagesArray,
        liveSiteLink: liveSiteLink || ""
    });

    if (!project) {
        throw new ApiError(500, "Something went wrong while creating the project");
    }

    return res.status(201).json(
        new ApiResponse(201, project, "Project created successfully")
    );
});

// 2. Edit Project
const editProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        projectName,
        category,
        mainDescription,
        projectOverview,
        projectChallenges,
        results,
        budget,
        timeline,
        date,
        keyFeatures,
        technologies,
        liveSiteLink
    } = req.body;

    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const updateData = {};

    if (projectName !== undefined) updateData.projectName = projectName;
    if (category !== undefined) {
        if (Array.isArray(category)) {
            updateData.category = category;
        } else if (typeof category === 'string') {
            updateData.category = category.split(',').map(item => item.trim()).filter(item => item !== "");
        }
    }
    if (mainDescription !== undefined) updateData.mainDescription = mainDescription;
    if (projectOverview !== undefined) updateData.projectOverview = projectOverview;
    if (projectChallenges !== undefined) updateData.projectChallenges = projectChallenges;
    if (results !== undefined) updateData.results = results;
    if (budget !== undefined) updateData.budget = budget;
    if (timeline !== undefined) updateData.timeline = timeline;
    if (date !== undefined) updateData.date = date;
    if (liveSiteLink !== undefined) updateData.liveSiteLink = liveSiteLink;

    if (keyFeatures !== undefined) {
        if (Array.isArray(keyFeatures)) {
            updateData.keyFeatures = keyFeatures;
        } else if (typeof keyFeatures === 'string') {
            updateData.keyFeatures = keyFeatures.split(',').map(item => item.trim()).filter(item => item !== "");
        }
    }

    if (technologies !== undefined) {
        if (Array.isArray(technologies)) {
            updateData.technologies = technologies;
        } else if (typeof technologies === 'string') {
            updateData.technologies = technologies.split(',').map(item => item.trim()).filter(item => item !== "");
        }
    }

    const coverFile = req.files?.image?.[0];
    if (coverFile) {
        const uploadResult = await uploadToCloudinary(coverFile.buffer, "projects");
        if (!uploadResult || !uploadResult.secure_url) {
            throw new ApiError(500, "Failed to upload new image to Cloudinary");
        }

        if (project.publicId) {
            await deleteFromCloudinary(project.publicId);
        }

        updateData.imageUrl = uploadResult.secure_url;
        updateData.publicId = uploadResult.public_id;
    }

    // Handle deletion of existing additional images
    let currentAdditionalImages = [...(project.additionalImages || [])];
    if (req.body.deleteAdditionalImages) {
        let deleteIds = [];
        if (Array.isArray(req.body.deleteAdditionalImages)) {
            deleteIds = req.body.deleteAdditionalImages;
        } else if (typeof req.body.deleteAdditionalImages === 'string') {
            deleteIds = req.body.deleteAdditionalImages.split(',').map(id => id.trim());
        }

        for (const pubId of deleteIds) {
            await deleteFromCloudinary(pubId);
        }
        currentAdditionalImages = currentAdditionalImages.filter(img => !deleteIds.includes(img.publicId));
    }

    // Upload new additional images and append
    if (req.files?.additionalImages) {
        const newAddImages = [];
        for (const file of req.files.additionalImages) {
            const uploadResult = await uploadToCloudinary(file.buffer, "projects");
            if (uploadResult && uploadResult.secure_url) {
                newAddImages.push({
                    imageUrl: uploadResult.secure_url,
                    publicId: uploadResult.public_id
                });
            }
        }
        currentAdditionalImages = [...currentAdditionalImages, ...newAddImages];
    }
    updateData.additionalImages = currentAdditionalImages;

    const updatedProject = await Project.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedProject, "Project updated successfully")
    );
});

// 3. Delete Project
const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    if (project.publicId) {
        await deleteFromCloudinary(project.publicId);
    }

    if (project.additionalImages && project.additionalImages.length > 0) {
        for (const img of project.additionalImages) {
            await deleteFromCloudinary(img.publicId);
        }
    }

    await Project.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Project deleted successfully")
    );
});

// 4. Get All Projects (with search & category filtering)
const getProjects = asyncHandler(async (req, res) => {
    const { search, category, projectName } = req.query;

    const filter = {};

    // Filter by specific category (exact match, case insensitive)
    if (category) {
        filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Filter by specific project name
    if (projectName) {
        filter.projectName = { $regex: projectName, $options: "i" };
    }

    // General search across both Project Name and Category
    if (search) {
        const searchRegex = new RegExp(search, "i");
        filter.$or = [
            { projectName: searchRegex },
            { category: searchRegex }
        ];
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, projects, "Projects retrieved successfully")
    );
});

// 5. Get Project by ID
const getProjectById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    return res.status(200).json(
        new ApiResponse(200, project, "Project retrieved successfully")
    );
});

export {
    addProject,
    editProject,
    deleteProject,
    getProjects,
    getProjectById
};
