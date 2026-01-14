# 📘 Inventory Management CLI — User Guide

This User Guide explains how to use the **Inventory Management CLI** application.
It is intended for end users who want to manage inventory items through a
command-line interface.

This guide reflects the **final, feature-complete version** of the system..

---

## 1. Introduction

The Inventory Management CLI allows users to:

- View inventory items in a table format
- Add new inventory items with validation
- Update existing inventory items safely
- Delete inventory items with confirmation
- Filter and search inventory using multiple criteria
- Export inventory data to JSON

The application runs entirely in the terminal and uses a local SQLite database.

---

## 2. Starting the Application

### Prerequisites

- Node.js (v16 or higher)
- npm

### Steps

1. Open a terminal in the project root directory
2. Run:

```bash
npm run dev
```

3. The main menu will appear:

```
Inventory Management System
1) View Inventory
2) Add Inventory Item
3) Update Inventory Item
4) Delete Inventory Item
5) Filter / Search Inventory
6) Exit
```

Use the arrow keys or number keys to select an option, then press Enter.

---

## 3. Viewing Inventory

### Menu Option

```
View Inventory
```

### Description

Displays all inventory items in a formatted table.

### Table Columns

- **ID** – Unique identifier
- **Name** – Item name
- **Category** – Item category
- **Qty** – Quantity available
- **Location** – Storage location (if provided)

### Notes

- Items are ordered by **ID (ascending)**
- If no items exist, a friendly message is shown

---

## 4. Adding an Inventory Item

### Menu Option

```
Add Inventory Item
```

### Required Fields

- **Item name**
- **Category**
- **Quantity**

### Optional Field

- **Location**

### Validation Rules

- Name and category must contain **at least one letter**
- Quantity must be a **non-negative integer**
- Validation errors appear immediately after input

### Example

```
Item name: Keyboard
Category: Electronics
Quantity: 10
Location (optional): Warehouse A
```

### Result

A success message confirms the item was added.

---

## 5. Updating an Inventory Item

### Menu Option

```
Update Inventory Item
```

### Steps

1. Enter the **Item ID** to update
2. Provide new values or press Enter to keep existing values

### Validation

- Item ID must exist
- Updated values follow the same validation rules as adding an item
- Partial updates are supported

### Example

```
Enter Item ID to update: 3
New name (Keyboard):
New category (Electronics): Peripherals
New quantity (10): 15
New location (Warehouse A):
```

### Result

The selected fields are updated successfully.

---

## 6. Deleting an Inventory Item

### Menu Option

```
Delete Inventory Item
```

### Safety Measures

- User must confirm deletion
- Invalid IDs are handled safely
- Cancellation leaves data unchanged

### Example

```
Enter Item ID to delete: 5
Are you sure you want to delete this item? (y/N)
```

### Result

- Confirmed → item is deleted
- Cancelled → no changes made

---

## 7. Filtering & Searching Inventory

### Menu Option

```
Filter / Search Inventory
```

### Available Filters

- Name (partial match)
- Category
- Location
- Minimum quantity
- Maximum quantity

### Notes

- Filters can be combined
- Quantity range is validated
- Empty filters return all items

### Example

```
Name: Test
Category: Test Category
Minimum quantity: 5
Maximum quantity: 50
```

### No Results

If no items match the criteria, the system displays:

```
No matching inventory items found.
```

---

## 8. JSON Export

The system supports exporting inventory data to a JSON file.

### Details

- File includes timestamp, total items, and inventory list
- Stored in the `data/` directory
- Intended for reporting or debugging

---

## 9. Error Handling & Validation

The CLI is designed to be safe and user-friendly:

- Immediate input validation
- Clear error messages
- No crashes on invalid input
- Confirmation prompts for destructive actions

---

## 10. Exiting the Application

### Menu Option

```
Exit
```

Closes the application and safely shuts down the database connection.

---

## 11. Summary

This Inventory Management CLI provides a complete and reliable way to manage
inventory from the command line. It emphasizes:

- Data safety
- Clear validation
- Predictable behavior
- Ease of use

For setup and technical details, refer to the **README.md** file.
