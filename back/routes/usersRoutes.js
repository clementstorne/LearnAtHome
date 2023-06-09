import express from "express";
import UserController from "../controllers/userController.js";
import verifyTokenMiddleware from "../middlewares/verifyToken.js";
import multerMiddleware from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile", verifyTokenMiddleware, UserController.getUserData);
router.patch(
  "/profile",
  verifyTokenMiddleware,
  multerMiddleware,
  UserController.updateProfile
);

export default router;
