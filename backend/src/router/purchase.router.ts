import { Router } from "express";
import { PurchaseController } from "../controller";

const PurchaseRouter = Router();

// Make a purchase
PurchaseRouter.route("/").post(PurchaseController.purchase);

// List purchase info for the admin user
PurchaseRouter.route("/").get(PurchaseController.getPurchaseInformation);

export default PurchaseRouter;
