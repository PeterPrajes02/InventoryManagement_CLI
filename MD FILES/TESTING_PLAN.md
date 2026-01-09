# Testing Plan

## Overview

This Testing Plan defines how the **Inventory Management Console Application** will be validated to ensure correctness, reliability, and compliance with the documented requirements. Testing focuses primarily on **manual testing**, appropriate for a console-based beginner project, with optional automated checks where feasible.

---

## 1. Testing Approach

### 1.1 Manual Testing

Manual testing will be the primary approach and will include:

- Executing CLI commands based on real user workflows
- Verifying console output against expected results
- Validating database state after each operation
- Testing error handling using invalid inputs

Manual testing is suitable because:

- The application is CLI-based
- User flows are straightforward and deterministic
- It allows validation of both logic and user experience

### 1.2 Automated Testing (Optional)

- Lightweight automated tests may be added for service-level logic
- Automated tests will focus on:

  - Validation rules
  - Service methods (without direct DB dependency)

- Automated testing is not mandatory for this project

---

## 2. Test Scenarios

### TS-1: Inventory Item Creation

**What will be tested:**

- Adding new inventory items with valid and invalid data

**Expected Outcome:**

- Valid items are saved to the database
- Invalid inputs are rejected with clear error messages

---

### TS-2: Inventory Item Retrieval

**What will be tested:**

- Viewing all inventory items
- Behavior when the inventory is empty

**Expected Outcome:**

- Items are displayed correctly
- User is informed when no data exists

---

### TS-3: Inventory Item Update

**What will be tested:**

- Updating existing inventory items
- Attempting to update non-existent items

**Expected Outcome:**

- Existing items are updated successfully
- Errors are shown when item does not exist

---

### TS-4: Inventory Item Deletion

**What will be tested:**

- Deleting inventory items
- Confirmation prompts
- Deleting non-existent items

**Expected Outcome:**

- Items are removed after confirmation
- Proper error messages are shown when deletion fails

---

### TS-5: JSON Export

**What will be tested:**

- Exporting inventory data to JSON
- JSON structure and file creation

**Expected Outcome:**

- JSON file is created successfully
- File structure matches the defined schema

---

### TS-6: Filter Inventory & View JSON Fields

**What will be tested:**

- Filtering by `name`, `category`, `location`, and quantity ranges (`minQuantity`, `maxQuantity`).
- Partial matches for `name` and `category`.
- Exporting filtered results to JSON and confirming the JSON contains only the curated fields: `itemId`, `name`, `category`, `quantity`, and `location`.

**Expected Outcome:**

- Filters return the correct subset of items.
- Partial matches behave as expected.
- Exported filtered JSON includes only the specified fields and has the correct `generatedAt` and `totalItems` metadata.

---

## 3. Test Cases

### Feature: Add Inventory Item

| Test Case ID | Description                     | Input                                        | Expected Result          |
| ------------ | ------------------------------- | -------------------------------------------- | ------------------------ |
| TC-A1        | Add item with valid data        | Name=Mouse, Category=Electronics, Quantity=5 | Item added successfully  |
| TC-A2        | Add item with negative quantity | Quantity=-3                                  | Validation error message |
| TC-A3        | Add item with missing name      | Name empty                                   | Validation error message |

---

### Feature: View Inventory Items

| Test Case ID | Description                      | Input        | Expected Result          |
| ------------ | -------------------------------- | ------------ | ------------------------ |
| TC-V1        | View items with existing records | View command | Items displayed          |
| TC-V2        | View items with empty database   | View command | "No items found" message |
| TC-V3        | View items after deletion        | View command | Updated list shown       |

---

### Feature: Update Inventory Item

| Test Case ID | Description                  | Input          | Expected Result  |
| ------------ | ---------------------------- | -------------- | ---------------- |
| TC-U1        | Update existing item         | Valid ItemID   | Item updated     |
| TC-U2        | Update non-existent item     | Invalid ItemID | Error message    |
| TC-U3        | Update with invalid quantity | Quantity=-1    | Validation error |

---

### Feature: Delete Inventory Item

| Test Case ID | Description              | Input           | Expected Result    |
| ------------ | ------------------------ | --------------- | ------------------ |
| TC-D1        | Delete existing item     | Valid ItemID    | Item deleted       |
| TC-D2        | Cancel deletion          | User selects No | Deletion cancelled |
| TC-D3        | Delete non-existent item | Invalid ItemID  | Error message      |

---

### Feature: Export Inventory to JSON

| Test Case ID | Description                 | Input          | Expected Result             |
| ------------ | --------------------------- | -------------- | --------------------------- |
| TC-J1        | Export with existing items  | Export command | JSON file created           |
| TC-J2        | Export with empty inventory | Export command | JSON file with empty list   |
| TC-J3        | Export when file exists     | Export command | File overwritten or updated |

---

### Feature: Filter Inventory & View JSON

| Test Case ID | Description                     | Input                                   | Expected Result                                                                 |
| ------------ | ------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| TC-F1        | Filter by category              | category=Electronics                    | Only items in Electronics returned                                              |
| TC-F2        | Filter by partial name          | name=Key                                | Items with 'Key' in name (Keyboard) returned                                    |
| TC-F3        | Filter by location              | location=Warehouse A                    | Only items in Warehouse A returned                                              |
| TC-F4        | Filter by quantity range        | minQuantity=5,maxQuantity=20            | Items with quantity within range returned                                       |
| TC-F5        | Export filtered results to JSON | filter=category=Electronics,export=true | JSON created and contains only `itemId`,`name`,`category`,`quantity`,`location` |

---

## 4. Test Execution Guidelines

- Each test case will be executed manually
- Results will be recorded as Pass/Fail
- Failed tests must be fixed and re-tested

---

## 5. Testing Completion Criteria

- All test cases executed
- No critical or blocking defects remaining
- Application behaves as defined in Technical Specifications

---
