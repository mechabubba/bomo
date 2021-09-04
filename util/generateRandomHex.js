const { randomBytes } = require("crypto");

/**
  * Generates a string of random hex bytes for use as an id. Due to its tiny size by default (2 bytes to the power of 16 = 65536 possible ids, 4 characters per id), this is easily prone to collisions and may perform recursion checking against a Map's keys to avoid them
  * @param {?Map} [map] - A map for optional collision checking
  * @param {number} [bytes=2] - The number of bytes generated, by default 2, which generates ids 4 characters long
  * @param {number} [allowedRecursions=256] - The number of permitted recursions, by default 256
  * @returns {?string} - the ID generated, null if it couldn't create a unique ID
  */
const generateRandomHex = function(map = null, bytes = 2, allowedRecursions = 256) {
    if (allowedRecursions <= 0) return null;
    // if (map) if (map.size >= bytes ** 16) return null;
    const id = randomBytes(bytes).toString("hex");
    if (map) if (map.has(id)) return this.generateRandomID(map, bytes, allowedRecursions - 1);
    return id;
};

module.exports = generateRandomHex;
