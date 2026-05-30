import { Router } from "express";
import { 
    addService, 
    editService, 
    deleteService, 
    getServices, 
    getServiceById 
} from "../controllers/services.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { uploadPic } from "../middlewares/uploadImage.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getServices);
router.route("/:id").get(getServiceById);

// Admin-only mutation routes (secured by JWT verification and isAdmin check)
router.route("/").post(
    verifyJWT, 
    isAdmin, 
    uploadPic.fields([
        { name: "image", maxCount: 1 }
    ]), 
    addService
);

router.route("/:id")
    .put(
        verifyJWT, 
        isAdmin, 
        uploadPic.fields([
            { name: "image", maxCount: 1 }
        ]), 
        editService
    )
    .patch(
        verifyJWT, 
        isAdmin, 
        uploadPic.fields([
            { name: "image", maxCount: 1 }
        ]), 
        editService
    )
    .delete(verifyJWT, isAdmin, deleteService);

export default router;
