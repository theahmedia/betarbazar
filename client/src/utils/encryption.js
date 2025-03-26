import crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 32 bytes key
const iv = Buffer.from(process.env.IV_KEY, "hex"); // 16 bytes IV

// Debugging logs
console.log("Key:", key);
console.log("IV:", iv);

export const encryptPassword = (password) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decryptPassword = (encryptedPassword) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Example usage
const password = "mySecretPassword";
const encrypted = encryptPassword(password);
console.log("Encrypted:", encrypted);

const decrypted = decryptPassword(encrypted);
console.log("Decrypted:", decrypted);