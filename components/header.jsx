"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

// ❌ DO NOT import anything from /lib/userLogin.server.js here

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="font-semibold">Interview Automation</Link>
      <nav className="flex items-center gap-4">
        <SignedIn>
          <Link href="/dashboard">Dashboard</Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
            <button className="underline">Sign in</button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
