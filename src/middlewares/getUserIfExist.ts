import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyJWT } from "@/utils/verifyJWT";

export const getUserIfExist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken || req.headers["authorization"];
  if (!token) {
    req.user = undefined;
    next();
  }

  if (!verifyJWT(token)) {
    req.user = undefined;
    next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    req.user = undefined;
    next();
  }
};