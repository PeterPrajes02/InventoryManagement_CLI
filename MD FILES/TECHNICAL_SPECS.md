# Technical Specifications

## 1. Functional Requirements

### FR-1: Add Inventory Item

- The system shall allow the user to add a new inventory item via the CLI.
- Required fields: Name, Category, Quantity.
- Optional field: Location.
- The system shall store the item in the SQL Server database.

### FR-2: View Inventory Items

- The system shall allow the user to view all inventory items.
- Items shall be displayed in a readable, tabular CLI format.
- If no items exist, the system shall notify the user.

### FR-3: Update Inventory Item

- The system shall allow the user to update an existing inventory item by ItemID.
- The system shall validate that the item exists before updating.
- Updated values shall be persisted to the database.

### FR-4: Delete Inventory Item

- The system shall allow the user to delete an inventory item by ItemID.
- The system shall request user confirmation before deletion.

### FR-5: Export Inventory to JSON

- The system shall allow the user to export all inventory data to a JSON file.
- The exported file shall follow the defined `inventory_report.json` schema.

### FR-6: Filter Inventory Items

- The system shall allow the user to filter inventory items by attributes via the CLI.
- Supported filter attributes: `name` (partial match), `category` (exact or partial match), `location`, and quantity range (`minQuantity`, `maxQuantity`).
- Filtered results shall be displayable in the CLI and exportable to JSON.
- When viewing or exporting filtered results, the JSON output shall include a curated set of fields: `itemId`, `name`, `category`, `quantity`, and `location` (if present).

---

## 2. User Interactions & Expected Behaviors

- The user interacts with the system through a menu-driven CLI.
- Invalid menu selections shall result in a clear error message and retry prompt.
- Successful operations shall display confirmation messages.
- Failed operations shall display meaningful error messages.

---

## 3. Non-Functional Requirements

### Performance

- The system shall handle at least 1,000 inventory records without noticeable delay.
- Database connections shall be reused where possible.

### Reliability

- The application shall not crash on invalid user input.
- Database connection failures shall be gracefully handled.

### Maintainability

- Code shall follow modular design principles.
- All major components shall be independently testable.

---

## 4. Error Handling Strategy

- All database operations shall be wrapped in try-catch blocks.
- User-friendly error messages shall be displayed via the CLI.
- Low-level errors shall not be exposed directly to the user.

---

## 5. Data Validation Rules

- Item Name: Required, non-empty string, max 100 characters.
- Category: Required, non-empty string.
- Quantity: Required, integer, must be greater than or equal to zero.
- ItemID: Must be a valid existing integer.

---

## 6. File Structure

```text
src/
├── cli/
│   └── menu.ts
├── services/
│   └── inventory.service.ts
├── repositories/
│   └── inventory.repository.ts
├── database/
│   └── db.ts
├── utils/
│   └── json.handler.ts
├── models/
│   └── inventory.model.ts
├── types/
│   └── inventory.types.ts
└── index.ts
```

---

## 7. Module Breakdown

- **CLI Module**: Handles menus and input
- **Service Module**: Business logic and validation
- **Repository Module**: Database queries
- **Database Module**: Connection handling
- **Utility Module**: JSON file handling

---

## 8. API / Interface Design

### InventoryItem Interface

````ts
interface InventoryItem {
  itemId: number;
  name: string;
  category: string;
  quantity: number;
  location?: string;
  createdAt: Date;
  updatedAt?: Date;
}

### InventoryFilter Interface

```ts
interface InventoryFilter {
  name?: string;
  category?: string;
  location?: string;
  minQuantity?: number;
  maxQuantity?: number;
}
````

### InventoryViewItem (limited fields for views/exports)

```ts
interface InventoryViewItem {
  itemId: number;
  name: string;
  category: string;
  quantity: number;
  location?: string;
}
```

```

### InventoryService Methods

- addItem(item: CreateInventoryItem): Promise<void>
- getAllItems(): Promise<InventoryItem[]>
- filterItems(filter: InventoryFilter): Promise<InventoryViewItem[]>
- updateItem(id: number, item: UpdateInventoryItem): Promise<void>
- deleteItem(id: number): Promise<void>
- exportInventory(): Promise<void>
- exportView(items?: InventoryViewItem[]): Promise<void>  // export provided view or last-viewed set

---

## 9. Class Structures (Overview)

- **InventoryService**: Orchestrates workflows
- **InventoryRepository**: Executes SQL queries
- **Database**: Manages DB connections
- **JsonHandler**: Reads/writes JSON files

---

## 10. Specification Validation Summary

- All required technical specification sections are documented
- Interfaces and function signatures are clearly defined
- File structure aligns with system design
```
