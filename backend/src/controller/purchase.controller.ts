import { Request, Response } from "express";
import { PurchaseService } from "../service/purchase.service";
import { DiscountService } from "../service/discount.service";

export function purchase(req: Request, res: Response) {
  try {
    const { userId, discountCode } = req.body;

    const requiredDiscountCode = DiscountService.getDiscountCode(discountCode);
    if (
      requiredDiscountCode === undefined ||
      requiredDiscountCode.expiresOn < new Date()
    ) {
      res.status(402).json({
        message: "Invalid Discount Code provided"
      });
      return;
    }

    PurchaseService.makePurchase(userId, discountCode);

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

export function getPurchaseInformation(req: Request, res: Response) {
  try {
    const { role } = req.body.auth;
    if (role !== "Admin") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
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
