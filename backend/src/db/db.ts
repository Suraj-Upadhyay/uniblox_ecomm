import { CartTable } from "./cart.table";
import { DiscountCodeTable } from "./discount.table";
import { ItemTable } from "./item.table";
import { PurchaseTable } from "./purchase.table";
import { UserTable } from "./user.table";

class Table {
  public name: string;
  private data: Array<Record<string, any>>;

  constructor(name: string, data: Array<Record<string, any>>) {
    this.name = name;
    this.data = data;
  }

  insert(record: Record<string, any>) {
    record._id = this.data.length;
    this.data.push({ ...record });
    return record._id;
  }

  findById(id: number) {
    const requiredRecord = this.data.find(datum => datum._id === id);
    if (requiredRecord === undefined) return undefined;
    return { ...requiredRecord };
  }

  updateById(id: number, updatedData: Record<string, any>) {
    const requiredRecord = this.data.find(datum => datum._id === id);
    if (requiredRecord === undefined) return undefined;
    for (let i in updatedData) {
      requiredRecord[i] = updatedData[i];
    }
    return { ...requiredRecord };
  }

  deleteById(id: number) {
    const requiredId = this.data.findIndex(datum => datum._id == id);
    if (requiredId === -1) return;
    const deletedData = this.data.splice(requiredId, 1);
    return deletedData[0];
  }
}

export default class DB {
  [x: string]: any;
  private static _instance: DB;

  private tables: string[] = [];

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    this.initTables();
  }

  private initTables() {
    this.tables = ["User", "Cart", "Item", "DiscountCode", "Purchase"];
    for (let i = 0; i < this.tables.length; i++) {
      Object.defineProperty(this, this.tables[i], {
        value: new Table(this.tables[i], this.getTableData(this.tables[i]))
      });
    }
  }

  private getTableData(tableName: string) {
    switch (tableName) {
      case "User":
        return UserTable;
      case "Cart":
        return CartTable;
      case "Item":
        return ItemTable;
      case "DiscountCode":
        return DiscountCodeTable;
      case "Purchase":
        return PurchaseTable;
      default:
        return [];
    }
  }
}
