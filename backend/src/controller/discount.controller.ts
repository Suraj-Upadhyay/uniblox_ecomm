import { Request, Response } from "express";
import { DiscountService } from "../service/discount.service";

export function createDiscount(req: Request, res: Response) {
  try {
    const { discountCode, discountRate, expiresOn } = req.body;
    const { role } = req.body.auth;
    if (role !== "Admin") {
      res.status(403).json({
        message: "Forbidden"
      });
      return;
    }
    DiscountService.createDiscountCode(
      discountCode,
      +discountRate,
      new Date(expiresOn)
    );
    res.status(200).json({
      message: "New DiscountCode created successfully"
    });
  } catch (error) {
    console.log("CreateDiscount Controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}

export function getDiscountCode(req: Request, res: Response) {
  try {
    const { discountCode } = req.body;
    const discountCodeObject = DiscountService.getDiscountCode(discountCode);
    if (discountCodeObject === undefined) {
      res.status(404).json({
        message: "Discount code not foudn"
      });
      return;
    }
    res.status(200).json({
      message: "Discount code fetched successfully",
      data: {
        discountCode: discountCodeObject
      }
    });
  } catch (error) {
    console.log("GetDiscountCode Controller: Error occurred: ", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
