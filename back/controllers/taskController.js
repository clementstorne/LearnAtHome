import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TaskController = {
  createTask: async (req, res) => {
    const userId = req.auth.id;
    const userRole = req.auth.role;

    const creatorId = userId;
    const { content } = req.body;
    const ownerId = userId;
    // let ownerId = null;

    if (!content) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    // if (userRole === "student") {
    //   ownerId = userId;
    // } else {
    //   ownerId = userId;
    // }

    try {
      const task = await prisma.task.create({
        data: {
          content,
          // creatorId,
          // ownerId,
          tutorCreator: {
            connect: { id: creatorId },
          },
          // studentCreator: {
          //   connect: { id: creatorId },
          // },
          tutorOwner: {
            connect: { id: ownerId },
          },
          // studentOwner: {
          //   connect: { id: ownerId },
          // },
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
          ownerId: userId,
        },
        select: {
          id: true,
          content: true,
          isDone: true,
        },
        orderBy: [
          {
            isDone: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
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
  getSingleTask: async (req) => {
    const userId = req.auth.id;
    const taskId = req.params.id;

    if (!taskId) {
      return {
        task: null,
        status: 400,
        message:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      };
      // res.status(400).json({
      //   error:
      //     "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      // });
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
        return {
          task: null,
          status: 403,
          message:
            "Forbidden. You do not have permission to access the requested resource. This resource belongs to another user or requires higher privileges.",
        };
        // res.status(403).json({
        //   error:
        //     "Forbidden. You do not have permission to access the requested resource. This resource belongs to another user or requires higher privileges.",
        // });
      }

      if (!task) {
        return {
          task: null,
          status: 404,
          message: "Not found.",
        };
        // res.status(404).json({
        //   error: "Not found",
        // });
      }

      // return res
      //   .status(200)
      //   .json({ message: "Task retrieved successfully.", task });
      return { task, status: null, message: null };
    } catch (error) {
      console.error(error);
      return {
        task: null,
        status: 500,
        message:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      };
      // res.status(500).json({
      //   error:
      //     "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      // });
    }
  },
  updateTask: async (req, res) => {
    const userId = req.auth.id;
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      TaskController.getSingleTask(req);

      const credentials = { isDone: req.body.isDone };

      const updatedTask = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: credentials,
        select: {
          id: true,
          content: true,
          isDone: true,
        },
      });

      return res
        .status(200)
        .json({ message: "Task was updated successfully.", updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
  deleteTask: async (req, res) => {},
};

export default TaskController;
