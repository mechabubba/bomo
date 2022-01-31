import { log } from "./log.js";
import dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
    log.error(result.error);
    throw result.error;
}
