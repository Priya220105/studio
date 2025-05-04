
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { FeedbackForm } from "@/components/feedback-form";
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/types/project'; // Assuming project type exists
import type { Profile } from '@/types/profile'; // Assuming profile type exists

// Mock function to fetch project details - replace with actual API call
async function fetchProjectDetails(projectId: string): Promise<Project | null> {
    console.log(`Fetching project details for feedback page: ${projectId}`);
    await new Promise(resolve => setTimeout(resolve, 400));
    // Simple mock data needed for context
    const projects: Partial<Project>[] = [
        { id: "1", title: "Build a Responsive E-commerce Website", clientId: "client-abc", /* other fields */ },
        { id: "2", title: "Develop a Mobile App for Task Management", clientId: "client-def", /* other fields */ },
        // Assume freelancerId might be stored on the project after completion/award
        { id: "projA", title: "Completed Project A", clientId: "client1", freelancerId: "mock-user-id"},
        { id: "projB", title: "Completed Project B", clientId: "client2", freelancerId: "mock-user-id"},
        { id: "projC", title: "Completed Project C", clientId: "mock-user-id", freelancerId: "freelancer1"}, // Case where current user is client
    ];
    const project = projects.find(p => p.id === projectId) as Project | undefined; // Cast needed if using partial type
    return project || null;
}

// Mock function to fetch minimal profile details (just name/ID) - replace with actual API call
async function fetchMinimalProfile(userId: string): Promise<Pick<Profile, 'id' | 'name'> | null> {
     console.log(`Fetching minimal profile for feedback recipient: ${userId}`);
     await new Promise(resolve => setTimeout(resolve, 300));
     // Simulate finding user based on ID
     const users = {
         'mock-user-id': { id: 'mock-user-id', name: 'Freelancer Name' },
         'client1': { id: 'client1', name: 'Client One Inc.' },
         'client2': { id: 'client2', name: 'Client Two Co.' },
         'freelancer1': { id: 'freelancer1', name: 'Expert Developer' },
     };
     return users[userId as keyof typeof users] || null;
}

// Assume this is the ID of the currently logged-in user
// Replace with actual authentication logic
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id';

export default function LeaveFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams(); // To potentially get role context

  const projectId = params.projectId as string;
  const { toast } = useToast();

  const [project, setProject] = useState<Partial<Project> | null>(null); // Use Partial for flexibility
  const [recipient, setRecipient] = useState<Pick<Profile, 'id' | 'name'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine author role and recipient ID based on project data and logged-in user
  const authorId = MOCK_LOGGED_IN_USER_ID;
  let authorRole: 'client' | 'freelancer' | null = null;
  let recipientId: string | null = null;

  if (project) {
      if (project.clientId === authorId) {
          authorRole = 'client';
          recipientId = project.freelancerId; // Assuming freelancerId is available on project
      } else if (project.freelancerId === authorId) {
          authorRole = 'freelancer';
          recipientId = project.clientId;
      }
  }

  // Determine role from query params if needed (e.g., ?role=client)
  const roleFromQuery = searchParams.get('role');
  if (!authorRole && (roleFromQuery === 'client' || roleFromQuery === 'freelancer')) {
     // This part is less reliable, needs project data ideally
     // authorRole = roleFromQuery;
     // recipientId = searchParams.get('recipientId'); // Needs recipient ID passed too
     console.warn("Feedback role determined by query param - less reliable.");
  }


  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    Promise.all([
        fetchProjectDetails(projectId),
        // We need recipientId determined *before* fetching their profile
    ]).then(async ([projectData]) => {
        if (!projectData) {
            throw new Error("Project not found.");
        }
        setProject(projectData);

        // Determine recipient based on project data and logged-in user
        let determinedRecipientId: string | null = null;
        if (projectData.clientId === authorId && projectData.freelancerId) {
            determinedRecipientId = projectData.freelancerId;
        } else if (projectData.freelancerId === authorId && projectData.clientId) {
            determinedRecipientId = projectData.clientId;
        }

        if (!determinedRecipientId) {
            // Fallback logic if IDs aren't on project, maybe use query params?
            // This scenario indicates missing data or logic elsewhere.
            throw new Error("Could not determine recipient for feedback.");
        }

        const recipientData = await fetchMinimalProfile(determinedRecipientId);
        if (!recipientData) {
            throw new Error("Recipient user not found.");
        }
        setRecipient(recipientData);

    }).catch(err => {
        console.error("Error loading feedback context:", err);
        setError(err.message || "Failed to load necessary information for feedback.");
        toast({
            title: "Error",
            description: err.message || "Could not load feedback page.",
            variant: "destructive",
        });
    }).finally(() => {
        setIsLoading(false);
    });

  }, [projectId, toast, authorId]); // Add authorId

  const handleFeedbackSubmitted = () => {
    toast({
      title: "Success",
      description: "Feedback submitted. Redirecting...",
    });
    // Redirect back to the project page or dashboard after submission
    setTimeout(() => {
        router.push(`/projects/${projectId}`); // Or maybe '/dashboard/completed-projects'
    }, 1500);
  };


  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary">
        <Header />
        <div className="flex flex-1 justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !project || !recipient || !authorRole || !recipientId) {
     return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <Header />
            <main className="flex-1 container mx-auto p-4 md:p-8">
                <Link href={`/projects/${projectId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Project
                </Link>
                <div className="flex flex-1 justify-center items-center mt-16 bg-destructive/10 border border-destructive text-destructive p-4 rounded-md max-w-md mx-auto">
                    <p>Error: {error || "Could not prepare feedback form. Missing required information."}</p>
                </div>
            </main>
        </div>
     )
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center">
         <div className="w-full max-w-lg">
            <Link href={`/projects/${projectId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Project: {project.title}
            </Link>
            <FeedbackForm
                projectId={projectId}
                recipientId={recipientId}
                authorId={authorId}
                authorRole={authorRole}
                onFeedbackSubmitted={handleFeedbackSubmitted}
            />
         </div>
      </main>
    </div>
  );
}
