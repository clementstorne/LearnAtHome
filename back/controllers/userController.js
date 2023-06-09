import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import fs from "fs";

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
            role: true,
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

  updateProfile: async (req, res) => {
    const userId = req.auth.id;

    if (!userId) {
      return res.status(400).json({
        error:
          "The server could not process the request because a required parameter is missing. Please include all necessary parameters and try again.",
      });
    }

    try {
      let user =
        (await prisma.tutor.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            role: true,
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
          error: "The requested user could not be found.",
        });
      }

      const credentials = req.body;

      if (req.body.password) {
        const password = req.body.password;
        const regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g;
        if (!regex.test(password)) {
          return res.status(400).json({
            error:
              "The password provided does not meet the required format. Please ensure your password meets the specified criteria and try again.",
          });
        }
        const hash = bcrypt.hashSync(password, 10);

        credentials.password = hash;
      }

      let updatedUser = {};

      if (user.imageUrl) {
        const filename = user.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          if (req.file && req.file.filename) {
            credentials.imageUrl = `${req.protocol}://${req.get(
              "host"
            )}/images/${req.file.filename}`;
          }
          if (user.role === "tutor") {
            updatedUser = prisma.tutor.update({
              where: {
                id: userId,
              },
              data: credentials,
            });
          } else {
            updatedUser = prisma.student.update({
              where: {
                id: userId,
              },
              data: credentials,
            });
          }
        });
      } else {
        if (req.file && req.file.filename) {
          credentials.imageUrl = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        }
        if (user.role === "tutor") {
          updatedUser = await prisma.tutor.update({
            where: {
              id: userId,
            },
            data: credentials,
          });
        } else {
          updatedUser = await prisma.student.update({
            where: {
              id: userId,
            },
            data: credentials,
          });
        }
      }

      return res.status(200).json({
        message: "User profile updated successfully.",
        updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator.",
      });
    }
  },
};

export default UserController;
