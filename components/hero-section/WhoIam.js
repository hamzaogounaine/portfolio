"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function WhoIam() {
  const t = useTranslations("WhoIam");
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python"];

  return (
    <section id="about" className="p-8 md:p-12 flex justify-center border-0">
      <div className="border-0 bg-background backdrop-blur-sm m-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                width={300}
                height={300}
                src="/profile.jpg"
                alt={t("altProfile")}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-accent shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#344F1F] rounded-full border-4 border-background"></div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
                {t("greeting")} <span className="text-primary">Ogounaine Hamza</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                {t("title")}
              </p>
            </div>

            <p className="text-lg text-card-foreground leading-relaxed mb-6 max-w-2xl text-pretty">
              {t("bio")}
            </p>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {t("skillsTitle")}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-foreground/10 rounded-2xl text-foreground hover:bg-foreground/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 transition-colors shadow-lg"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="w-4 h-4 mr-2" />
                {t("getInTouch")}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border hover:bg-primary/10 hover:text-primary transition-colors bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("viewCV")}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-background border rounded-xl shadow-md"
                >
                  <DropdownMenuItem asChild>
                    <a href="/cv/cv_fr.pdf" target="_blank" rel="noopener noreferrer">
                      🇫🇷 {t("cvFr")}
                    </a>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <a href="/cv/cv_en.pdf" target="_blank" rel="noopener noreferrer">
                      🇬🇧 {t("cvEn")}
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
