
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { Header } from "@/components/layout/header";
import type { Profile } from '@/types/profile';
import { fetchUserProfile, updateProfile } from '@/lib/mock-data'; // Use centralized mock functions


// Assume this is the ID of the currently logged-in user
// Replace with actual authentication logic
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id';


// Define Zod schema for profile form validation
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  // Email is not included here as it's usually not editable or handled differently
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters." }).optional(),
  skills: z.string().max(200, { message: "Skills list cannot exceed 200 characters." }).optional().describe('Comma-separated list of skills'),
  avatarUrl: z.string().url({ message: "Please enter a valid URL for the avatar." }).optional().or(z.literal('')),
});

// Form data type excludes non-editable fields like email, id
type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(''); // State to hold the non-editable email

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      skills: "",
      avatarUrl: "",
    },
  });

  // Fetch existing profile data on component mount
  useEffect(() => {
    setIsLoading(true);
    fetchUserProfile(MOCK_LOGGED_IN_USER_ID)
      .then(data => {
        if (data) {
          // Populate the form with fetched data
          form.reset({
            name: data.name,
            bio: data.bio || "",
            skills: data.skills.join(', ') || "", // Join skills array for input
            avatarUrl: data.avatarUrl || "",
          });
          setCurrentEmail(data.email); // Store the email separately
        } else {
          // Handle case where profile doesn't exist
          toast({
            title: "Profile Not Found",
            description: "Cannot edit a profile that doesn't exist. Please create one first.",
            variant: "destructive",
          });
          router.push('/profile/create'); // Redirect to create page
        }
      })
      .catch(error => {
        console.error("Error fetching profile for edit:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data for editing.",
          variant: "destructive",
        });
         router.push('/profile'); // Redirect back on error
      })
      .finally(() => setIsLoading(false));
  }, [form, router, toast]);


  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      // The updateProfile function in mock-data now expects Partial<Omit<Profile, 'id' | 'email'>>
      // and handles skill conversion internally
      const updatedProfile = await updateProfile(MOCK_LOGGED_IN_USER_ID, data);
      toast({
        title: "Profile Updated!",
        description: "Your profile changes have been saved.",
      });
      router.push('/profile'); // Redirect back to profile view
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        <Card className="w-full max-w-lg mt-10">
            <CardHeader>
            <CardTitle>Edit Your Profile</CardTitle>
            <CardDescription>Update your freelancer details.</CardDescription>
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
                    <Input type="email" value={currentEmail} disabled readOnly />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">Email cannot be changed here.</p>
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
                 <CardFooter className="p-0 pt-6 flex justify-between">
                     <Button type="button" variant="outline" onClick={() => router.push('/profile')} disabled={isSubmitting}>
                         Cancel
                    </Button>
                     <Button type="submit" disabled={isSubmitting}>
                         {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                         {isSubmitting ? 'Saving...' : 'Save Changes'}
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