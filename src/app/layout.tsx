import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import CustomCursor from "@/components/CustomCursor";
import LenisProvider from "@/components/LenisProvider";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

export const metadata: Metadata = {
  title: "Zenith Events & Financial Consultancy",
  description: "Zenith Events & Financial Consultancy delivers expert financial guidance and premium event management solutions under one roof. We specialize in corporate event planning, brand building, and social experiences while simultaneously providing reliable, practical financial consulting. Our mission is to bridge the gap between strategic financial growth and flawless event execution. Built on trust, integrity, and transparency, we deliver tailored solutions that align perfectly with your unique business goals.",
  keywords: [
    "Event Management Kolkata",
    "Corporate Event Planner Kolkata",
    "Financial Consultancy Kolkata",
    "GST Consultant Kolkata",
    "Tax Consultant Kolkata",
    "Accounting Services Kolkata",
    "Business Consultancy Kolkata",
  ],
  openGraph: {
    title: "Zenith Events & Financial Consultancy",
    description:
      "Professional Event Management and Financial Consultancy Services in Kolkata.",
    url: "https://www.zefc.in",
    siteName: "Zenith Events & Financial Consultancy",
    images: [
      {
        url: "https://www.zefc.in/assets/social-banner.jpeg",
        width: 1200,
        height: 630,
      },
    ],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LocalBusinessSchema />
        <LenisProvider>
          <CustomCursor />
          <Toaster richColors position="top-center" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
