/**
 * CLI Menu
 * =========
 * This file represents the Presentation Layer of the application.
 *
 * Responsibilities:
 * - Display menus and prompts
 * - Perform immediate input validation (UX-level)
 * - Render inventory tables
 * - Delegate business logic to InventoryService
 *
 * This file MUST NOT:
 * - Access the database directly
 * - Contain business rules
 */
//
import inquirer from "inquirer";
import { InventoryService } from "../services/inventory.service";
import { verifyDatabase, db } from "../database/db";
import { InventoryViewItem } from "../types/inventory.types";

/* -------------------------------------------------------------------------- */
/*                                App Bootstrap                               */
/* -------------------------------------------------------------------------- */

/**
 * Entry point for the CLI application.
 * - Verifies database existence
 * - Starts the menu loop
 */
async function startApp(): Promise<void> {
  try {
    await verifyDatabase();
  } catch (error) {
    console.error("❌ Database check failed:", (error as Error).message);
    db.close();
    process.exit(1);
  }

  await showMenu();
}

/* -------------------------------------------------------------------------- */
/*                                   Menu                                     */
/* -------------------------------------------------------------------------- */

/**
 * Displays the main menu and routes user actions.
 * This function loops until the user exits the application.
 */
async function showMenu(): Promise<void> {
  const answer = await inquirer.prompt([
    {
      type: "rawlist",
      name: "action",
      message: "Inventory Management System",
      choices: [
        "View Inventory",
        "Add Inventory Item",
        "Update Inventory Item",
        "Delete Inventory Item",
        "Filter / Search Inventory",
        "Exit",
      ],
    },
  ]);

  switch (answer.action) {
    case "View Inventory":
      await viewInventory();
      break;

    case "Add Inventory Item":
      await addInventoryItem();
      break;

    case "Update Inventory Item":
      await updateInventoryItem();
      break;

    case "Delete Inventory Item":
      await deleteInventoryItem();
      break;

    case "Filter / Search Inventory":
      await filterInventory();
      break;

    case "Exit":
      console.log("👋 Exiting application...");
      db.close();
      process.exit(0);
  }

  // Return to menu after each action
  await showMenu();
}

/* -------------------------------------------------------------------------- */
/*                               View Functions                               */
/* -------------------------------------------------------------------------- */

/**
 * Displays the full inventory list.
 */
async function viewInventory(): Promise<void> {
  const items = await InventoryService.getInventoryView();

  if (items.length === 0) {
    console.log("\n📦 No inventory items found.\n");
    return;
  }

  printInventoryTable(items);
}

/**
 * Displays filtered inventory results.
 */
async function filterInventory(): Promise<void> {
  try {
    const answers = await inquirer.prompt([
      { type: "input", name: "name", message: "Search by name (optional):" },
      {
        type: "input",
        name: "category",
        message: "Filter by category (optional):",
      },
      {
        type: "input",
        name: "location",
        message: "Filter by location (optional):",
      },
      {
        type: "number",
        name: "minQuantity",
        message: "Minimum quantity (optional):",
        validate: validateOptionalInteger("Minimum quantity"),
      },
      {
        type: "number",
        name: "maxQuantity",
        message: "Maximum quantity (optional):",
        validate: validateOptionalInteger("Maximum quantity"),
      },
    ]);

    const items = await InventoryService.filterInventory({
      name: answers.name || undefined,
      category: answers.category || undefined,
      location: answers.location || undefined,
      minQuantity: answers.minQuantity,
      maxQuantity: answers.maxQuantity,
    });

    if (items.length === 0) {
      console.log("\n🔍 No matching inventory items found.\n");
      return;
    }

    printInventoryTable(items);
  } catch (error) {
    console.error(
      "\n❌ Failed to filter inventory:",
      (error as Error).message,
      "\n"
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                             Mutating Operations                             */
/* -------------------------------------------------------------------------- */

/**
 * Adds a new inventory item.
 */
async function addInventoryItem(): Promise<void> {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Item name:",
        validate: validateRequiredText("Item name"),
      },
      {
        type: "input",
        name: "category",
        message: "Category:",
        validate: validateRequiredText("Category"),
      },
      {
        type: "number",
        name: "quantity",
        message: "Quantity:",
        validate: validateRequiredInteger("Quantity"),
      },
      {
        type: "input",
        name: "location",
        message: "Location (optional):",
      },
    ]);

    await InventoryService.addItem({
      name: answers.name,
      category: answers.category,
      quantity: answers.quantity,
      location: answers.location || undefined,
    });

    console.log("\n✅ Inventory item added successfully.\n");
  } catch (error) {
    console.error("\n❌ Failed to add item:", (error as Error).message, "\n");
  }
}

