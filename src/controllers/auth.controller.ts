import { Request, Response } from "express";
import { User } from "../models/user";
import { hashPassword, comparePassword } from "../utils/password.utils";
import { createUser, getUser, updateUserPassword } from "../utils/user.utils";
import jwt from "jsonwebtoken";

export const signup = async (req: Request<{}, {}, User>, res: Response) => {
  const { fullname, role, password } = req.body;

  try {
    let user = await getUser(fullname);

    if (user) {
      return res.status(403).json({
        status: "Failed",
        error: "A user with this name already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    user = await createUser(fullname, role, hashedPassword);

    return res.status(200).json({
      status: "Success",
      data: { user: user },
    });
  } catch (err: any) {
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
};

export const login = async (req: Request<{}, {}, User>, res: Response) => {
  const { fullname, password } = req.body;

  try {
    const user = await getUser(fullname);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User does not exist",
      });
    }

    const passwordsMatch = await comparePassword(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({
        status: "Failed",
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        UserInfo: {
          fullname: user.fullname,
          userId: user.id,
          role: user.role,
        },
      },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "1 day",
      }
    );

    res.status(200).json({
      token: token,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "Failed",
      error: err.message,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { fullname, newPassword } = req.body;

  try {
    let user = await getUser(fullname);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "No user found with this name",
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    await updateUserPassword(user.fullname, hashedPassword);

    return res.status(200).json({
      status: "Success",
      message: { user: user },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: "Failed to change password. Please try again later",
    });
  }
};
