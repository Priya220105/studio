import type { Project } from "@/types/project";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, ShoppingCart, Smartphone, Palette, PenTool, Briefcase, FileText, Cog, BarChart } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

// Map icon names to Lucide components
const iconMap: { [key: string]: React.ComponentType<any> } = {
  ShoppingCart,
  Smartphone,
  Palette,
  PenTool,
  Briefcase, // Default/generic
  FileText, // For content writing etc.
  Cog, // For technical projects
  BarChart, // For data/analytics projects
};


export function ProjectCard({ project }: ProjectCardProps) {
  const deadlineText = formatDistanceToNow(project.deadline, { addSuffix: true });
  const IconComponent = iconMap[project.categoryIcon] || Briefcase; // Default to Briefcase icon

  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1.5">
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
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/projects/${project.id}/submit-proposal`} passHref className="w-full">
            <Button className="w-full" variant="default">
                View Details & Submit Proposal
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
