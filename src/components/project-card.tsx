
import type { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, Briefcase } from "lucide-react"; // Keep necessary icons
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import { iconMap } from './project-card-icon-map'; // Import shared icon map
import { cn } from "@/lib/utils"; // Import cn


interface ProjectCardProps {
  project: Project;
  className?: string; // Add className prop
}


export function ProjectCard({ project, className }: ProjectCardProps) {
  const deadlineText = formatDistanceToNow(project.deadline, { addSuffix: true });
  const IconComponent = iconMap[project.categoryIcon] || Briefcase; // Default to Briefcase icon

  return (
    <Card className={cn("flex flex-col justify-between hover:shadow-lg transition-shadow duration-200", className)}> {/* Apply className */}
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          {/* Link the title to the project details page */}
          <Link href={`/projects/${project.id}`} className="hover:underline">
             <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          </Link>
          <Badge variant="secondary" className="flex items-center gap-1.5 shrink-0">
             <IconComponent className="h-4 w-4 text-muted-foreground" />
             <span className="capitalize">{project.categoryIcon.replace(/([A-Z])/g, ' $1').trim()}</span>
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4" />
            <span>Budget: ${project.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>Deadline: {deadlineText}</span>
          </div>
           {/* Optionally show client info snippet */}
           {project.clientName && (
             <div className="flex items-center gap-1.5 pt-1 text-xs">
                {/* Simple text representation for card */}
                <span>Client: {project.clientName}</span>
             </div>
           )}
        </div>
      </CardContent>
      <CardFooter>
         {/* Keep button linking to proposal submission */}
        <Link href={`/projects/${project.id}/submit-proposal`} passHref className="w-full">
            <Button className="w-full" variant="default">
                Submit Proposal
            </Button>
        </Link>
         {/* Optionally add a secondary button/link to just view details if needed */}
         {/* <Link href={`/projects/${project.id}`} passHref className="w-full">
            <Button className="w-full mt-2" variant="outline">
                View Details
            </Button>
        </Link> */}
      </CardFooter>
    </Card>
  );
}
