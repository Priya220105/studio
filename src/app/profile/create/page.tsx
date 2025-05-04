
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation'; // For redirection after success

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { Header } from "@/components/layout/header";
import type { Profile } from '@/types/profile'; // Assuming profile type exists
import { saveProfile } from '@/lib/mock-data'; // Use centralized mock function

// Assume this is the ID of the currently logged-in user
// Replace with actual authentication logic
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id';
// Assume we can get the user's email from auth
const MOCK_LOGGED_IN_USER_EMAIL = 'alice.dev@example.com';

// Define Zod schema for profile form validation
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  // Email is likely pre-filled and potentially non-editable
  // email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters." }).optional(),
  skills: z.string().max(200, { message: "Skills list cannot exceed 200 characters." }).optional().describe('Comma-separated list of skills'),
  avatarUrl: z.string().url({ message: "Please enter a valid URL for the avatar." }).optional().or(z.literal('')),
});

// We'll use a slightly different type for the form data excluding the email
type ProfileFormData = z.infer<typeof profileSchema>;

export default function CreateProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      // email: MOCK_LOGGED_IN_USER_EMAIL, // Pre-fill email
      bio: "",
      skills: "",
      avatarUrl: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
        // Construct the full profile data including email and ID
        const fullProfileData: Omit<Profile, 'id'> = {
            ...data,
            email: MOCK_LOGGED_IN_USER_EMAIL, // Add email back
            skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [], // Convert skills string to array
            avatarUrl: data.avatarUrl || `https://picsum.photos/100/100?random=${MOCK_LOGGED_IN_USER_ID}`, // Default avatar if none provided
        };

      const savedProfile = await saveProfile(MOCK_LOGGED_IN_USER_ID, fullProfileData);
      toast({
        title: "Profile Created!",
        description: "Your profile has been successfully saved.",
      });
      // Redirect to the profile view page after successful creation
      router.push('/profile');
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Save Failed",
        description: "Could not save your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-lg mt-10">
            <CardHeader>
            <CardTitle>Create Your Freelancer Profile</CardTitle>
            <CardDescription>Fill in your details to get started.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Alice Developer" {...field} disabled={isSubmitting}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 {/* Email Field - Display Only */}
                 <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                    <Input type="email" value={MOCK_LOGGED_IN_USER_EMAIL} disabled readOnly />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">Email associated with your account.</p>
                    <FormMessage />
                </FormItem>

                 <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Tell clients about yourself and your experience (max 500 chars)..."
                            rows={4}
                            {...field}
                            disabled={isSubmitting}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., React, Next.js, Graphic Design" {...field} disabled={isSubmitting}/>
                        </FormControl>
                         <p className="text-sm text-muted-foreground">Enter skills separated by commas.</p>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="avatarUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Avatar URL (Optional)</FormLabel>
                        <FormControl>
                        <Input type="url" placeholder="https://your-image-url.com/avatar.png" {...field} disabled={isSubmitting}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <CardFooter className="p-0 pt-6">
                     <Button type="submit" className="w-full" disabled={isSubmitting}>
                         {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                         {isSubmitting ? 'Saving...' : 'Create Profile'}
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
```