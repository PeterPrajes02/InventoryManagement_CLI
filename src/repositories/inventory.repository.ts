/**
 * Inventory Repository
 * ====================
 * This file represents the **Data Access Layer** of the application.
 *
 * Responsibilities:
 * - Execute all SQL queries related to inventory
 * - Map database rows into TypeScript objects
 * - Provide a clean API for the Service layer
 *
 * This file MUST:
 * - Contain all SQL statements
 * - Use parameterized queries (SQL injection safe)
 * - Return raw data objects (no formatting, no UI concerns)
 *
 * This file MUST NOT:
 * - Perform validation (handled by Service layer)
 * - Print to the console
 * - Contain business logic
 */

import { db } from "../database/db";
import {
  InventoryItem,
  InventoryViewItem,
  CreateInventoryItem,
} from "../types/inventory.types";

export class InventoryRepository {
  /* ------------------------------------------------------------------------ */
  /*                               READ OPERATIONS                             */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve all inventory items (full entity).
   *
   * Includes:
   * - Timestamps
   * - All columns from InventoryItem table
   *
   * Used by:
   * - Internal service logic (not for direct display)
   *
   * Ordering:
   * - Newest items first (createdAt DESC)
   */
  static findAll(): Promise<InventoryItem[]> {
    const query = `
      SELECT
        itemId,
        name,
        category,
        quantity,
        location,
        createdAt,
        updatedAt
      FROM InventoryItem
      ORDER BY createdAt DESC;
    `;

    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows: Record<string, any>[]) => {
        if (err) {
          reject(new Error("Failed to retrieve inventory items"));
          return;
        }

        resolve(
          rows.map((row) => ({
            itemId: row.itemId,
            name: row.name,
            category: row.category,
            quantity: row.quantity,
            location: row.location ?? undefined,
            createdAt: new Date(row.createdAt),
            updatedAt: row.updatedAt ? new Date(row.updatedAt) : undefined,
          }))
        );
      });
    });
  }

  /**
   * Retrieve inventory items in **view format**.
   *
   * Includes:
   * - Only fields required for display/export
   * - No timestamps
   *
   * Used by:
   * - View Inventory
   * - Filter / Search Inventory
   *
   * Ordering:
   * - itemId ASC for stable, predictable display
   */
  static findViewAll(): Promise<InventoryViewItem[]> {
    const query = `
      SELECT
        itemId,
        name,
        category,
        quantity,
        location
      FROM InventoryItem
      ORDER BY itemId ASC;
    `;

    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows: Record<string, any>[]) => {
        if (err) {
          reject(new Error("Failed to retrieve inventory view items"));
          return;
        }

        resolve(
          rows.map((row) => ({
            itemId: row.itemId,
            name: row.name,
            category: row.category,
            quantity: row.quantity,
            location: row.location ?? undefined,
          }))
        );
      });
    });
  }
  //
  /**
   * Retrieve a single inventory item by ID.
   *
   * Used by:
   * - Update Inventory Item
   * - Delete Inventory Item
   *
   * @param id - Inventory item ID
   * @returns InventoryItem if found, otherwise null
   */
  static findById(id: number): Promise<InventoryItem | null> {
    const query = `
      SELECT
        itemId,
        name,
        category,
        quantity,
        location,
        createdAt,
        updatedAt
      FROM InventoryItem
      WHERE itemId = ?;
    `;

    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row: Record<string, any>) => {
        if (err) {
          reject(new Error("Failed to retrieve inventory item"));
          return;
        }

        if (!row) {
          resolve(null);
          return;
        }

        resolve({
          itemId: row.itemId,
          name: row.name,
          category: row.category,
          quantity: row.quantity,
          location: row.location ?? undefined,
          createdAt: new Date(row.createdAt),
          updatedAt: row.updatedAt ? new Date(row.updatedAt) : undefined,
        });
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /*                               CREATE OPERATION                            */
  /* ------------------------------------------------------------------------ */

  /**
   * Insert a new inventory item into the database.
   *
   * Notes:
   * - Validation is handled by the Service layer
   * - This method assumes data is already sanitized
   *
   * @param item - Inventory item creation data
   */
  static create(item: CreateInventoryItem): Promise<void> {
    const query = `
      INSERT INTO InventoryItem (name, category, quantity, location)
      VALUES (?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
      db.run(
        query,
        [item.name, item.category, item.quantity, item.location ?? null],
        (err) => {
          if (err) {
            reject(new Error("Failed to add inventory item"));
            return;
          }

          resolve();
        }
      );
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
   * - Only provided fields are updated
   * - Automatically updates `updatedAt` timestamp
   *
   * @param id - Inventory item ID
   * @param updates - Partial inventory item data
   */
  static update(
    id: number,
    updates: Partial<CreateInventoryItem>
  ): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      fields.push("name = ?");
      values.push(updates.name);
    }

    if (updates.category !== undefined) {
      fields.push("category = ?");
      values.push(updates.category);
    }

    if (updates.quantity !== undefined) {
      fields.push("quantity = ?");
      values.push(updates.quantity);
    }

    if (updates.location !== undefined) {
      fields.push("location = ?");
      values.push(updates.location);
    }

    // If no fields were provided, do nothing
    if (fields.length === 0) {
      return Promise.resolve();
    }

    const query = `
      UPDATE InventoryItem
      SET ${fields.join(", ")}, updatedAt = CURRENT_TIMESTAMP
      WHERE itemId = ?;
    `;

    values.push(id);

    return new Promise((resolve, reject) => {
      db.run(query, values, (err) => {
        if (err) {
          reject(new Error("Failed to update inventory item"));
          return;
        }

        resolve();
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /*                               DELETE OPERATION                            */
  /* ------------------------------------------------------------------------ */

  /**
   * Delete an inventory item by ID.
   *
   * Safety:
   * - Existence is checked by the Service layer
   *
   * @param id - Inventory item ID
   */
  static deleteById(id: number): Promise<void> {
    const query = `
      DELETE FROM InventoryItem
      WHERE itemId = ?;
    `;

    return new Promise((resolve, reject) => {
      db.run(query, [id], (err) => {
        if (err) {
          reject(new Error("Failed to delete inventory item"));
          return;
        }

        resolve();
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /*                           FILTER / SEARCH OPERATION                       */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve inventory items using optional filters.
   *
   * Supported filters:
   * - Partial name match (LIKE %value%)
   * - Exact category match
   * - Exact location match
   * - Quantity range (min / max)
   *
   * Query behavior:
   * - WHERE clause is built dynamically
   * - All parameters are safely bound
   * - Results are ordered by itemId ASC
   *
   * @param filters - Optional filter criteria
   * @returns Filtered inventory items (view format)
   */
  static findWithFilters(filters: {
    name?: string;
    category?: string;
    location?: string;
    minQuantity?: number;
    maxQuantity?: number;
  }): Promise<InventoryViewItem[]> {
    const conditions: string[] = [];
    const params: any[] = [];

    if (filters.name) {
      conditions.push("name LIKE ?");
      params.push(`%${filters.name}%`);
    }

    if (filters.category) {
      conditions.push("category = ?");
      params.push(filters.category);
    }

    if (filters.location) {
      conditions.push("location = ?");
      params.push(filters.location);
    }

    if (filters.minQuantity !== undefined) {
      conditions.push("quantity >= ?");
      params.push(filters.minQuantity);
    }

    if (filters.maxQuantity !== undefined) {
      conditions.push("quantity <= ?");
      params.push(filters.maxQuantity);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT
        itemId,
        name,
        category,
        quantity,
        location
      FROM InventoryItem
      ${whereClause}
      ORDER BY itemId ASC;
    `;

    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows: Record<string, any>[]) => {
        if (err) {
          reject(new Error("Failed to filter inventory items"));
          return;
        }

        resolve(
          rows.map((row) => ({
            itemId: row.itemId,
            name: row.name,
            category: row.category,
            quantity: row.quantity,
            location: row.location ?? undefined,
          }))
        );
      });
    });
  }
}
