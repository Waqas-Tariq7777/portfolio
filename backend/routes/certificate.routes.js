import { Router } from "express";
import { 
    addCertificate, 
    editCertificate, 
    deleteCertificate, 
    getAllCertificates 
} from "../controllers/certificate.controller.js";
import { uploadPic } from "../middlewares/uploadImage.middleware.js";

const router = Router();

// Public route to fetch all certificates
router.route("/").get(getAllCertificates);

// Admin-only mutation routes (requires single image upload)
router.route("/").post(uploadPic.single("image"), addCertificate);
router.route("/:id").patch(uploadPic.single("image"), editCertificate).delete(deleteCertificate);

export default router;
