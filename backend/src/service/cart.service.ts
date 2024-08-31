import { DataTypes, DB } from "../db";
import { ItemService } from "./items.service";

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

  public static addItemToCart(userId: number, itemId: number) {
    const requiredCart = this.getCartForUserId(userId);
    const requiredItem = ItemService.getItemById(itemId);
    return this.db.Cart.updateById(requiredCart._id, {
      items: [...requiredCart.items, requiredItem]
    });
  }

  public static removeItemFromCart(userId: number, itemId: number) {
    const requiredCart = this.getCartForUserId(userId);
    const newCartItems = requiredCart.items.filter(
      (item: { _id: number }) => item._id !== itemId
    );
    return this.db.Cart.updateById(requiredCart._id, { items: newCartItems });
  }

  public static getTotalCartValue(userId: number) {
    let total = 0;
    const requiredCart = this.getCartForUserId(userId);
    for (let i = 0; i < requiredCart.items.length; i++) {
      total += requiredCart.items[i].price;
    }
    return total;
  }

  public static emptyCart(userId: number) {
    const requiredCart = this.getCartForUserId(userId);
    return this.db.Cart.updateById(requiredCart._id, { items: [] });
  }
}
