import express from "express";
import TutorController from "../controllers/tutorController.js";
import verifyTokenMiddleware from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", TutorController.getAllTutors);

export default router;
