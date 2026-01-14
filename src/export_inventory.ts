import { verifyDatabase, db } from "./database/db";
import { InventoryService } from "./services/inventory.service";
import { JsonHandler } from "./utils/json.handler";
//
(async () => {
  try {
    await verifyDatabase();

    const items = await InventoryService.getInventoryView();

    JsonHandler.writeInventoryReport(items);

    console.log("✅ inventory_report.json generated successfully");
  } catch (error) {
    console.error("❌ Export failed:", (error as Error).message);
  } finally {
    db.close();
  }
})();
