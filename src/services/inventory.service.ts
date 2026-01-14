/**
 * Inventory Service
 * =================
 * This file represents the **Service Layer** of the application.
 *
 * Responsibilities:
 * - Enforce business rules and validation
 * - Act as the single source of truth for inventory operations
 * - Coordinate between the CLI layer and the Repository layer
 *
 * This file MUST:
 * - Validate inputs before they reach the database
 * - Throw meaningful errors for the CLI to display
 *
 * This file MUST NOT:
 * - Access the database directly
 * - Handle user input/output
 * - Contain SQL queries
 */

import { InventoryRepository } from "../repositories/inventory.repository";
import {
  InventoryItem,
  InventoryViewItem,
  CreateInventoryItem,
} from "../types/inventory.types";

export class InventoryService {
  /* ------------------------------------------------------------------------ */
  /*                               READ OPERATIONS                             */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve all inventory items in **view format**.
   *
   * This method is used by:
   * - View Inventory (CLI)
   * - Filter / Search Inventory (when no filters are applied)
   *
   * Returns:
   * - A list of inventory items with curated fields (no timestamps)
   */
  static async getInventoryView(): Promise<InventoryViewItem[]> {
    return InventoryRepository.findViewAll();
  }

  /**
   * Retrieve a single inventory item by its ID.
   *
   * This method is used by:
   * - Update Inventory Item
   * - Delete Inventory Item
   *
   * Validation:
   * - ID must be a positive integer
   *
   * @param id - Inventory item ID
   * @returns InventoryItem if found, otherwise null
   */
  static async getItemById(id: number): Promise<InventoryItem | null> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid item ID.");
    }

    return InventoryRepository.findById(id);
  }

  /* ------------------------------------------------------------------------ */
  /*                               CREATE OPERATION                            */
  /* ------------------------------------------------------------------------ */

  /**
   * Add a new inventory item.
   *
   * Validation rules:
   * - Name and category must contain at least one letter
   * - Quantity must be a non-negative integer
   *
   * @param item - Data required to create a new inventory item
   */
  static async addItem(item: CreateInventoryItem): Promise<void> {
    const name = item.name.trim();
    const category = item.category.trim();

    if (!/[a-zA-Z]/.test(name)) {
      throw new Error("Item name must contain at least one letter.");
    }

    if (!/[a-zA-Z]/.test(category)) {
      throw new Error("Category must contain at least one letter.");
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 0) {
      throw new Error("Quantity must be a non-negative integer.");
    }

    await InventoryRepository.create({
      name,
      category,
      quantity: item.quantity,
      location: item.location,
    });
  }

  /* ------------------------------------------------------------------------ */
  /*                               UPDATE OPERATION                            */
  /* ------------------------------------------------------------------------ */

  /**
   * Update an existing inventory item.
   *
   * Behavior:
   * - Supports partial updates
   * - Fields left undefined will not be modified
   *
   * Validation:
   * - ID must exist
   * - Updated text fields must contain at least one letter
   * - Updated quantity must be a non-negative integer
   *
   * @param id - Inventory item ID
   * @param updates - Partial inventory item data
   */
  static async updateItem(
    id: number,
    updates: Partial<CreateInventoryItem>
  ): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid item ID.");
    }

    const existing = await InventoryRepository.findById(id);
    if (!existing) {
      throw new Error("Inventory item not found.");
    }

    if (updates.name !== undefined) {
      const name = updates.name.trim();
      if (!/[a-zA-Z]/.test(name)) {
        throw new Error("Item name must contain at least one letter.");
      }
      updates.name = name;
    }

    if (updates.category !== undefined) {
      const category = updates.category.trim();
      if (!/[a-zA-Z]/.test(category)) {
        throw new Error("Category must contain at least one letter.");
      }
      updates.category = category;
    }

    if (updates.quantity !== undefined) {
      if (!Number.isInteger(updates.quantity) || updates.quantity < 0) {
        throw new Error("Quantity must be a non-negative integer.");
      }
    }

    await InventoryRepository.update(id, updates);
  }

  /* ------------------------------------------------------------------------ */
  /*                               DELETE OPERATION                            */
  /* ------------------------------------------------------------------------ */

  /**
   * Delete an inventory item by ID.
   *
   * Safety:
   * - Ensures the item exists before deletion
   *
   * @param id - Inventory item ID
   */
  static async deleteItem(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid item ID.");
    }

    const existing = await InventoryRepository.findById(id);
    if (!existing) {
      throw new Error("Inventory item not found.");
    }

    await InventoryRepository.deleteById(id);
  }

  /* ------------------------------------------------------------------------ */
  /*                           FILTER / SEARCH OPERATION                       */
  /* ------------------------------------------------------------------------ */

  /**
   * Filter inventory items using optional criteria.
   *
   * Supported filters:
   * - Partial name match
   * - Exact category match
   * - Exact location match
   * - Quantity range (min / max)
   *
   * Validation:
   * - minQuantity must not exceed maxQuantity
   *
   * @param filters - Optional filter criteria
   * @returns Filtered inventory items (view format)
   */
  static async filterInventory(filters: {
    name?: string;
    category?: string;
    location?: string;
    minQuantity?: number;
    maxQuantity?: number;
  }): Promise<InventoryViewItem[]> {
    if (
      filters.minQuantity !== undefined &&
      filters.maxQuantity !== undefined &&
      filters.minQuantity > filters.maxQuantity
    ) {
      throw new Error("Minimum quantity cannot exceed maximum quantity.");
    }

    return InventoryRepository.findWithFilters({
      name: filters.name?.trim() || undefined,
      category: filters.category?.trim() || undefined,
      location: filters.location?.trim() || undefined,
      minQuantity: filters.minQuantity,
      maxQuantity: filters.maxQuantity,
    });
  }
}
