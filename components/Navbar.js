"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  const handleLanguageChange = async (lang) => {
    const newPathname = pathname.replace(/^\/(en|fr|ar)/, `/${lang}`);
    router.push(newPathname);
  };

  // ✅ Smooth scroll with offset
  const scrollToSection = (id) => {
    const section = document.querySelector(`#${id}`);
    if (section) {
      const yOffset = -80; // adjust based on your navbar height
      const y =
        section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: t("home"), href: "home" },
    { name: t("about"), href: "about" },
    { name: t("projects"), href: "projects" },
    { name: t("contact"), href: "contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className=" text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <Image
                src={isDark ? "/dark-logo.png" : "/logo.png"}
                width={60}
                height={60}
                alt="logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent/10 rounded-md"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">{t("switchLanguage")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`cursor-pointer ${
                      locale === lang.code ? "bg-accent" : ""
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">{t("toggleTheme")}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 p-0"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">{t("toggleMenu")}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`px-2 pt-2 pb-3 space-y-1 border-t border-border/40 transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-2"
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  scrollToSection(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className="text-foreground hover:text-primary block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-accent/10 rounded-md"
              >
                {link.name}
              </button>
            ))}

            {/* Mobile Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-4">
              <div className="flex items-center space-x-4">
                {/* Mobile Language Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 px-3">
                      <Globe className="h-4 w-4 mr-2" />
                      {locale.toUpperCase()}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`cursor-pointer ${
                          locale === lang.code ? "bg-accent" : ""
                        }`}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Theme Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="h-9 px-3"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      {t("light")}
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      {t("dark")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
