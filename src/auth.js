import { generateRandomString } from "@oslojs/crypto/random";
import { encodeHexUpperCase } from "@oslojs/encoding";
import { alphanumeric } from "./constants.js";
import { getRandomValues } from "node:crypto";

/**
 * @param {string} secret
 * @param {boolean} [hex=true] Returns the hash as hexadecimal, otherwise Uint8Array
 * @returns {Promise<string|Uint8Array>}
 */
export async function hashSecret(secret, hex) {
    const secretBytes = new TextEncoder().encode(secret);
    const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
    const secretHashArray = new Uint8Array(secretHashBuffer);
    if (!hex) return secretHashArray;
    const hashHex = encodeHexUpperCase(secretHashArray);
    return hashHex;
}

/**
 * A source of randomness for oslo.
 * @see https://crypto.oslojs.dev/examples/random-values
 * @type {import("@oslojs/crypto/random").RandomReader}
 */
const random = {
    read(bytes) {
        getRandomValues(bytes);
    },
};

/** Secret generation, used for session ids, session secrets, and nonces */
export const generateSecret = () => generateRandomString(random, alphanumeric, 32);
