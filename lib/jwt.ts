import jwt, { SignOptions, Secret } from "jsonwebtoken";
import type { StringValue } from "ms"; // Import type for string duration

const SECRET: Secret = process.env.JWT_SECRET || "supersecretkey";

export function signJwt(payload: object, expiresIn: number | StringValue = "7d") {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
