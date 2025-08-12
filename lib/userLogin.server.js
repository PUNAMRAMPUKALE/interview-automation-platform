// lib/userLogin.server.js
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function userLogin() {
  const user = await currentUser();
  if (!user) return null;

  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.username ||
    "User";

  const email = user.emailAddresses?.[0]?.emailAddress || null;
  const imageUrl = user.imageUrl || null;

  // Upsert = create on first login, update later if profile changes
  const record = await db.user.upsert({
    where: { clerkUserId: user.id },
    update: { name, imageUrl, email },
    create: { clerkUserId: user.id, name, imageUrl, email },
  });

  return record;
}
