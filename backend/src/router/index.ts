import { Router } from "express";
import UserRouter from "./user.router";
import CartRouter from "./cart.router";
import ItemRouter from "./items.router";
import DiscountRouter from "./discount.router";
import PurchaseRouter from "./purchase.router";

const router = Router();

router.use("/user", UserRouter);
router.use("/cart", CartRouter);
router.use("/item", ItemRouter);
router.use("/discout", DiscountRouter);
router.use("/purchase", PurchaseRouter)

export default router;
