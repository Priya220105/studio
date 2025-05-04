'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { enhanceProposal } from '@/ai/flows/enhance-proposal'; // Assuming this is the correct path
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from 'lucide-react';
import type { Project } from "@/types/project"; // Import the Project type
import { Header } from "@/components/layout/header"; // Import Header

// Mock function to fetch project details - replace with actual API call
async function fetchProjectDetails(projectId: string): Promise<Project | null> {
    console.log(`Fetching project details for ID: ${projectId}`);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Sample project data (replace with actual fetch logic)
    const projects: Project[] = [
      { id: "1", title: "Build a Responsive E-commerce Website", description: "Need a modern e-commerce site with payment gateway integration. Must be mobile-friendly. Key requirements: Shopify integration, secure checkout, product filtering.", budget: 5000, deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), categoryIcon: "ShoppingCart" },
      { id: "2", title: "Develop a Mobile App for Task Management", description: "Create a cross-platform mobile app (iOS & Android) for managing daily tasks. Requirements: User authentication, task creation/editing, push notifications.", budget: 8000, deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), categoryIcon: "Smartphone" },
      { id: "3", title: "Design a Logo and Brand Identity", description: "Looking for a creative designer to craft a unique logo and branding guidelines for a new startup. Deliverables: Logo files (vector, png), color palette, typography guidelines.", budget: 1500, deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), categoryIcon: "Palette" },
      { id: "4", title: "Write Blog Content for Tech Startup", description: "Need engaging blog posts about AI and machine learning trends. 4 posts per month. Requirements: SEO optimized, 1000+ words each, original content.", budget: 1000, deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), categoryIcon: "PenTool" },
    ];

    const project = projects.find(p => p.id === projectId);
    return project || null;
}

// Define Zod schema for form validation
const proposalSchema = z.object({
  coverLetter: z.string().min(50, { message: "Cover letter must be at least 50 characters long." }).max(5000, { message: "Cover letter cannot exceed 5000 characters."}),
  proposedRate: z.coerce.number().positive({ message: "Proposed rate must be a positive number." }),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

export default function SubmitProposalPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const form = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      coverLetter: "",
      proposedRate: 0,
    },
  });

   useEffect(() => {
    if (projectId) {
      setIsLoadingProject(true);
      fetchProjectDetails(projectId)
        .then(data => {
            if (data) {
                setProject(data);
            } else {
                toast({
                    title: "Error",
                    description: "Project not found.",
                    variant: "destructive",
                });
                 // Consider redirecting or showing a not found message
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
        .finally(() => setIsLoadingProject(false));
    }
   }, [projectId, toast]);

   const handleEnhanceProposal = async () => {
    if (!project) return;

    const currentCoverLetter = form.getValues("coverLetter");
    if (!currentCoverLetter || currentCoverLetter.length < 10) {
         toast({
            title: "Cannot Enhance",
            description: "Please write a brief cover letter first.",
            variant: "destructive",
         });
         return;
    }

    setIsEnhancing(true);
    try {
        const result = await enhanceProposal({
            proposal: currentCoverLetter,
            projectRequirements: project.description,
        });
        form.setValue("coverLetter", result.enhancedProposal);
        toast({
            title: "Proposal Enhanced!",
            description: "AI suggestions have been applied to your cover letter.",
        });
    } catch (error) {
        console.error("Error enhancing proposal:", error);
        toast({
            title: "Enhancement Failed",
            description: "Could not enhance the proposal at this time.",
            variant: "destructive",
        });
    } finally {
        setIsEnhancing(false);
    }
   };

  const onSubmit = async (data: ProposalFormData) => {
    setIsSubmitting(true);
    console.log("Submitting proposal:", data);
    // TODO: Replace with actual API call to submit the proposal
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Proposal Submitted!",
        description: "Your proposal has been successfully submitted.",
      });
      form.reset();
      // Optionally redirect user after successful submission
      // router.push('/projects');
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast({
        title: "Submission Failed",
        description: "Could not submit your proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingProject) {
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
            <div className="flex flex-1 justify-center items-center">
                <p className="text-xl text-muted-foreground">Project not found.</p>
            </div>
        </div>
    )
  }


  return (
    <div className="flex flex-col min-h-screen bg-secondary">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8">
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
            <CardTitle>Submit Proposal for: {project.title}</CardTitle>
            <CardDescription>Review the project details and submit your proposal below.</CardDescription>
            {/* Optionally display more project details here */}
            <div className="mt-4 p-4 bg-muted/50 rounded-md border">
                <h4 className="font-semibold mb-2">Project Requirements:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{project.description}</p>
            </div>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Cover Letter</FormLabel>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleEnhanceProposal}
                                disabled={isEnhancing || !project}
                                className="text-accent hover:text-accent/90"
                            >
                                {isEnhancing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Wand2 className="mr-2 h-4 w-4" />
                                )}
                                Enhance with AI
                            </Button>
                        </div>
                        <FormControl>
                        <Textarea
                            placeholder="Explain why you are a good fit for this project..."
                            rows={10}
                            {...field}
                            disabled={isSubmitting || isEnhancing}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="proposedRate"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Proposed Rate (USD)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 2500" {...field} disabled={isSubmitting}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <CardFooter className="p-0 pt-6">
                     <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting || isEnhancing}>
                         {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                         {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                    </Button>
                 </CardFooter>
                </form>
            </Form>
            </CardContent>

        </Card>
        </main>
    </div>
  );
}
