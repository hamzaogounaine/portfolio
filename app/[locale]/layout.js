import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import Loader from "./Loader";

export const metadata = {
  title: "Ogounaine Hamza",
  description: "Portfolio",
  icons: {
    icon: "/icon/favicon.ico", // or .png or .svg
  },
};

export default async function LocaleLayout({ children, params }) {  

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  
  return (
    <html lang="en">
    <body>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Loader />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      
    </html>
  );
}
