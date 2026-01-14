//
import { InventoryItem } from "../types/inventory.types";

export class InventoryItemModel implements InventoryItem {
  constructor(
    public itemId: number,
    public name: string,
    public category: string,
    public quantity: number,
    public location: string | undefined,
    public createdAt: Date,
    public updatedAt?: Date
  ) {}
}
