import express from "express";
import TodoController from "../controllers/todoController.js";

const router = express.Router();

router.post("/", TodoController.createTodo);
router.get("/", TodoController.getAllTodos);
router.patch("/:id", TodoController.updateTodo);

export default router;
