// app/projets/[slug]/page.tsx (or pages/projets/[slug].tsx)
import ProjectDetails from "@/components/project-details"
import projects from "@/components/projects/projects.json" // import JSON
import { notFound } from "next/navigation"

export default function ProjectPage({ params }) {
  const project = projects.find(p => p.slug === params.slug)
  console.log(project)
  if (!project) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <ProjectDetails {...project} />
      </div>
    </div>
  )
}
