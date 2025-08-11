// Order of import statements matters, loaded asynchronously
import "./scripts/env.js"; // Populates environment variables
import "./scripts/processEvents.js"; // Node.js process events
import "./scripts/startup.js"; // Startup script (version check, logging)

// Service
import { service } from "./service.js";

// Routes
import "./routes/libraries.js";
import "./routes/api.js";
import "./routes/auth.js";
import "./routes/pages.js";

service.start();
