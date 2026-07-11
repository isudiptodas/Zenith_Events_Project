import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Zenith Events & Financial Consultancy",
  description: "Our Expertise is in Branding, Digital Marketing, Corporate Events, Social Events, Financial Planning and many more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LenisProvider>
          <CustomCursor />
          <Toaster richColors position="top-center" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
