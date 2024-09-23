import jwt from "jsonwebtoken";
import { Request, Response } from "express";

module.exports = (req: Request, res: Response) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Sorry! Not Authorized");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET as string);
    req.userData = {
      fullname: decodedToken.UserInfo.fullname,
      userId: decodedToken.UserInfo.userId,
    };
    next();
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Authorization Error!");
    error.statusCode = 401;
    throw error;
  }
};
