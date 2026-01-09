# Project Timeline

## Overview

This timeline outlines the complete development lifecycle of the **Inventory Management Console Application**, from planning through final submission. The estimates assume a beginner-to-junior developer working part-time and emphasize correctness, learning, and documentation quality over speed.

---

## 1. Development Phases

### Phase 1: Planning (Completed)

**Estimated Duration:** 2–3 days

**Deliverables:**

- PROJECT_PROPOSAL.md
- SYSTEM_DESIGN.md
- TECHNICAL_SPECS.md
- Instructor review and approval

**Key Activities:**

- Define project scope and features
- Design system architecture and database schema
- Create diagrams and technical specifications

**Milestone 1:**
✔ Planning documents completed and approved

---

### Phase 2: Setup

**Estimated Duration:** 1 day

**Tasks:**

- Initialize Node.js project
- Configure TypeScript (tsconfig.json)
- Install required npm packages
- Create folder structure as defined in Technical Specs
- Setup SQL Server database and tables
- Configure JSON-based configuration file

**Deliverables:**

- Working TypeScript environment
- Database connection verified

**Milestone 2:**
✔ Project setup complete and runnable

---

### Phase 3: Development (Core Features)

**Estimated Duration:** 5–6 days

This phase is broken down into feature-based milestones.

#### Milestone 3.1: Database Layer Implementation

**Estimated Time:** 1 day

- Implement database connection module
- Implement repository CRUD methods
- Test database operations manually

**Deliverable:**

- Functional database access layer

---

#### Milestone 3.2: Inventory CRUD Features

**Estimated Time:** 2 days

**Tasks:**

- Implement Add Item feature
- Implement View Items feature
- Implement Update Item feature
- Implement Delete Item feature
- Validate user inputs
- Handle database errors

**Deliverable:**

- Fully functional CRUD operations

---

#### Milestone 3.3: JSON Handling Features

**Estimated Time:** 1 day

**Tasks:**

- Implement config.json loader
- Implement inventory JSON export
- Validate JSON output structure

**Deliverable:**

- Working JSON configuration and reporting

---

#### Milestone 3.4: CLI Integration

**Estimated Time:** 1–2 days

**Tasks:**

- Implement menu-driven CLI
- Integrate services with CLI options
- Add confirmation prompts and retry logic

**Deliverable:**

- Fully interactive CLI application

---

#### Milestone 3.5: Attribute-based Filtering

**Estimated Time:** 1 day

**Tasks:**

- Implement filtering options in the Service and CLI
- Add repository query support for attribute filters and quantity ranges
- Ensure filtered results can be exported as field-limited JSON

**Deliverable:**

- Filtering feature implemented and integrated with export

### Phase 4: Testing

**Estimated Duration:** 2 days

**Tasks:**

- Execute test cases from TESTING_PLAN.md
- Perform manual functional testing
- Test edge cases and invalid inputs
- Verify database error handling

**Deliverables:**

- Tested and stable application

**Milestone 4:**
✔ All test cases executed successfully

---

### Phase 5: Documentation & Refinement

**Estimated Duration:** 1–2 days

**Tasks:**

- Update USER_GUIDE_DRAFT.md
- Finalize README.md
- Add code comments and cleanup
- Minor refactoring and optimization

**Deliverables:**

- Final user documentation
- Clean, readable codebase

**Milestone 5:**
✔ Documentation finalized and project ready for submission

---

## 2. Task Breakdown Summary

| Phase         | Task                     | Estimated Time |
| ------------- | ------------------------ | -------------- |
| Planning      | Documentation & diagrams | 2–3 days       |
| Setup         | Environment & DB setup   | 1 day          |
| Development   | Core features            | 5–6 days       |
| Testing       | Manual testing           | 2 days         |
| Documentation | Final docs & cleanup     | 1–2 days       |

---

## 3. Final Milestones Overview

1. **Planning Approved** – All design documents finalized
2. **Setup Complete** – Project builds and connects to DB
3. **Core Features Complete** – CRUD + JSON working
4. **Testing Complete** – All test cases passed
5. **Submission Ready** – Documentation and code finalized

---
