import { Request, Response } from "express";
import { ItemService } from "../service/items.service";
import { UserService } from "../service/user.service";
import { CartService } from "../service/cart.service";

export function addItemToCart(req: Request, res: Response) {
  try {
    const { itemId } = req.params;
    const { userId } = req.body.auth;

    const requiredItem = ItemService.getItemById(+itemId);
    if (requiredItem === undefined) {
      res.status(404).json({
        message: "Item not found"
      });
      return;
    }

    const requiredUser = UserService.getUserById(+userId);
    if (requiredUser === undefined) {
      res.status(404).json({
        message: "User not found"
      });
      return;
    }

    CartService.addItemToCart(+userId, +itemId);

    res.status(200).json({
      message: "Item added to cart successfully",
      data: {
        cart: CartService.getCartForUserId(+userId)
      }
    });
  } catch (error) {
    console.log("AddItemToCart Controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export function removeItemFromCart(req: Request, res: Response) {
  try {
    const { itemId } = req.params;
    const { userId } = req.body.auth;
    CartService.removeItemFromCart(+userId, +itemId);
    res.status(200).json({
      message: "Item removed from cart successfully",
      data: {
        cart: CartService.getCartForUserId(+userId)
      }
    });
  } catch (error) {
    console.log("RemoveItemFromCart Controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export function getTotalCartValue(req: Request, res: Response) {
  try {
    const { userId } = req.body.auth;
    const totalCartValue = CartService.getTotalCartValue(+userId);
    res.status(200).json({
      message: "Total cart value fetched successfully",
      data: {
        total: totalCartValue
      }
    });
  } catch (error) {
    console.log("GetTotalCartValue controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
