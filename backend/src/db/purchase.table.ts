import { CartType } from "./cart.table";
import { DiscountType } from "./discount.table";

export interface PurchaseType {
  _id: number;
  userId: number;
  amount: number;
  cart: CartType;
  discount?: DiscountType;
  createdOn: Date;
}

export const PurchaseTable: PurchaseType[] = [];
