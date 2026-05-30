import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { Certificate } from '../models/certificate.model.js'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js'

// 1. Add Certificate
const addCertificate = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    if (!req.file) {
        throw new ApiError(400, "Certificate image file is required");
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, "certificates");

    if (!uploadResult || !uploadResult.secure_url) {
        throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    const certificate = await Certificate.create({
        title,
        description,
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id
    });

    return res.status(201).json(
        new ApiResponse(201, certificate, "Certificate added successfully")
    );
});

// 2. Edit Certificate
const editCertificate = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const certificate = await Certificate.findById(id);

    if (!certificate) {
        throw new ApiError(404, "Certificate not found");
    }

    let updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    // If new image is provided, upload it and delete old one
    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer, "certificates");
        if (!uploadResult || !uploadResult.secure_url) {
            throw new ApiError(500, "Failed to upload new image to Cloudinary");
        }

        // Delete old image
        await deleteFromCloudinary(certificate.publicId);

        updateData.imageUrl = uploadResult.secure_url;
        updateData.publicId = uploadResult.public_id;
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedCertificate, "Certificate updated successfully")
    );
});

// 3. Delete Certificate
const deleteCertificate = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const certificate = await Certificate.findById(id);

    if (!certificate) {
        throw new ApiError(404, "Certificate not found");
    }

    // Delete image from Cloudinary
    await deleteFromCloudinary(certificate.publicId);

    // Delete record from DB
    await Certificate.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Certificate deleted successfully")
    );
});

// 4. Get All Certificates
const getAllCertificates = asyncHandler(async (req, res) => {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, certificates, "Certificates retrieved successfully")
    );
});

export {
    addCertificate,
    editCertificate,
    deleteCertificate,
    getAllCertificates
};
