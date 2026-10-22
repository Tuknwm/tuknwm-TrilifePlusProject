import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "TrilifePlus",
  description: "Your trusted digital insurance marketplace for Life, Health, and Auto protection.",
  icons: {
    icon: "/Logo6.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="page-transition min-h-screen bg-primary text-secondary font-sans antialiased selection:bg-secondary selection:text-white">
        <SmoothScrollProvider>
          <AppShell>{children}</AppShell>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

