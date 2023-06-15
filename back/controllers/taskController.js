import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TaskController = {
  createTask: async (req, res) => {
    const userId = req.auth.id;
    const userRole = req.auth.role;

    const creatorId = userId;
    const { content } = req.body;
    let ownerId = null;

    if (!content) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    if (userRole === "student") {
      ownerId = userId;
    } else {
      ownerId = userId;
    }

    try {
      const task = await prisma.task.create({
        data: {
          content,
          creatorId,
          ownerId,
        },
      });

      return res
        .status(201)
        .json({ message: "Task successfully created.", task });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
  getAllTasks: async (req, res) => {
    const userId = req.auth.id;

    try {
      const tasks = await prisma.task.findMany({
        where: {
          creatorId: userId,
        },
        select: {
          content: true,
          isDone: true,
        },
      });

      if (tasks.length === 0) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all user's tasks.", tasks });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
  getSingleTask: async (req, res) => {
    const userId = req.auth.id;
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
        select: {
          content: true,
          isDone: true,
          creatorId: true,
        },
      });

      if (task.creatorId !== userId) {
        return res.status(403).json({
          error:
            "Forbidden. You do not have permission to access the requested resource. This resource belongs to another user or requires higher privileges.",
        });
      }

      if (!task) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Task retrieved successfully.", task });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
  updateTask: async (req, res) => {},
  deleteTask: async (req, res) => {},
};

export default TaskController;
