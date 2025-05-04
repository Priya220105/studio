
'use client'; // Need client component for state and interaction

import { useState, useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { ProjectList } from "@/components/project-list";
import { AiMatchButton } from "@/components/ai-match-button"; // Import the new button
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // For info message
import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";
import { Loader2, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { fetchAllProjects, fetchUserProfile } from '@/lib/mock-data'; // Use mock API functions

// Assume this is the ID of the currently logged-in user
// Replace with actual authentication logic
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id'; // Example: Alice Developer

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [matchedProjectIds, setMatchedProjectIds] = useState<string[]>([]); // State for matched IDs
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
        fetchAllProjects(),
        fetchUserProfile(MOCK_LOGGED_IN_USER_ID) // Fetch current user's profile
    ]).then(([projectData, profileData]) => {
        setProjects(projectData);
        setProfile(profileData);
    }).catch(error => {
        console.error("Error loading projects page data:", error);
        toast({
            title: "Error",
            description: "Failed to load projects or profile.",
            variant: "destructive",
        });
    }).finally(() => {
        setIsLoading(false);
    });
  }, [toast]);

  const handleMatchesFound = (ids: string[]) => {
    setMatchedProjectIds(ids);
  };

  // Create a Set for faster lookups in ProjectList
  const highlightedIds = new Set(matchedProjectIds);

  if (isLoading) {
     return (
        <div className="flex flex-col min-h-screen bg-secondary">
          <Header />
          <div className="flex flex-1 justify-center items-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
        </div>
     )
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Available Projects</h1>
            {/* AI Match Button */}
            <AiMatchButton
                freelancerProfile={profile}
                availableProjects={projects}
                onMatchesFound={handleMatchesFound}
            />
         </div>

         {!profile && (
             <Alert variant="default" className="mb-6 bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300">
                 <Info className="h-4 w-4 !text-blue-600 dark:!text-blue-400" />
                <AlertTitle>Profile Needed for Matching</AlertTitle>
                <AlertDescription>
                    Create or load your profile to use the AI matching feature.
                </AlertDescription>
             </Alert>
         )}

        {/* TODO: Add filtering/sorting options here */}
        {projects.length > 0 ? (
            <ProjectList projects={projects} highlightedProjectIds={highlightedIds} />
        ) : (
            <p className="text-center text-muted-foreground mt-10">No projects available at the moment.</p>
        )}
      </main>
    </div>
  );
}
```