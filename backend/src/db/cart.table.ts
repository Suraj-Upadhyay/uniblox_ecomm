import { ItemType } from "./item.table";

export interface CartType {
  _id: number;
  ownerId: number;
  items: ItemType[];
}

export const CartTable: CartType[] = [];
