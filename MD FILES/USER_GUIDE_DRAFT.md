# User Guide (Draft)

## Overview

This guide explains how to install, configure, and use the **Inventory Management Console Application**. The application runs in a Node.js environment and allows users to manage inventory data through a command-line interface (CLI).

---

## 1. Installation Instructions

### 1.1 Prerequisites

Before installing the application, ensure the following software is installed on your system:

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **TypeScript** (installed via npm)
- **SQL Server**
- **SQL Server Management Studio (SSMS)**
- **Git** (optional, for version control)

---

### 1.2 Setup Steps

1. **Clone or download the project**

   - Download the project source code or clone the repository to your local machine.

2. **Install dependencies**

   - Navigate to the project root directory.
   - Run `npm install` to install required packages.

3. **Configure the database**

   - Open SQL Server Management Studio.
   - Create a database named `InventoryDB`.
   - Create the required table as defined in the System Design document.

4. **Configure application settings**

   - Locate the `config.json` file.
   - Update database connection values (server, user, password).

5. **Compile or prepare TypeScript**

   - Ensure `tsconfig.json` is present.
   - Use `ts-node` or compile TypeScript to JavaScript as required.

---

## 2. Usage Instructions

### 2.1 Running the Application

From the project root directory, run the application using one of the following methods:

- Using ts-node:

  - Run `npx ts-node src/index.ts`

- Using compiled JavaScript:

  - Run `npm run build`
  - Then run `node dist/index.js`

---

### 2.2 Main Menu Options

When the application starts, the following menu options are displayed:

1. Add Inventory Item
2. View Inventory Items
3. Update Inventory Item
4. Delete Inventory Item
5. Export Inventory to JSON
6. Filter Inventory Items
7. Exit

The user selects an option by entering the corresponding number.

---

### 2.3 Example Workflow

**Example: Adding and Viewing an Item**

1. Start the application.
2. Select option `1` (Add Inventory Item).
3. Enter item details when prompted.
4. Receive confirmation message.
5. Select option `2` (View Inventory Items) to see the added item.

---

## 3. Feature Documentation

### 3.1 Add Inventory Item

**Steps:**

1. Select `Add Inventory Item` from the menu.
2. Enter the item name, category, quantity, and optional location.
3. Confirm the operation.

**Example Output:**

```
Item added successfully.
```

---

### 3.2 View Inventory Items

**Steps:**

1. Select `View Inventory Items` from the menu.
2. Review the displayed list.

**Example Output:**

```
ID | Name     | Category     | Quantity | Location
1  | Keyboard | Electronics  | 10       | Warehouse A
```

---

### 3.3 Update Inventory Item

**Steps:**

1. Select `Update Inventory Item`.
2. Enter the Item ID to update.
3. Enter new values when prompted.

**Example Output:**

```
Item updated successfully.
```

---

### 3.4 Delete Inventory Item

**Steps:**

1. Select `Delete Inventory Item`.
2. Enter the Item ID.
3. Confirm deletion.

**Example Output:**

```
Item deleted successfully.
```

---

### 3.5 Export Inventory to JSON

**Steps:**

1. Select `Export Inventory to JSON`.
2. Wait for confirmation.
3. Locate `inventory_report.json` in the project directory.

**Example Output:**

```
Inventory successfully exported to inventory_report.json
```

---

### 3.6 Filter Inventory Items

**Steps:**

1. Select `Filter Inventory Items` from the menu.
2. Choose one or more filter attributes: `name`, `category`, `location`, `minQuantity`, `maxQuantity`.
3. Review the filtered list in the CLI.
4. Optionally export the filtered view to JSON; exported JSON will contain only the curated fields: `itemId`, `name`, `category`, `quantity`, and `location`.

**Example Output:**

```
Filtered results: (shows ID, Name, Category, Quantity, Location)
```

---

## 4. Troubleshooting

- **Application does not start:** Ensure Node.js and dependencies are installed.
- **Database connection error:** Verify values in `config.json`.
- **Invalid input errors:** Follow on-screen input guidelines.

---

## 5. Notes

- This document is a **draft** and may be updated after final testing.
- Screenshots are not included due to CLI-based interaction; example outputs are provided instead.

---
