import { Router } from "express";

const UserRouter = Router();

UserRouter.route("/signup").post();
UserRouter.route("/signin").post();
UserRouter.route("/logout").get();

export default UserRouter;
