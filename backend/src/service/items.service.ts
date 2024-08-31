import { DataTypes, DB } from "../db";

export class ItemService {
  private static readonly db = DB.Instance;

  public static getAllItems() {
    return this.db.Item.where({});
  }

  public static getItemById(id: number) {
    return this.db.Item.findById(id);
  }

  public static createNewItem(itemData: DataTypes.ItemType) {
    return this.db.Item.insert(itemData);
  }

  public static modifyItem(id: number, itemData: DataTypes.ItemType) {
    const modifications: Record<string, any> = {};
    const itemDataKeys = Object.keys(itemData);
    const itemDataValues = Object.values(itemData);
    for (let i = 0; i < itemDataKeys.length; i++) {
      if (itemDataValues[i] !== undefined)
        modifications[itemDataKeys[i]] = itemDataValues[i];
    }
    return this.db.Item.updateById(id, modifications);
  }
}
