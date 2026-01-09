# Project Proposal

## Project Title

Inventory Management Console Application

## Project Description

The Inventory Management Console Application is a TypeScript-based command-line application that allows users to manage inventory items efficiently. It supports adding, viewing, updating, and deleting inventory records stored in a SQLite database, with additional JSON-based features for configuration and report generation. The application is designed to run in a Node.js environment and follows clean code and modular design principles.

## Target Users / Use Case

- Small business owners
- Students learning backend and database fundamentals
- Inventory clerks or staff who need a simple, offline-capable inventory tracking tool

The application is intended for environments where a lightweight, terminal-based solution is sufficient and a full web interface is unnecessary.

## Problem Statement

### What problem does the application solve?

Manual inventory tracking using spreadsheets or paper records is error-prone, inconsistent, and difficult to maintain. There is also a lack of beginner-friendly projects that combine TypeScript, database integration, and file handling in a real-world scenario.

### Why is this application needed?

This application provides:

- A structured and reliable way to store inventory data
- Practical experience using TypeScript with SQLite
- A real-world example of CRUD operations and JSON file handling

## Key Features

1. **Item Management (CRUD)**

   - Add, view, update, and delete inventory items stored in the database.

2. **Inventory Listing & Search**

   - Display all items or search items by name or category.

3. **Stock Quantity Tracking**

   - Monitor item quantities and update stock levels.

4. **JSON Report Generation**

   - Export inventory data into JSON files for reporting or backup purposes.

5. **Configuration via JSON**

   - Store database connection settings and application options in a JSON configuration file.

6. **Attribute-based Filtering & Field-limited Views**
   - Provide CLI filters to query inventory items by attributes such as `name`, `category`, `location`, and quantity ranges.
   - When viewing or exporting filtered results, JSON outputs will include a curated set of fields (for example: `itemId`, `name`, `category`, `quantity`, `location`) to support organized, consistent reports and downstream processing.

## Technology Stack

- **Programming Language:** TypeScript (latest stable version)
- **Runtime Environment:** Node.js
- **Database:** SQLite

### Key npm Packages

- `typescript` – TypeScript compiler
- `ts-node` – Run TypeScript directly in Node.js
- `sqlite3` – SQLite database driver
- `inquirer` – CLI user interaction
- `dotenv` – Environment variable management (optional)

### Development Tools

- Visual Studio Code
- Node.js & npm
- DB Browser for SQLite
- Git (local version control)

---
