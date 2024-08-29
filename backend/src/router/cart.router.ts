import { Router } from "express";

const CartRouter = Router();

// Add an item to the cart
CartRouter.route("/add/:itemId").put();

// Remove an item from the cart
CartRouter.route("/remove/:itemId").put();

// Apply discount to the cart
CartRouter.route("/discount/:discountCode").put();

// Get the total amount of the cart
CartRouter.route("/total").get();

export default CartRouter;
