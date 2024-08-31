import { Request, Response } from "express";
import { ItemService } from "../service/items.service";
import { DataTypes } from "../db";

export function getAllItems(_: Request, res: Response) {
  try {
    const allItems = ItemService.getAllItems();
    if (!allItems) {
      res.status(404).json({
        message: "No Item Found"
      });
      return;
    }
    res.status(200).json({
      message: "All items found successfully",
      data: allItems
    });
  } catch (error) {
    console.log("GetAllItems Controller: An error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export function getItemById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const requiredItem = ItemService.getItemById(+id);
    if (!requiredItem) {
      res.status(404).json({
        message: "Item with given id not found"
      });
      return;
    }
    res.status(200).json({
      message: "Item found successfully",
      data: requiredItem
    });
  } catch (error) {
    console.log("GetItemById Controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export function createItem(req: Request, res: Response) {
  try {
    const {
      title,
      isNew,
      oldPrice,
      price,
      description,
      category,
      image,
      rating
    } = req.body;
    const itemId: number = ItemService.createNewItem(
      {
        title,
        isNew,
        oldPrice,
        price,
        description,
        category,
        image,
        rating
      } as DataTypes.ItemType
    );
    res.status(200).json({
      message: "Item created successfully",
      data: {
        itemId: itemId
      }
    });
  } catch (error) {
    console.log("CreateItem Controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export function modifyItem(req: Request, res: Response) {
  try {
    const {
      id,
      title,
      isNew,
      oldPrice,
      price,
      description,
      category,
      image,
      rating
    } = req.body;
    const updatedItem = ItemService.modifyItem(id, {
      title,
      isNew,
      oldPrice,
      price,
      description,
      category,
      image,
      rating
    } as DataTypes.ItemType);
    res.status(200).json({
      message: "Item updated successfully",
      data: {
        updatedItem: updatedItem
      }
    });
  } catch (error) {
    console.log("ModifyItem Controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
