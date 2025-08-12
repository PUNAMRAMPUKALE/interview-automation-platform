// lib/authSafe.server.js
import { auth } from "@clerk/nextjs/server";

export function safeProtect() {
  if (!process.env.CLERK_SECRET_KEY) return; // treat as allowed
  auth().protect(); // real protection when configured
}
