import { Router } from "express";
import { ItemController } from "../controller";

const ItemRouter = Router();

// Get all Items.
ItemRouter.route("/:id").get(ItemController.getItemById);
ItemRouter.route("/").get(ItemController.getAllItems);

// Create an Item
ItemRouter.route("/").post(ItemController.createItem);

// Modify an Item
ItemRouter.route("/:id").put(ItemController.modifyItem);

export default ItemRouter;
