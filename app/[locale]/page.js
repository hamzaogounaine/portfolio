import { Contact } from '@/components/hero-section/Contact'
import Hero from '@/components/hero-section/Hero'
import { ProjectsShowcase } from '@/components/hero-section/Projects'
import WhoIam from '@/components/hero-section/WhoIam'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero />
      <WhoIam />
      <ProjectsShowcase />
      <Contact />
    </div>
  )
}

export default page
