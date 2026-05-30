import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Service } from '../models/services.model.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// 1. Add Service
const addService = asyncHandler(async (req, res) => {
    const { name, description, keyFeatures } = req.body;

    // Validate required fields
    if (!name || !description) {
        throw new ApiError(400, "Service Name and Description are required fields");
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

    let imageUrl = "";
    let publicId = "";

    // Support single file upload or fields upload
    const coverFile = req.file || req.files?.image?.[0];
    if (coverFile) {
        const uploadResult = await uploadToCloudinary(coverFile.buffer, "services");
        if (uploadResult && uploadResult.secure_url) {
            imageUrl = uploadResult.secure_url;
            publicId = uploadResult.public_id;
        }
    }

    const service = await Service.create({
        name,
        description,
        keyFeatures: featuresArray,
        imageUrl,
        publicId
    });

    if (!service) {
        throw new ApiError(500, "Something went wrong while creating the service");
    }

    return res.status(201).json(
        new ApiResponse(201, service, "Service created successfully")
    );
});

// 2. Edit Service
const editService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, keyFeatures } = req.body;

    const service = await Service.findById(id);

    if (!service) {
        throw new ApiError(404, "Service not found");
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    if (keyFeatures !== undefined) {
        if (Array.isArray(keyFeatures)) {
            updateData.keyFeatures = keyFeatures;
        } else if (typeof keyFeatures === 'string') {
            updateData.keyFeatures = keyFeatures.split(',').map(item => item.trim()).filter(item => item !== "");
        }
    }

    // Support single file upload or fields upload
    const coverFile = req.file || req.files?.image?.[0];
    if (coverFile) {
        const uploadResult = await uploadToCloudinary(coverFile.buffer, "services");
        if (!uploadResult || !uploadResult.secure_url) {
            throw new ApiError(500, "Failed to upload new image to Cloudinary");
        }

        // Delete previous image if exists
        if (service.publicId) {
            await deleteFromCloudinary(service.publicId);
        }

        updateData.imageUrl = uploadResult.secure_url;
        updateData.publicId = uploadResult.public_id;
    }

    const updatedService = await Service.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedService, "Service updated successfully")
    );
});

// 3. Delete Service
const deleteService = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
        throw new ApiError(404, "Service not found");
    }

    // Delete image from Cloudinary if exists
    if (service.publicId) {
        await deleteFromCloudinary(service.publicId);
    }

    await Service.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Service deleted successfully")
    );
});

// 4. Get All Services
const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, services, "Services retrieved successfully")
    );
});

// 5. Get Service by ID
const getServiceById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
        throw new ApiError(404, "Service not found");
    }

    return res.status(200).json(
        new ApiResponse(200, service, "Service retrieved successfully")
    );
});

export {
    addService,
    editService,
    deleteService,
    getServices,
    getServiceById
};
