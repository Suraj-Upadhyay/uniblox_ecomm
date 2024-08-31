import { Request, Response } from "express";
import { DataTypes } from "../db";
import { UserService } from "../service/user.service";
import { generateToken, getTokenPayloadForUser } from "../utils/jwt.util";
import { removeCookie, setCookie } from "../utils/cookie.util";
import { UserType } from "../db/types";
import { CartService } from "../service/cart.service";

export async function signup(req: Request, res: Response) {
  try {
    const { name, username, password, email, phone } = req.body;
    const id: number = UserService.CreateUser(
      {
        name: name,
        username: username,
        password: password,
        email: email,
        phone: phone,
        role: "User"
      } as DataTypes.UserType
    );
    const tokenPayload = getTokenPayloadForUser({
      userId: id,
      username: username,
      role: "User"
    });
    const cookie = generateToken(tokenPayload);
    await setCookie("jwt", cookie, res);
    res.status(200).json({
      message: "User Signed Up successfully",
      userId: id
    });
  } catch (error) {
    console.log("Signup Controller: An error occurred : ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const requiredUser: UserType = (UserService.getUserByUsername(
      username
    ) as unknown) as UserType;
    if (requiredUser === undefined) {
      res.status(404).json({
        message: "Username not found"
      });
      return;
    }
    const passwordMatch = UserService.CheckUserPassword(requiredUser, password);
    if (!passwordMatch) {
      res.status(403).json({
        message: "Incorrect username or password"
      });
      return;
    }

    // Check if there's a cart for the user else, create it.
    const userCart = CartService.getCartForUserId(requiredUser._id);
    if (userCart === undefined) {
      CartService.createCartForUser(requiredUser._id);
    }

    // Set cookie after singin
    const tokenPayload = getTokenPayloadForUser({
      userId: requiredUser._id,
      username: requiredUser.username,
      role: requiredUser.role
    });
    const cookie = generateToken(tokenPayload);
    await setCookie("jwt", cookie, res);

    res.status(200).json({
      message: "User signed in successfully"
    });
  } catch (error) {
    console.log("Signin Controller: An error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export async function logout(_: Request, res: Response) {
  try {
    await removeCookie("jwt", res);
    res.status(200).json({
      message: "User successfully logged out"
    });
  } catch (error) {
    console.log("Logout Controller: An error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Errro"
    });
  }
}
