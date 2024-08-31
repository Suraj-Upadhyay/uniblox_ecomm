import { DataTypes, DB } from "../db";
import { CartService } from "./cart.service";
import { DiscountService } from "./discount.service";

export class PurchaseService {
  private static readonly db = DB.Instance;

  public static makePurchase(userId: number, discountCode: string) {
    const now = new Date();
    const discountCodeObj = DiscountService.getDiscountCode(discountCode);
    const requiredCart = CartService.getCartForUserId(userId);
    const totalAmount =
      CartService.getTotalCartValue(userId) *
      discountCodeObj.discountRate *
      0.01;

    CartService.emptyCart(userId);

    const newPurchase = {
      userId: userId,
      amount: totalAmount,
      cart: { ...requiredCart },
      discount: discountCodeObj,
      createdOn: now
    } as DataTypes.PurchaseType;
    return this.db.Purchase.insert(newPurchase);
  }

  public static getPurchaseInformation() {
    const allPurchases = this.db.Purchase.where({});
    let totalItemsPurchased = 0;
    let totalPurchaseAmount = 0;
    let discountCodesApplied = [];
    let totalDiscountAmount = 0;
    for (let i = 0; i < allPurchases.length; i++) {
      totalItemsPurchased += allPurchases[i].cart.items.length;
      totalPurchaseAmount += allPurchases[i].amount;
      discountCodesApplied.push(allPurchases[i].discount.discountCode);
      totalDiscountAmount +=
        allPurchases[i].amount * 100 / allPurchases[i].discount.discountRate -
        allPurchases[i].amount;
    }
    return {
      totalItemsPurchased: totalItemsPurchased,
      totalPurchaseAmount: totalPurchaseAmount,
      discountCodesApplied: discountCodesApplied,
      totalDiscountAmount: totalDiscountAmount
    };
  }
}
