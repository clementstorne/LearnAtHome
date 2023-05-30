import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const UserController = {
  getUserData: async (req, res) => {
    const userId = req.auth.id;
    try {
      let user =
        (await prisma.tutor.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
          },
        })) ||
        (await prisma.student.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            role: true,
          },
        }));
      if (!user) {
        return res.status(404).json({
          error:
            "The requested user could not be found. Please verify the email and try again.",
        });
      }
      return res.json({
        message: "Successfully got user profile data",
        data: user,
      });
    } catch (err) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
};

export default UserController;
