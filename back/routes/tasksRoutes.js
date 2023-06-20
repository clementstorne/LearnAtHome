import express from "express";
import TaskController from "../controllers/taskController.js";

const router = express.Router();

router.post("/", TaskController.createTask);
router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getSingleTask);
router.patch("/:id", TaskController.updateTask);

export default router;
