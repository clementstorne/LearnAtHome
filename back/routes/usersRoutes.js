import express from "express";
import UserController from "../controllers/userController.js";
import verifyTokenMiddleware from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/profile", verifyTokenMiddleware, UserController.getUserData);

export default router;
