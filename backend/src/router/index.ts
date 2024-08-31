import { Router } from "express";
import UserRouter from "./user.router";
import CartRouter from "./cart.router";
import ItemRouter from "./items.router";
import DiscountRouter from "./discount.router";
import PurchaseRouter from "./purchase.router";
import { authorise } from "../middleware";

const router = Router();

router.use("/user", UserRouter);
router.use("/cart", [authorise.authorise, CartRouter]);
router.use("/item", [authorise.authorise, ItemRouter]);
router.use("/discout", [authorise.authorise, DiscountRouter]);
router.use("/purchase", [authorise.authorise, PurchaseRouter]);

export default router;
