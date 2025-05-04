
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link'; // Import Link
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { enhanceProposal } from '@/ai/flows/enhance-proposal';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, ArrowLeft } from 'lucide-react'; // Add ArrowLeft
import type { Project } from "@/types/project";
import { Header } from "@/components/layout/header";
import { fetchProjectDetails, submitProposalApi } from '@/lib/mock-data'; // Use centralized mock functions
import { cn } from '@/lib/utils'; // Import cn utility

// Assume this is the ID of the currently logged-in user
// Replace with actual authentication logic
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id';

// Define Zod schema for form validation
const proposalSchema = z.object({
  coverLetter: z.string().min(50, { message: "Cover letter must be at least 50 characters long." }).max(5000, { message: "Cover letter cannot exceed 5000 characters."}),
  proposedRate: z.coerce.number().positive({ message: "Proposed rate must be a positive number." }),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

export default function SubmitProposalPage() {
  const params = useParams();
  const router = useRouter(); // Initialize router
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
      proposedRate: undefined, // Use undefined for better placeholder behavior
    },
  });

   useEffect(() => {
    if (projectId) {
      setIsLoadingProject(true);
      fetchProjectDetails(projectId)
        .then(data => {
            if (data) {
                setProject(data);
                 // Optionally Pre-fill proposed rate based on budget
                 form.setValue("proposedRate", data.budget ? Math.round(data.budget * 0.9) : undefined);
            } else {
                toast({
                    title: "Error",
                    description: "Project not found.",
                    variant: "destructive",
                });
                 router.push('/projects'); // Redirect if project not found
            }
        })
        .catch(error => {
          console.error("Error fetching project details:", error);
          toast({
            title: "Error",
            description: "Failed to load project details.",
            variant: "destructive",
          });
           router.push('/projects'); // Redirect on error
        })
        .finally(() => setIsLoadingProject(false));
    }
   }, [projectId, toast, router, form]); // Added form to dependency array

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
    if (!project) return; // Should not happen if loading state is handled

    setIsSubmitting(true);
    try {
      // Use the centralized mock API function
      await submitProposalApi(project.id, MOCK_LOGGED_IN_USER_ID, data);
      toast({
        title: "Proposal Submitted!",
        description: "Your proposal has been successfully submitted.",
      });
      // Redirect to the project details page after successful submission
      router.push(`/projects/${projectId}`);
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

  // Project should exist at this point due to checks in useEffect
  if (!project) return null; // Or a fallback UI, though redirect should handle it


  return (
    <div className="flex flex-col min-h-screen bg-secondary">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8">
          {/* Add back link to project details */}
          <Link href={`/projects/${projectId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project Details
          </Link>

          <Card className="max-w-3xl mx-auto">
              <CardHeader>
              <CardTitle>Submit Proposal for: {project.title}</CardTitle>
              <CardDescription>Review the project requirements and submit your proposal below.</CardDescription>
              {/* Optionally display summarised project details here if needed */}
              <div className="mt-4 p-4 bg-muted/50 rounded-md border text-sm">
                  <p><span className="font-semibold">Budget:</span> ${project.budget.toLocaleString()}</p>
                  <p className="mt-1"><span className="font-semibold">Requirements Summary:</span> {project.description.substring(0, 150)}{project.description.length > 150 ? '...' : ''}</p>
                  {/* Link to full details */}
                   <Link href={`/projects/${projectId}`} className="text-primary text-xs hover:underline mt-2 inline-block">View full project details</Link>
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
                              <FormLabel>Cover Letter <span className="text-destructive">*</span></FormLabel>
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
                          <FormLabel>Proposed Rate (USD) <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                          <Input
                            type="number"
                            step="any" // Allow decimals if needed
                            placeholder={`e.g., ${project.budget ? Math.round(project.budget * 0.9) : 1000}`}
                            {...field}
                            disabled={isSubmitting}
                           />
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
