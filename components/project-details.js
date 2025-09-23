"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  User,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ProjectDetails = ({
  title,
  description,
  longDescription,
  images,
  techStack,
  liveUrl,
  githubUrl,
  date,
  client,
  category,
  features,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use next-intl to detect current locale
  const lang = useLocale();

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {title[lang]}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {description[lang]}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {category}
          </Badge>
          <Badge variant="outline" className="text-sm">
            {date}
          </Badge>
          {client && (
            <Badge variant="outline" className="text-sm">
              {client}
            </Badge>
          )}
        </div>
      </div>

      {/* Image Carousel */}
      <Card className="overflow-hidden bg-gradient-to-br from-card to-muted/20 backdrop-blur-sm border-border/50">
        <CardContent className="p-0 relative">
          <div className="relative aspect-video overflow-hidden">
            <Image
              height={400}
              width={800}
              src={images[currentImageIndex]?.url || "/placeholder.svg"}
              alt={images[currentImageIndex]?.caption[lang]}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-lg font-medium">
                  {images[currentImageIndex]?.caption[lang]}
                </p>
              </div>
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Information Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-card to-muted/20 backdrop-blur-sm border-border/50">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              About This Project
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {longDescription[lang]}
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Key Features
              </h3>
              <ul className="space-y-2">
                {features[lang].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Tech Stack */}
          <Card className="bg-gradient-to-br from-muted/20 to-card backdrop-blur-sm border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card className="bg-gradient-to-br from-card to-muted/20 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Project Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Completed: {date}</span>
                </div>
                {client && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-4 w-4 text-primary" />
                    <span>Client: {client}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>Category: {category}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {liveUrl && (
              <Button asChild className="flex-1">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button
                variant="outline"
                asChild
                className="flex-1 bg-transparent"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
