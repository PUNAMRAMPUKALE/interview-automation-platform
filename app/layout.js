import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

// ✅ Read the publishable key from env (set this in Vercel + .env.local)
const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata = {
  title: "Interview Automation App",
  description: "",
};

export default function RootLayout({ children }) {
  // Optional: surface a helpful warning in dev
  if (!clerkPk && process.env.NODE_ENV !== "production") {
    console.warn("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
  }

  return (
    <ClerkProvider publishableKey={clerkPk} appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Header />
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
