// app/layout.jsx
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });
const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (process.env.VERCEL) {
  console.log("Has Clerk PK?", Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY));
}

export const metadata = {
  title: "Interview Automation App",
  description: "",
};

export default function RootLayout({ children }) {
  if (!clerkPk && process.env.NODE_ENV !== "production") {
    console.warn("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY — rendering without ClerkProvider.");
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <main>{children}</main>
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Powered By: Personal AI Guide</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider
      publishableKey={clerkPk}
      appearance={{ baseTheme: dark }}
      // New redirect props:
      fallbackRedirectUrl="/dashboard"   // use /dashboard if there's no "returnTo"
      // forceRedirectUrl="/dashboard"    // uncomment to ALWAYS go to /dashboard
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <main>{children}</main>
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Powered By: Personal AI Guide</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
