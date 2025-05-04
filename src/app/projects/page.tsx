import { Header } from "@/components/layout/header";
import { ProjectList } from "@/components/project-list";
import type { Project } from "@/types/project";

// Sample project data (Same as homepage for now)
// TODO: Replace with actual data fetching, potentially with pagination/filtering
const projects: Project[] = [
  { id: "1", title: "Build a Responsive E-commerce Website", description: "Need a modern e-commerce site with payment gateway integration. Must be mobile-friendly.", budget: 5000, deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), categoryIcon: "ShoppingCart" },
  { id: "2", title: "Develop a Mobile App for Task Management", description: "Create a cross-platform mobile app (iOS & Android) for managing daily tasks.", budget: 8000, deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), categoryIcon: "Smartphone" },
  { id: "3", title: "Design a Logo and Brand Identity", description: "Looking for a creative designer to craft a unique logo and branding guidelines for a new startup.", budget: 1500, deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), categoryIcon: "Palette" },
  { id: "4", title: "Write Blog Content for Tech Startup", description: "Need engaging blog posts about AI and machine learning trends. 4 posts per month.", budget: 1000, deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), categoryIcon: "PenTool" },
   { id: "5", title: "Data Analysis for Marketing Campaign", description: "Analyze marketing data to provide insights on campaign performance. Requires experience with SQL and data visualization tools.", budget: 3000, deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), categoryIcon: "BarChart" },
   { id: "6", title: "Setup CI/CD Pipeline for NodeJS App", description: "Configure a continuous integration and deployment pipeline using GitHub Actions and AWS.", budget: 2000, deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), categoryIcon: "Cog" },
];


export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
         <h1 className="text-2xl font-bold mb-6">Available Projects</h1>
        {/* TODO: Add filtering/sorting options here */}
        <ProjectList projects={projects} />
      </main>
    </div>
  );
}
