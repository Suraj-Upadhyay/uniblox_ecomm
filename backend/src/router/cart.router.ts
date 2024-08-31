import { Router } from "express";
import { CartController } from "../controller";

const CartRouter = Router();

// Add an item to the cart
CartRouter.route("/add/:itemId").put(CartController.addItemToCart);

// Remove an item from the cart
CartRouter.route("/remove/:itemId").put(CartController.removeItemFromCart);

// Get the total amount of the cart
CartRouter.route("/total").get(CartController.getTotalCartValue);

export default CartRouter;
