import { Router } from "express";
import { validators } from "../middleware";
import { UserController } from "../controller";

const UserRouter = Router();

UserRouter.route("/signup").post(validators.SignupValidator, UserController.signup);
UserRouter.route("/signin").post();
UserRouter.route("/logout").get();

export default UserRouter;
