
import Link from 'next/link'; // Added import
import { Header } from "@/components/layout/header";
import { ProjectList } from "@/components/project-list";
import type { Project } from "@/types/project";

// Sample project data (Updated with client info)
const projects: Project[] = [
  {
    id: "1",
    title: "Build a Responsive E-commerce Website",
    description: "Need a modern e-commerce site with payment gateway integration. Must be mobile-friendly.",
    budget: 5000,
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    categoryIcon: "ShoppingCart",
    clientId: "client-abc",
    clientName: "Global Mart Inc.",
    clientAvatarUrl: `https://picsum.photos/40/40?random=clientA`
  },
  {
    id: "2",
    title: "Develop a Mobile App for Task Management",
    description: "Create a cross-platform mobile app (iOS & Android) for managing daily tasks.",
    budget: 8000,
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    categoryIcon: "Smartphone",
     clientId: "client-def",
     clientName: "Productivity Co.",
     clientAvatarUrl: `https://picsum.photos/40/40?random=clientB`
  },
  {
    id: "3",
    title: "Design a Logo and Brand Identity",
    description: "Looking for a creative designer to craft a unique logo and branding guidelines for a new startup.",
    budget: 1500,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    categoryIcon: "Palette",
     clientId: "client-ghi",
     clientName: "Innovate Solutions",
     clientAvatarUrl: `https://picsum.photos/40/40?random=clientC`
  },
   {
    id: "4",
    title: "Write Blog Content for Tech Startup",
    description: "Need engaging blog posts about AI and machine learning trends. 4 posts per month.",
    budget: 1000,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    categoryIcon: "PenTool",
    clientId: "client-jkl",
    clientName: "Future Tech Blog",
    clientAvatarUrl: `https://picsum.photos/40/40?random=clientD`
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {/* You might want a different component/layout for the homepage vs. the full project list */}
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
        <ProjectList projects={projects} />
         {/* Add a link to see all projects */}
         <div className="mt-8 text-center">
            <Link href="/projects" className="text-primary hover:underline font-medium">
               View All Projects
            </Link>
         </div>
      </main>
    </div>
  );
}
