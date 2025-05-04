
// src/app/projects/[projectId]/page.tsx
// This file can be created if you want a dedicated page *just* for viewing project details
// without the proposal form immediately visible. If you prefer to keep the proposal form
// on the same page, you might integrate this content into the existing submit-proposal page.

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, Loader2, User, Briefcase, ArrowLeft } from "lucide-react"; // Add icons
import { formatDistanceToNow, format } from 'date-fns';
import type { Project } from "@/types/project";
import type { Feedback, RatingStats } from '@/types/feedback'; // Import Feedback types
import { RatingDisplay } from '@/components/rating-display';
import { FeedbackList } from '@/components/feedback-list';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // For client info
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { iconMap } from '@/components/project-card-icon-map'; // Import shared icon map
import { fetchProjectDetails, fetchClientFeedback } from '@/lib/mock-data'; // Use centralized mock functions


export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [clientFeedback, setClientFeedback] = useState<{ feedback: Feedback[], stats: RatingStats } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      setIsLoading(true);
      setProject(null); // Reset project state
      setClientFeedback(null); // Reset feedback state
      fetchProjectDetails(projectId)
        .then(async (projectData) => {
            if (projectData) {
                setProject(projectData);
                // Fetch client feedback if client ID exists
                if (projectData.clientId) {
                    try {
                        // Use the specific fetchClientFeedback function
                        const feedbackResult = await fetchClientFeedback(projectData.clientId);
                        setClientFeedback(feedbackResult);
                    } catch (feedbackError) {
                         console.error("Error fetching client feedback:", feedbackError);
                         // Non-critical error, don't block page load
                         toast({
                             title: "Info",
                             description: "Could not load client feedback history.",
                             variant: "default", // Use default or a less intrusive variant
                         });
                    }
                }
            } else {
                toast({
                    title: "Error",
                    description: "Project not found.",
                    variant: "destructive",
                });
                 // Consider redirecting
            }
        })
        .catch(error => {
          console.error("Error fetching project details:", error);
          toast({
            title: "Error",
            description: "Failed to load project details.",
            variant: "destructive",
          });
        })
        .finally(() => setIsLoading(false));
    }
   }, [projectId, toast]);

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

  if (!project) {
    return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <Header />
             <main className="flex-1 container mx-auto p-4 md:p-8">
                 <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                 </Link>
                <div className="flex flex-1 justify-center items-center mt-16">
                    <p className="text-xl text-muted-foreground">Project not found.</p>
                </div>
            </main>
        </div>
    )
  }

  const IconComponent = iconMap[project.categoryIcon] || Briefcase;
  const deadlineText = formatDistanceToNow(project.deadline, { addSuffix: true });

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8">
             <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
                 <ArrowLeft className="mr-2 h-4 w-4" />
                 Back to Projects
             </Link>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Project Details Card */}
                <Card className="lg:col-span-2 shadow-md">
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2 gap-4">
                            <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                            <Badge variant="secondary" className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                                <IconComponent className="h-4 w-4 text-muted-foreground" />
                                <span className="capitalize">{project.categoryIcon.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1.5">
                                <DollarSign className="h-4 w-4" />
                                <span>Budget: ${project.budget.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CalendarDays className="h-4 w-4" />
                                <span>Deadline: {deadlineText} ({format(project.deadline, 'MMM d, yyyy')})</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Separator />
                        <h4 className="font-semibold text-lg">Project Description</h4>
                        <CardDescription className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
                            {project.description}
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/projects/${project.id}/submit-proposal`} passHref className="w-full md:w-auto">
                            <Button className="w-full md:w-auto">
                                Submit Proposal
                            </Button>
                        </Link>
                         {/* Add Link to leave feedback if appropriate (e.g., project completed) */}
                        {/* Example condition - replace with actual logic */}
                        { project.status === 'completed' && project.freelancerId === MOCK_LOGGED_IN_USER_ID && (
                            <Link href={`/projects/${project.id}/leave-feedback?role=freelancer`} passHref className="w-full md:w-auto ml-4">
                                <Button variant="outline" className="w-full md:w-auto">Leave Feedback for Client</Button>
                            </Link>
                         )}
                         { project.status === 'completed' && project.clientId === MOCK_LOGGED_IN_USER_ID && (
                              <Link href={`/projects/${project.id}/leave-feedback?role=client`} passHref className="w-full md:w-auto ml-4">
                                <Button variant="outline" className="w-full md:w-auto">Leave Feedback for Freelancer</Button>
                            </Link>
                         )}
                    </CardFooter>
                </Card>

                 {/* Client Information & Feedback Card */}
                {project.clientId && (
                    <Card className="lg:col-span-1 shadow-md h-fit">
                        <CardHeader className="border-b pb-4">
                            <CardTitle className="text-xl">About the Client</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                             <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={project.clientAvatarUrl} alt={project.clientName} data-ai-hint="company logo" />
                                    <AvatarFallback>{project.clientName?.split(' ').map(n => n[0]).join('') || 'C'}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{project.clientName || `Client ${project.clientId.substring(0,5)}...`}</p>
                                     {/* Add more client details if available, e.g., location, member since */}
                                </div>
                             </div>
                              {/* Client Rating */}
                             {clientFeedback ? (
                                <>
                                    {clientFeedback.stats.totalRatings > 0 ? (
                                        <RatingDisplay
                                            rating={clientFeedback.stats.averageRating}
                                            totalRatings={clientFeedback.stats.totalRatings}
                                            className="mt-2"
                                        />
                                    ) : (
                                        <p className="text-sm text-muted-foreground mt-2">No ratings for this client yet.</p>
                                    )}
                                     <Separator className="my-4" />
                                     {/* Client Feedback History */}
                                    <FeedbackList
                                        feedbackItems={clientFeedback.feedback}
                                        title="Client History (Feedback from Freelancers)"
                                    />
                                </>
                             ) : (
                                 <div className="text-center py-4">
                                     <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mx-auto" />
                                     <p className="text-sm text-muted-foreground mt-2">Loading client feedback...</p>
                                 </div>
                             )}

                        </CardContent>
                    </Card>
                )}
             </div>
        </main>
    </div>
  );
}


// Add MOCK_LOGGED_IN_USER_ID constant if not already present
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id'; // Example ID

// Add a placeholder 'status' to Project type if needed for feedback button logic
declare module '@/types/project' {
    interface Project {
        status?: 'open' | 'in_progress' | 'completed' | 'cancelled'; // Example statuses
        freelancerId?: string; // ID of the hired freelancer
    }
}
