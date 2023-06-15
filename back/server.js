import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";

// import verifyTokenMiddleware from "./middlewares/verifyToken.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.status(200).json("Welcome to Learn@Home backend");
});

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/tasks", tasksRoutes);

const __dirname = fileURLToPath(import.meta.url);
app.use("/images", express.static(path.join(__dirname, "images")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
