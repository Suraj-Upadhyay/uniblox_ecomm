import { Router } from "express";
import { DiscountController } from "../controller";

const DiscountRouter = Router();

// Create a discount code
DiscountRouter.route("/").post(DiscountController.createDiscount);

// Get a discount code
DiscountRouter.route("/").get(DiscountController.getDiscountCode);

export default DiscountRouter;
