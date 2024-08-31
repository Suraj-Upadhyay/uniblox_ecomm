import { DataTypes, DB } from "../db";

export class CartService {
  private static readonly db = DB.Instance;

  public static createCartForUser(userId: number) {
    const newCart = {
      ownerId: userId,
      items: [] as DataTypes.ItemType[]
    } as DataTypes.CartType;
    return this.db.Cart.insert(newCart);
  }

  public static getCartForUserId(userId: number) {
    return this.db.Cart.where({ ownerId: userId });
  }
}
