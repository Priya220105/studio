
'use client'; // Required for useEffect, useState

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { ProjectList } from "@/components/project-list";
import type { Project } from "@/types/project";
import { fetchAllProjects } from '@/lib/mock-data'; // Use centralized function
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

   useEffect(() => {
    setIsLoading(true);
    fetchAllProjects()
        .then(data => {
            // Show only a few featured projects on the homepage
            setProjects(data.slice(0, 3));
        })
        .catch(error => {
          console.error("Error fetching projects:", error);
          toast({
            title: "Error",
            description: "Failed to load featured projects.",
            variant: "destructive",
          });
        })
        .finally(() => setIsLoading(false));
   }, [toast]);


  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>

         {isLoading ? (
             <div className="flex justify-center items-center py-10">
                 <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </div>
         ) : projects.length > 0 ? (
             <>
                <ProjectList projects={projects} />
                 <div className="mt-8 text-center">
                    <Link href="/projects" className="text-primary hover:underline font-medium">
                       View All Projects
                    </Link>
                 </div>
             </>
         ) : (
            <p className="text-center text-muted-foreground mt-10">No featured projects available right now.</p>
         )}

      </main>
    </div>
  );
}
