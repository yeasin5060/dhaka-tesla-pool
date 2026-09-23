import type { Metadata } from "next";

import "./globals.css";

import { AuthProvider } from "@/hooks/useAuth";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Dhaka Tesla Pool",
  description:
    "Tesla ride pooling platform for Dhaka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}