
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
import { submitFeedbackApi } from '@/lib/mock-data'; // Use centralized mock function

// Define Zod schema for feedback form validation
const feedbackSchema = z.object({
  rating: z.coerce.number().min(1, "Rating is required.").max(5, "Rating cannot exceed 5."),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters long." }).max(1000, { message: "Comment cannot exceed 1000 characters."}),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
    projectId: string;
    recipientId: string; // The user being reviewed
    recipientName?: string; // Optional: Name of the user being reviewed for display
    authorId: string; // The user leaving the review (should come from auth)
    authorRole: 'client' | 'freelancer';
    onFeedbackSubmitted?: (feedback: Feedback) => void; // Optional callback
}

export function FeedbackForm({ projectId, recipientId, recipientName, authorId, authorRole, onFeedbackSubmitted }: FeedbackFormProps) {
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
      // Construct the data expected by the API function
      const feedbackPayload = {
        projectId,
        recipientId,
        authorId,
        authorRole,
        rating: data.rating,
        comment: data.comment,
      };
      const savedFeedback = await submitFeedbackApi(feedbackPayload);
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

  const recipientRole = authorRole === 'client' ? 'freelancer' : 'client';
  const recipientDisplayName = recipientName || `the ${recipientRole}`;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Leave Feedback</CardTitle>
        <CardDescription>Share your experience with {recipientDisplayName} regarding project "{projectId}".</CardDescription> {/* Update description */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Overall Rating <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    {/* Using RadioGroup for stars */}
                    <RadioGroup
                      onValueChange={(value) => field.onChange(Number(value))}
                      // defaultValue={field.value.toString()} // Initial 0 won't match
                      value={field.value > 0 ? field.value.toString() : ""} // Ensure value matches one of the items
                      className="flex space-x-2"
                      disabled={isSubmitting}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <FormItem key={value} className="flex items-center space-x-1 space-y-0 cursor-pointer group">
                           <FormControl>
                                <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                            </FormControl>
                          <FormLabel htmlFor={`rating-${value}`} className="cursor-pointer">
                            <Star
                              className={cn(
                                  "h-6 w-6 transition-colors text-muted-foreground/30 group-hover:text-accent/70", // Base and group hover
                                  field.value >= value && "text-accent fill-accent", // Selected state
                                  // Individual hover effect (optional, might flicker)
                                  // `hover:text-accent/70`
                              )}
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
                      placeholder={`Describe your experience working with ${recipientDisplayName}...`}
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
```