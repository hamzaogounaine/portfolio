"use client"
import { ArrowDown } from "lucide-react"
import { useTranslations } from "next-intl"

const Hero = () => {
  const t = useTranslations('Hero')
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <section id="home" className="md:min-h-screen main h-[70vh]  flex-col flex gap-3 items-center justify-center relative">

      <div className="name text-4xl md:text-7xl flex gap-3 items-center justify-center font-bold">
        <span className="text-primary">Ogounaine </span>
        <span className="text-white">Hamza</span>
      </div>

      <div className="text-lg md:text-xl text-white/90 dark:text-foreground/90 font-medium">        {t("subtitle")}
      </div>

      <div> <button onClick={() => scrollToSection("projects")} className="mt-6 px-6 py-3 hover:scale-105 bg-white/10 border border-white/20 rounded-full text-white backdrop-blur-md hover:bg-white/20 transition duration-300 shadow-lg relative z-10">
        {t('cta')}
      </button></div>
      <div className="absolute md:bottom-30 bottom-10 animate-pulse text-white/80 dark:text-foreground/80">
        <ArrowDown className="w-6 h-6 md:w-8 md:h-8" />
      </div>
    </section>
  )
}

export default Hero