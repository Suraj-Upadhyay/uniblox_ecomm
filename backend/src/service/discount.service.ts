import { DataTypes, DB } from "../db";

export class DiscountService {
  private static readonly db = DB.Instance;

  public static createDiscountCode(
    discountCode: string,
    discountRate: number,
    expiresOn: Date
  ) {
    const discountObject = {
      discountCode: discountCode,
      discountRate: discountRate,
      expiresOn: expiresOn
    } as DataTypes.DiscountType;
    return this.db.Discount.insert(discountObject);
  }

  public static getDiscountCode(discountCode: string) {
    return this.db.Discount.where({ discountCode: discountCode });
  }
}
