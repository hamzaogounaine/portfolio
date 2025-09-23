"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Loader,
  Instagram,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("Contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    setStatus("");
    setLoading(true);
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setStatus(data.message);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="w-full max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          {t("title")}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl text-card-foreground">
              {t("form.title")}
            </CardTitle>
            <CardDescription>{t("form.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("form.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-input border-border focus:ring-ring"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder={t("form.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-input border-border focus:ring-ring"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={t("form.message")}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-input border-border focus:ring-ring resize-none"
                />
              </div>
              {status && <div className="text-primary mb-4">{status}</div>}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {!loading && <Send className="w-4 h-4 mr-2" />}
                {loading ? <Loader className="animate-spin" /> : t("form.button")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground">
                {t("info.title")}
              </CardTitle>
              <CardDescription>{t("info.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-card-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>ogounainehamza@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-card-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+212 6 7418 0102</span>
              </div>
              <div className="flex items-center space-x-3 text-card-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{t("info.location")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground">
                {t("social.title")}
              </CardTitle>
              <CardDescription>{t("social.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/hamzaogounaine/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-card-foreground font-medium">
                  {t("availability.title")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {t("availability.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
