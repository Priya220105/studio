
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

// Mock function to fetch project details - replace with actual API call
async function fetchProjectDetails(projectId: string): Promise<Project | null> {
    console.log(`Fetching project details for ID: ${projectId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    const projects: Project[] = [
      { id: "1", title: "Build a Responsive E-commerce Website", description: "Need a modern e-commerce site with payment gateway integration. Must be mobile-friendly. Key requirements: Shopify integration, secure checkout, product filtering.", budget: 5000, deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), categoryIcon: "ShoppingCart", clientId: "client-abc", clientName: "Global Mart Inc.", clientAvatarUrl: `https://picsum.photos/40/40?random=clientA` },
      { id: "2", title: "Develop a Mobile App for Task Management", description: "Create a cross-platform mobile app (iOS & Android) for managing daily tasks. Requirements: User authentication, task creation/editing, push notifications.", budget: 8000, deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), categoryIcon: "Smartphone", clientId: "client-def", clientName: "Productivity Co.", clientAvatarUrl: `https://picsum.photos/40/40?random=clientB` },
      { id: "3", title: "Design a Logo and Brand Identity", description: "Looking for a creative designer to craft a unique logo and branding guidelines for a new startup. Deliverables: Logo files (vector, png), color palette, typography guidelines.", budget: 1500, deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), categoryIcon: "Palette", clientId: "client-ghi", clientName: "Innovate Solutions", clientAvatarUrl: `https://picsum.photos/40/40?random=clientC` },
      { id: "4", title: "Write Blog Content for Tech Startup", description: "Need engaging blog posts about AI and machine learning trends. 4 posts per month. Requirements: SEO optimized, 1000+ words each, original content.", budget: 1000, deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), categoryIcon: "PenTool", clientId: "client-jkl", clientName: "Future Tech Blog", clientAvatarUrl: `https://picsum.photos/40/40?random=clientD` },
      // Add clientId, clientName, clientAvatarUrl to other projects if needed
    ];
    const project = projects.find(p => p.id === projectId);
    return project || null;
}

// Mock function to fetch client feedback history - replace with actual API call
async function fetchClientFeedback(clientId: string): Promise<{ feedback: Feedback[], stats: RatingStats } | null> {
    console.log(`Fetching feedback for client ID: ${clientId}`);
    await new Promise(resolve => setTimeout(resolve, 600));
    // Simulate feedback *received by* this client from freelancers
    const sampleFeedback: Feedback[] = [
        { id: 'cfb1', projectId: 'projX', authorId: 'freelancerA', recipientId: clientId, rating: 5, comment: 'Clear communication, paid promptly. A pleasure to work with!', submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), authorRole: 'freelancer' },
        { id: 'cfb2', projectId: 'projY', authorId: 'freelancerB', recipientId: clientId, rating: 4, comment: 'Project scope was well-defined. Some minor delays in providing assets.', submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), authorRole: 'freelancer' },
         { id: 'cfb3', projectId: 'projZ', authorId: 'freelancerC', recipientId: "other-client", rating: 5, comment: 'Irrelevant feedback', submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), authorRole: 'freelancer' },
    ].filter(f => f.recipientId === clientId); // Ensure feedback is for the correct client

    if (sampleFeedback.length === 0) {
        return { feedback: [], stats: { averageRating: 0, totalRatings: 0 } };
    }

    const totalRatingSum = sampleFeedback.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = totalRatingSum / sampleFeedback.length;

    return {
        feedback: sampleFeedback.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()),
        stats: {
            averageRating: Math.round(averageRating * 10) / 10,
            totalRatings: sampleFeedback.length,
        }
    };
}


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
