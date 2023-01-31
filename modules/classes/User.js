import { BaseIdentifiable } from "./BaseIdentifiable.js";

/**
 * Player
 */
class User extends BaseIdentifiable {
    constructor(service, id) {
        super(service, id);
    }
}

export { User };
