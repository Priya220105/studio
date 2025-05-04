import type { Project } from "@/types/project";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils"; // Import cn utility

interface ProjectListProps {
  projects: Project[];
  /** Optional set of project IDs to highlight (e.g., AI matches) */
  highlightedProjectIds?: Set<string>;
}

export function ProjectList({ projects, highlightedProjectIds }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
            key={project.id}
            project={project}
            className={cn(
                highlightedProjectIds?.has(project.id) && "ring-2 ring-offset-2 ring-accent shadow-lg scale-[1.01]" // Apply highlight style
            )}
         />
      ))}
    </div>
  );
}
