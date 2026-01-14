# 📦 Inventory Management CLI

A feature-complete **Inventory Management Command Line Interface (CLI)** built with **TypeScript**, **Node.js**, and **SQLite**.  
The application supports full **CRUD operations**, **filtering and search**, **input validation**, and **JSON export**, following a clean layered architecture.

---

## ✨ Features

- 📋 View inventory in a formatted table
- ➕ Add inventory items with immediate validation
- ✏️ Update existing inventory items (partial updates supported)
- 🗑️ Delete inventory items with confirmation
- 🔍 Filter and search inventory by:
  - Name (partial match)
  - Category
  - Location
  - Quantity range
- 📄 Export inventory data to JSON
- ✅ Strong input validation and error handling
- 🧱 Clean architecture (CLI → Service → Repository → Database)

---

## 🛠 Tech Stack

- **Node.js**
- **TypeScript**
- **SQLite** (via `sqlite3`)
- **Inquirer** (CLI interaction)
- **ts-node** (development execution)

---

## 📁 Project Structure

```
inventory-cli/
├── data/
│   └── inventory.db
├── src/
│   ├── cli/
│   │   └── menu.ts
│   ├── database/
│   │   └── db.ts
│   ├── repositories/
│   │   └── inventory.repository.ts
│   ├── services/
│   │   └── inventory.service.ts
│   ├── types/
│   │   └── inventory.types.ts
│   ├── utils/
│   │   └── json.handler.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

- Node.js (v16+ recommended)
- npm

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

```bash
npm run dev
```

---

## 🧭 Using the CLI

When the application starts, you’ll see the main menu:

```
Inventory Management System
1) View Inventory
2) Add Inventory Item
3) Update Inventory Item
4) Delete Inventory Item
5) Filter / Search Inventory
6) Exit
```

### 📋 View Inventory

Displays all inventory items in a table sorted by ID.

### ➕ Add Inventory Item

- Immediate validation for each field
- Name and category must contain at least one letter
- Quantity must be a non-negative integer

### ✏️ Update Inventory Item

- Update any subset of fields
- Leave fields blank to keep existing values

### 🗑 Delete Inventory Item

- Requires confirmation before deletion
- Safe handling of invalid IDs

### 🔍 Filter / Search Inventory

- Combine multiple filters
- Quantity range validation enforced
- Graceful handling of no-match scenarios

---

## 🧪 Testing

The application was manually tested through guided test phases, including:

- Database verification
- CRUD operations
- Validation edge cases
- Filtering and search scenarios
- Safe delete confirmation paths

All core functionality has been verified to behave as expected..

---

## 🧱 Architecture Overview

- **CLI Layer** (`menu.ts`)
  - Handles user interaction and input validation
- **Service Layer**
  - Enforces business rules
- **Repository Layer**
  - Executes SQL queries and maps results
- **Database Layer**
  - Manages SQLite connection and schema verification
- **Utility Layer**
  - JSON export and helper functions

This separation ensures maintainability, testability, and clarity.

---

## 📌 Notes & Limitations

- Designed as a CLI tool (no GUI)
- No pagination (all items displayed at once)
- Automated tests not included (manual QA completed)

---

## 📄 License

This project is intended for educational and demonstration purposes.
