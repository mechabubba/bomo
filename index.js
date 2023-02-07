// order of import statements matters, loaded asynchronously
import "./modules/scripts/env.js"; // Populates environment variables
import "./modules/scripts/processEvents.js"; // Node.js process events
import "./modules/scripts/startup.js"; // Startup script (version check, logging)
import "./modules/scripts/api.js"; // API routes
import "./modules/scripts/pages.js"; // Page routes
import { service } from "./modules/service.js";
service.start();
