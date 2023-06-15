import express from "express";
import TaskController from "../controllers/taskController.js";
import verifyTokenMiddleware from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, TaskController.createTask);
router.get("/", verifyTokenMiddleware, TaskController.getAllTasks);
router.get("/:id", verifyTokenMiddleware, TaskController.getSingleTask);

export default router;
