import { Request, Response } from "express";
import { PurchaseService } from "../service/purchase.service";

export function purchase(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    PurchaseService.makePurchase(userId);
    res.status(200).json({
      message: "Purchase made successfully"
    });
  } catch (error) {
    console.log("PurchaseController: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export function getPurchaseInformation(_: Request, res: Response) {
  try {
    const purchaseInfo = PurchaseService.getPurchaseInformation();
    res.status(200).json({
      message: "Purchase information fetched successfully",
      data: {
        purchaseInfo: purchaseInfo
      }
    });
  } catch (error) {
    console.log("GetPurchaseInformationController: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
