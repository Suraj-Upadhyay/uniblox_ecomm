import { Router } from "express";

const PurchaseRouter = Router();

// Make a purchase
PurchaseRouter.route("/").post();

// List purchase info for the admin user
PurchaseRouter.route("/").get();

export default PurchaseRouter;
