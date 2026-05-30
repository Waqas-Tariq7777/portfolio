import { Router } from "express";
import { 
    addProject, 
    editProject, 
    deleteProject, 
    getProjects, 
    getProjectById 
} from "../controllers/project.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

import { uploadPic } from "../middlewares/uploadImage.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getProjects);
router.route("/:id").get(getProjectById);

// Admin-only mutation routes (secured by JWT verification and isAdmin check)
router.route("/").post(
    verifyJWT, 
    isAdmin, 
    uploadPic.fields([
        { name: "image", maxCount: 1 },
        { name: "additionalImages", maxCount: 10 }
    ]), 
    addProject
);
router.route("/:id")
    .put(
        verifyJWT, 
        isAdmin, 
        uploadPic.fields([
            { name: "image", maxCount: 1 },
            { name: "additionalImages", maxCount: 10 }
        ]), 
        editProject
    )
    .patch(
        verifyJWT, 
        isAdmin, 
        uploadPic.fields([
            { name: "image", maxCount: 1 },
            { name: "additionalImages", maxCount: 10 }
        ]), 
        editProject
    )
    .delete(verifyJWT, isAdmin, deleteProject);

export default router;
