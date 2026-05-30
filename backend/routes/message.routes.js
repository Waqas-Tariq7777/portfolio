import { Router } from "express";
import {
    createMessage,
    getAllMessages,
    markAsRead,
    deleteMessage,
    getUnreadCount
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = Router();

// Public routes
router.route("/").post(createMessage);

// Admin-secured routes
router.route("/").get(verifyJWT, isAdmin, getAllMessages);
router.route("/unread-count").get(verifyJWT, isAdmin, getUnreadCount);
router.route("/:id/read").patch(verifyJWT, isAdmin, markAsRead);
router.route("/:id").delete(verifyJWT, isAdmin, deleteMessage);

export default router;
