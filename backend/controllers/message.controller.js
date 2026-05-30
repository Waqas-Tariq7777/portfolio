import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { Message } from '../models/message.model.js'

// Send Contact Message (Public)
const createMessage = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        throw new ApiError(400, "All fields are required");
    }

    const newMessage = await Message.create({
        name,
        email,
        subject,
        message
    });

    return res.status(201).json(
        new ApiResponse(201, newMessage, "Message submitted successfully")
    );
});

// Get All Messages (Admin only)
const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, messages, "Messages fetched successfully")
    );
});

// Mark Message as Read (Admin only)
const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const message = await Message.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true }
    );

    if (!message) {
        throw new ApiError(444, "Message not found");
    }

    return res.status(200).json(
        new ApiResponse(200, message, "Message marked as read successfully")
    );
});

// Delete Message (Admin only)
const deleteMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
        throw new ApiError(444, "Message not found");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Message deleted successfully")
    );
});

// Get Unread Messages Count (Admin only)
const getUnreadCount = asyncHandler(async (req, res) => {
    const count = await Message.countDocuments({ isRead: false });

    return res.status(200).json(
        new ApiResponse(200, { unreadCount: count }, "Unread count fetched successfully")
    );
});

export {
    createMessage,
    getAllMessages,
    markAsRead,
    deleteMessage,
    getUnreadCount
};
