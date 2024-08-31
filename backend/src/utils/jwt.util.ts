import jsonwebtoken from "jsonwebtoken";
import { DataTypes } from "../db";

export function getTokenPayloadForUser(user: {
  userId: number;
  username: string;
  role: DataTypes.RoleType;
}) {
  return {
    id: user.userId,
    username: user.username
  };
}

export function generateToken(payload: object): string {
  try {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "15d"
    });
  } catch (error) {
    console.error("An error occurred while createToken: ", error);
    throw error;
  }
}

export function decodeToken(token: string): object {
  try {
    return jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    ) as object;
  } catch (error) {
    console.error("Error occurred while decodeToken: ", error);
    throw error;
  }
}
