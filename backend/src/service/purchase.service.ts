import { DataTypes, DB } from "../db";
import { CartService } from "./cart.service";

export class PurchaseService {
  private static readonly db = DB.Instance;

  public static makePurchase(userId: number) {
    const now = new Date();
    const requiredCart = CartService.getCartForUserId(userId);
    const totalAmount = CartService.getTotalCartValue(userId);

    CartService.emptyCart(userId);

    const newPurchase = {
      userId: userId,
      amount: totalAmount,
      cart: { ...requiredCart },
      createdOn: now
    } as DataTypes.PurchaseType;
    return this.db.Purchase.insert(newPurchase);
  }

  public static getPurchaseInformation() {
    const allPurchases = this.db.Purchase.where({});
    let totalItemsPurchased = 0;
    let totalPurchaseAmount = 0;
    for (let i = 0; i < allPurchases.length; i++) {
      totalItemsPurchased += allPurchases[i].cart.items.length;
      totalPurchaseAmount += allPurchases[i].amount;
    }
    return {
      totalItemsPurchased: totalItemsPurchased,
      totalPurchaseAmount: totalPurchaseAmount
    };
  }
}
