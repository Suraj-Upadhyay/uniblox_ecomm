import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt.util";
import { DataTypes } from "../db";

export async function authorise(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const jwt = req.cookies["jwt"];
    const decodedToken = decodeToken(jwt);
    req.body.auth = decodedToken as {
      userId: number;
      username: string;
      role: DataTypes.RoleType;
    };
    next();
  } catch (error) {
    console.error("Error occurred in authorize: ", error);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
      Error: "Failed to authorize the request"
    });
  }
}
