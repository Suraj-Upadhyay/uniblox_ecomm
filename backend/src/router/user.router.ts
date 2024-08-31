import { Router } from "express";
import { validators } from "../middleware";
import { UserController } from "../controller";

const UserRouter = Router();

UserRouter.route("/signup").post(validators.SignupValidator, UserController.signup);
UserRouter.route("/signin").post(validators.SigninValidator, UserController.signin);
UserRouter.route("/logout").get(UserController.logout);

export default UserRouter;
