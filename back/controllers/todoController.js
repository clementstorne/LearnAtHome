import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TodoController = {
  createTodo: async (req, res) => {
    const userId = req.auth.id;
    const userRole = req.auth.isTutor;

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const todo = userRole
        ? await prisma.todoTutor.create({
            data: {
              content,
              ownerId: userId,
            },
          })
        : await prisma.todoStudent.create({
            data: {
              content,
              ownerId: userId,
            },
          });

      return res
        .status(201)
        .json({ message: "Todo successfully created.", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
  getAllTodos: async (req, res) => {
    const userId = req.auth.id;
    const userRole = req.auth.isTutor;

    try {
      const todos = userRole
        ? await prisma.todoTutor.findMany({
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
          })
        : await prisma.todoStudent.findMany({
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

      if (!todos) {
        return res.status(404).json({
          error: "Not found",
        });
      }

      return res
        .status(200)
        .json({ message: "Successfully got all user's todos.", todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
  updateTodo: async (req, res) => {
    const userRole = req.auth.isTutor;
    const todoId = req.params.id;

    if (!todoId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      const credentials = { isDone: req.body.isDone };

      const updatedTodo = userRole
        ? await prisma.todoTutor.update({
            where: {
              id: todoId,
            },
            data: credentials,
            select: {
              id: true,
              content: true,
              isDone: true,
            },
          })
        : await prisma.todoStudent.update({
            where: {
              id: todoId,
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
        .json({ message: "Todo was updated successfully.", updatedTodo });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
};

export default TodoController;
