import { Router } from "express";

const DiscountRouter = Router();

// Create a discount code
DiscountRouter.route("/").post();

// Get a discount code
DiscountRouter.route("/").get();

export default DiscountRouter;
