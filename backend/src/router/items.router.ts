import { Router } from "express";

const ItemRouter = Router();

// Get all Items.
ItemRouter.route("/").get();
ItemRouter.route("/:id").get();

// Create an Item
ItemRouter.route("/").post();

// Modify an Item
ItemRouter.route("/:id").put();

export default ItemRouter;
