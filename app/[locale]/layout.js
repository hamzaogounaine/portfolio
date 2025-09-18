import { hasLocale, NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Ogounaine Hamza",
  description: "Portfolio",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  
  return (
    <html lang={locale}>
      <head>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@501&f[]=comico@400&display=swap" rel="stylesheet" />
      </head>
      <NextIntlClientProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <body
      >
        {children}
      </body>
      </ThemeProvider>
      </NextIntlClientProvider>
    </html>
  );
}
