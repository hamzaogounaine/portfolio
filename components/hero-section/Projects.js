"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import projects from "@/components/projects/projects.json"; 
import Image from "next/image";
import Link from "next/link"; // <-- import Link

export function ProjectsShowcase() {
  const t = useTranslations("ProjectsShowcase");
  const lang = useLocale(); 
  const [filter, setFilter] = useState("all");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProjects =
    filter === "featured"
      ? projects.filter((project) => project.featured)
      : projects;

  return (
    <section id="projects" className="projects m-2 border shadow-2xl rounded-3xl md:py-15 py-10 px-5">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-balance">
            {t("header")}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto text-pretty">
            {t("subheader")}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-md"
            >
              {t("allProjects")}
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("featured")}
              className="rounded-md"
            >
              {t("featured")}
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <Card
              key={project.slug}
              className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <Image
                  width={200}
                  height={100}
                  src={project.images[0]?.url || "/placeholder.svg"}
                  alt={project.title[lang]}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {project.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {t("featured")}
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-black text-card-foreground mb-3 text-balance">
                  {project.title[lang]}
                </h3>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed text-pretty">
                  {project.description[lang]}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs  text-background bg-primary "
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("liveDemo")}
                      </a>
                    </Button>
                  )}


                  {/* Show Details Button */}
                  <Link href={`/project/${project.slug}`} locale={lang} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      {t("showDetails")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-pretty mb-4">{t("ctaText")}</p>
          <Button
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-primary"
            onClick={() => scrollToSection("contact")}
          >
            {t("getInTouch")}
          </Button>
        </div>
      </div>
    </section>
  );
}
