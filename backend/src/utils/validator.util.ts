import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validationErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Invalid Data",
      errors: errors.array()
    });
    return;
  }
  next();
};

export const nameValidator = body("name")
  .notEmpty()
  .withMessage("Name cannot be empty")
  .bail();

export const usernameValidator = body("username")
  .notEmpty()
  .withMessage("Username cannot be empty")
  .bail();

export const passwordValidator = body("password")
  .notEmpty()
  .withMessage("Password cannot be empty")
  .bail();

export const phoneValidator = body("phone")
  .notEmpty()
  .withMessage("phone cannot be empty")
  .bail()
  .isNumeric()
  .withMessage("Invalid phone number supplied")
  .bail()
  .isLength({ min: 10, max: 10 })
  .withMessage("phone number can only be 10 digits long")
  .bail();

export const emailValidator = body("email")
  .notEmpty()
  .withMessage("Email cannot be empty")
  .bail()
  .isEmail()
  .withMessage("Invalid Email supplied")
  .bail();