/**
 * Updates an existing inventory item.
 */
async function updateInventoryItem(): Promise<void> {
  try {
    const { id } = await inquirer.prompt([
      {
        type: "number",
        name: "id",
        message: "Enter Item ID to update:",
        validate: validateRequiredInteger("Item ID"),
      },
    ]);

    const item = await InventoryService.getItemById(id);
    if (!item) {
      console.error("\n❌ Inventory item not found.\n");
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `New name (${item.name}):`,
        validate: validateOptionalText("Name"),
      },
      {
        type: "input",
        name: "category",
        message: `New category (${item.category}):`,
        validate: validateOptionalText("Category"),
      },
      {
        type: "number",
        name: "quantity",
        message: `New quantity (${item.quantity}):`,
        validate: validateOptionalInteger("Quantity"),
      },
      {
        type: "input",
        name: "location",
        message: `New location (${item.location ?? "none"}):`,
      },
    ]);

    await InventoryService.updateItem(id, {
      name: answers.name?.trim() || undefined,
      category: answers.category?.trim() || undefined,
      quantity: answers.quantity ?? undefined,
      location: answers.location?.trim() || undefined,
    });

    console.log("\n✅ Inventory item updated successfully.\n");
  } catch (error) {
    console.error("\n❌ Update failed:", (error as Error).message, "\n");
  }
}

/**
 * Deletes an inventory item with confirmation.
 */
async function deleteInventoryItem(): Promise<void> {
  try {
    const { id } = await inquirer.prompt([
      {
        type: "number",
        name: "id",
        message: "Enter Item ID to delete:",
        validate: validateRequiredInteger("Item ID"),
      },
    ]);

    const item = await InventoryService.getItemById(id);
    if (!item) {
      console.error("\n❌ Inventory item not found.\n");
      return;
    }

    console.log(
      `\n⚠️ Deleting item:\nID: ${item.itemId}\nName: ${item.name}\n`
    );

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to delete this item?",
        default: false,
      },
    ]);

    if (!confirm) {
      console.log("\n❎ Deletion cancelled.\n");
      return;
    }

    await InventoryService.deleteItem(id);
    console.log("\n✅ Inventory item deleted successfully.\n");
  } catch (error) {
    console.error(
      "\n❌ Failed to delete item:",
      (error as Error).message,
      "\n"
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                                Helper Utils                                 */
/* -------------------------------------------------------------------------- */

/**
 * Prints inventory items in a consistent table format.
 */
function printInventoryTable(items: InventoryViewItem[]): void {
  console.log("\n📋 Inventory Items:\n");
  console.log("ID  | Name           | Category        | Qty | Location");
  console.log("----+----------------+-----------------+-----+----------------");

  items.forEach((item) => {
    const id = String(item.itemId).padEnd(3);
    const name = item.name.padEnd(14);
    const category = item.category.padEnd(15);
    const qty = String(item.quantity).padEnd(3);
    const location = item.location ?? "";

    console.log(`${id} | ${name} | ${category} | ${qty} | ${location}`);
  });

  console.log("");
}

/**
 * Validator for required text fields.
 */
function validateRequiredText(label: string) {
  return (value: string) => {
    const trimmed = value?.trim();
    if (!trimmed) return `${label} is required.`;
    if (!/[a-zA-Z]/.test(trimmed))
      return `${label} must contain at least one letter.`;
    return true;
  };
}

/**
 * Validator for optional text fields.
 */
function validateOptionalText(label: string) {
  return (value: string) =>
    value.trim() === "" || /[a-zA-Z]/.test(value)
      ? true
      : `${label} must contain at least one letter.`;
}

/**
 * Validator for required integer inputs.
 */
function validateRequiredInteger(label: string) {
  return (value: number | undefined) => {
    if (value === undefined) return `${label} is required.`;
    if (!Number.isInteger(value) || value < 0)
      return `${label} must be a non-negative integer.`;
    return true;
  };
}

/**
 * Validator for optional integer inputs.
 */
function validateOptionalInteger(label: string) {
  return (value: number | undefined) =>
    value === undefined || Number.isInteger(value)
      ? true
      : `${label} must be an integer.`;
}

/* -------------------------------------------------------------------------- */
/*                                  Start App                                  */
/* -------------------------------------------------------------------------- */

startApp();
