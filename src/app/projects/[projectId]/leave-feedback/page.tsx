'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { FeedbackForm } from "@/components/feedback-form";
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Project } from '@/types/project';
import type { Profile } from '@/types/profile';
import { fetchProjectDetails, fetchUserProfile } from '@/lib/mock-data';

// Assume this is the ID of the currently logged-in user
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id';

export default function LeaveFeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = params.projectId as string;
  const { toast } = useToast();

  const [project, setProject] = useState<Partial<Project> | null>(null);
  const [recipient, setRecipient] = useState<Pick<Profile, 'id' | 'name'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine author role and recipient ID based on project data and logged-in user
  const authorId = MOCK_LOGGED_IN_USER_ID;
  let authorRole: 'client' | 'freelancer' | null = null;
  let recipientId: string = ''; 

  // Get intended role from query param if provided
  const roleFromQuery = searchParams.get('role') as 'client' | 'freelancer' | null;

  useEffect(() => {
    if (!projectId) {
      setError("Project ID is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchProjectDetails(projectId)
      .then(async (projectData) => {
        if (!projectData) {
          throw new Error("Project not found.");
        }
        setProject(projectData);

        // Determine role and recipient
        if (projectData.clientId === authorId) {
          authorRole = 'client';
          recipientId = projectData.freelancerId;
        } else if (projectData.freelancerId === authorId) {
          authorRole = 'freelancer';
          recipientId = projectData.clientId;
        }

        if (roleFromQuery && roleFromQuery !== authorRole) {
          console.warn(`Role mismatch: Query param says '${roleFromQuery}', project data implies '${authorRole}'. Trusting project data.`);
        }

        if (!recipientId || !authorRole) {
           throw new Error("Could not determine recipient or author role for feedback based on project data and logged-in user.");
            return; // Add this line 
            } 

        const recipientData = await fetchUserProfile(recipientId);
        if (!recipientData) {
          throw new Error("Recipient user not found.");
        }
        setRecipient({ id: recipientData.id, name: recipientData.name });
      })
      .catch((err) => {
        console.error("Error loading feedback context:", err);
        setError(err.message || "Failed to load necessary information for feedback.");
        toast({
          title: "Error",
          description: err.message || "Could not load feedback page.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [projectId, roleFromQuery, toast]);

  const handleFeedbackSubmitted = () => {
    toast({
      title: "Success",
      description: "Feedback submitted. Redirecting...",
    });
    setTimeout(() => {
      router.push(`/projects/${projectId}`);
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

  if (error || !project || !recipient) {
    return (
      <div className="flex flex-col min-h-screen bg-secondary">
        <Header />
        <main className="flex-grow flex flex-col justify-center items-center p-4">
          <p className="text-destructive mb-4">{error || 'An unexpected error occurred.'}</p>
          <Link href={`/projects/${projectId}`} className="flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2" /> Back to Project
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-grow p-4 max-w-xl mx-auto">
        <Link href={`/projects/${projectId}`} className="flex items-center text-primary mb-6 hover:underline">
          <ArrowLeft className="mr-2" /> Back to Project
        </Link>
        <h1 className="text-2xl font-semibold mb-4">Leave Feedback for {recipient.name}</h1>
        <FeedbackForm 
        projectId={projectId} 
        authorId={authorId} 
        recipientId={recipient?.id ?? ''} 
        authorRole={authorRole!} 
        onFeedbackSubmitted={handleFeedbackSubmitted} 
        />
      </main>
    </div>
  );
}
