import { Router } from "express";
import { 
    addExperience, 
    editExperience, 
    deleteExperience, 
    getAllExperiences 
} from "../controllers/experience.controller.js";

const router = Router();

// Public route to fetch all experiences
router.route("/").get(getAllExperiences);

// Admin-only mutation routes
router.route("/").post(addExperience);
router.route("/:id").patch(editExperience).delete(deleteExperience);

export default router;
