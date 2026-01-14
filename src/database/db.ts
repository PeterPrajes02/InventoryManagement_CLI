/**
 * Database Initialization & Verification
 * ======================================
 * This file is responsible for:
 * - Creating the SQLite database connection
 * - Exposing a shared database instance
 * - Verifying required database structures exist
 *
 * This file represents the **Database Infrastructure Layer**.
 *
 * Responsibilities:
 * - Manage database connection lifecycle
 * - Provide low-level database verification utilities
 *
 * This file MUST:
 * - Initialize the SQLite connection exactly once
 * - Export a reusable database instance
 *
 * This file MUST NOT:
 * - Contain business logic
 * - Perform CRUD operations directly
 * - Handle user input or CLI concerns
 */

import sqlite3 from "sqlite3";
import path from "path";

/* -------------------------------------------------------------------------- */
/*                           Database Configuration                            */
/* -------------------------------------------------------------------------- */

/**
 * Absolute path to the SQLite database file.
 *
 * Notes:
 * - Uses a relative path from the compiled JS output
 * - Ensures consistent DB usage regardless of execution directory
 * - Prevents accidental creation of multiple databases
 */
const dbPath = path.resolve(__dirname, "../../data/inventory.db");

/* -------------------------------------------------------------------------- */
/*                           Database Connection                               */
/* -------------------------------------------------------------------------- */

/**
 * Shared SQLite database instance.
 *
 * - Opened once at application startup
 * - Reused across repositories
 * - Closed explicitly on application exit
 */
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err.message);
  }
});

/* -------------------------------------------------------------------------- */
/*                           Database Verification                             */
/* -------------------------------------------------------------------------- */

/**
 * Verify that the required database schema exists.
 *
 * This function ensures:
 * - The InventoryItem table is present
 * - The application fails early if the schema is missing
 *
 * Used by:
 * - CLI startup (before showing menus)
 *
 * @throws Error if the required table does not exist
 */
export const verifyDatabase = (): Promise<void> => {
  const query = `
    SELECT name
    FROM sqlite_master
    WHERE type='table' AND name='InventoryItem';
  `;

  return new Promise((resolve, reject) => {
    db.get(query, (err, row) => {
      if (err) {
        reject(new Error("Database query failed"));
        return;
      }

      if (!row) {
        reject(new Error("InventoryItem table does NOT exist"));
        return;
      }

      console.log("✅ InventoryItem table verified.");
      resolve();
    });
  });
};
