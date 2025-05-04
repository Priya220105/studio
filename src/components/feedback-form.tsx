
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Star } from 'lucide-react';
import type { Feedback } from '@/types/feedback'; // Import Feedback type

// Placeholder function for submitting feedback - replace with actual API call
async function submitFeedbackApi(data: FeedbackFormData & { projectId: string; recipientId: string; authorId: string, authorRole: 'client' | 'freelancer' }): Promise<Feedback> {
  console.log("Submitting feedback data:", data);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Simulate success - return the saved data with a mock ID and timestamp
  return {
      id: `feedback-${Math.random().toString(36).substring(7)}`,
      projectId: data.projectId,
      authorId: data.authorId, // Replace with actual authenticated user ID
      recipientId: data.recipientId,
      rating: data.rating,
      comment: data.comment,
      submittedAt: new Date(),
      authorRole: data.authorRole,
  };
}


// Define Zod schema for feedback form validation
const feedbackSchema = z.object({
  rating: z.coerce.number().min(1, "Rating is required.").max(5, "Rating cannot exceed 5."),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters long." }).max(1000, { message: "Comment cannot exceed 1000 characters."}),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
    projectId: string;
    recipientId: string; // The user being reviewed
    authorId: string; // The user leaving the review (should come from auth)
    authorRole: 'client' | 'freelancer';
    onFeedbackSubmitted?: (feedback: Feedback) => void; // Optional callback
}

export function FeedbackForm({ projectId, recipientId, authorId, authorRole, onFeedbackSubmitted }: FeedbackFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0, // Initialize rating
      comment: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    if (data.rating === 0) {
        form.setError("rating", { type: "manual", message: "Please select a rating." });
        return;
    }
    setIsSubmitting(true);
    try {
      const feedbackData = {
        ...data,
        projectId,
        recipientId,
        authorId,
        authorRole
      }
      const savedFeedback = await submitFeedbackApi(feedbackData);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback.",
      });
       form.reset(); // Reset form after successful submission
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted(savedFeedback);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission Failed",
        description: "Could not submit your feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Leave Feedback</CardTitle>
        <CardDescription>Share your experience regarding this project and the {authorRole === 'client' ? 'freelancer' : 'client'}.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Rating <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    {/* Using RadioGroup for stars - could use a custom star component too */}
                    <RadioGroup
                      onValueChange={(value) => field.onChange(Number(value))}
                      // defaultValue={field.value.toString()} // Does not work well with number init 0
                      className="flex space-x-2"
                      disabled={isSubmitting}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormItem key={value} className="flex items-center space-x-1 space-y-0 cursor-pointer">
                           <FormControl>
                                <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                            </FormControl>
                          <FormLabel htmlFor={`rating-${value}`} className="cursor-pointer">
                            <Star
                              className={`h-6 w-6 transition-colors ${field.value >= value ? 'text-accent fill-accent' : 'text-muted-foreground/50 hover:text-accent/70'}`}

                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your experience..."
                      rows={5}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="p-0 pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
