/**
 * JSON Handler Utility
 * ====================
 * This file provides utility functions for reading and writing JSON files.
 *
 * Responsibilities:
 * - Load JSON-based configuration or data files
 * - Write inventory reports in JSON format
 *
 * This file represents a **Utility / Helper Layer**.
 *
 * This file MUST:
 * - Perform file system operations safely
 * - Throw clear errors when file operations fail
 *
 * This file MUST NOT:
 * - Contain business logic
 * - Access the database
 * - Interact with the CLI directly
 */

import fs from "fs";
import path from "path";
import { InventoryViewItem } from "../types/inventory.types";

/* -------------------------------------------------------------------------- */
/*                              Type Definitions                               */
/* -------------------------------------------------------------------------- */

/**
 * Shape of the inventory report JSON file.
 *
 * Used for:
 * - Exporting inventory data
 * - Reporting / debugging
 * - Future integrations
 */
interface InventoryReport {
  generatedAt: string;
  totalItems: number;
  items: InventoryViewItem[];
}

/* -------------------------------------------------------------------------- */
/*                               JSON Handler                                  */
/* -------------------------------------------------------------------------- */

export class JsonHandler {
  /**
   * Base directory where JSON data files are stored.
   *
   * Notes:
   * - Centralizes file location logic
   * - Prevents hard-coded paths throughout the codebase
   */
  private static dataDir = path.resolve(__dirname, "../../data");

  /* ------------------------------------------------------------------------ */
  /*                              READ OPERATIONS                              */
  /* ------------------------------------------------------------------------ */

  /**
   * Load a JSON configuration file from the data directory.
   *
   * Generic type <T> allows the caller to define the expected shape
   * of the returned data.
   *
   * @param fileName - Name of the JSON file to load
   * @returns Parsed JSON data typed as <T>
   * @throws Error if file cannot be read or parsed
   */
  static loadConfig<T = unknown>(fileName: string): T {
    const filePath = path.join(this.dataDir, fileName);

    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(rawData) as T;
    } catch (error) {
      throw new Error(
        `Failed to load config file "${fileName}": ${(error as Error).message}`
      );
    }
  }

  /* ------------------------------------------------------------------------ */
  /*                             WRITE OPERATIONS                              */
  /* ------------------------------------------------------------------------ */
  //
  /**
   * Write an inventory report to a JSON file.
   *
   * The report includes:
   * - Timestamp of generation
   * - Total item count
   * - Inventory items in view format
   *
   * Used by:
   * - Export functionality
   * - Debugging / reporting
   *
   * @param items - Inventory items to include in the report
   * @param fileName - Optional output file name (default: inventory_report.json)
   * @throws Error if the file cannot be written
   */
  static writeInventoryReport(
    items: InventoryViewItem[],
    fileName = "inventory_report.json"
  ): void {
    const report: InventoryReport = {
      generatedAt: new Date().toISOString(),
      totalItems: items.length,
      items,
    };

    const filePath = path.join(this.dataDir, fileName);

    try {
      fs.writeFileSync(filePath, JSON.stringify(report, null, 2), "utf-8");
    } catch (error) {
      throw new Error(
        `Failed to write inventory report: ${(error as Error).message}`
      );
    }
  }
}
