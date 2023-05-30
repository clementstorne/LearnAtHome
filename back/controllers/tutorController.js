import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TutorController = {
  getAllTutors: async (req, res) => {
    try {
      const tutors = await prisma.tutor.findMany();
      res.json(tutors);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
};

export default TutorController;
