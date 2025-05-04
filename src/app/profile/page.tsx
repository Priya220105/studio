

'use client'; // Required for useState, useEffect, etc.

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Loader2 } from "lucide-react"; // Example Icon
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge
import type { Profile } from '@/types/profile'; // Import Profile type
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { RatingDisplay } from '@/components/rating-display'; // Import RatingDisplay
import { FeedbackList } from '@/components/feedback-list'; // Import FeedbackList
import type { Feedback, RatingStats } from '@/types/feedback'; // Import Feedback types
import { Separator } from '@/components/ui/separator';
import { fetchUserProfile, fetchUserFeedback } from '@/lib/mock-data'; // Use centralized mock functions
import { LevelProgress } from '@/components/gamification/level-progress'; // Import LevelProgress
import { EarnedBadges } from '@/components/gamification/earned-badges'; // Import EarnedBadges

// Assume this is the ID of the currently logged-in user
// Replace with actual authentication logic
const MOCK_LOGGED_IN_USER_ID = 'mock-user-id';


export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [feedbackData, setFeedbackData] = useState<{ feedback: Feedback[], stats: RatingStats } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    fetchUserProfile(MOCK_LOGGED_IN_USER_ID) // Use the logged-in user ID
      .then(async (profileData) => {
        // Simulate initial gamification state if missing
        const profileWithDefaults = profileData ? {
            ...profileData,
            points: profileData.points ?? 0,
            level: profileData.level ?? 1,
            earnedBadgeIds: profileData.earnedBadgeIds ?? [],
        } : null;
        setProfile(profileWithDefaults);

        if (profileWithDefaults) {
           // If profile exists, fetch feedback for this user
           try {
                const feedbackResult = await fetchUserFeedback(profileWithDefaults.id);
                setFeedbackData(feedbackResult);
           } catch (feedbackError) {
                console.error("Error fetching feedback:", feedbackError);
                toast({
                    title: "Error",
                    description: "Failed to load feedback data.",
                    variant: "destructive",
                });
           }
        }
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  }, [toast]);


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

  if (!profile) {
    return (
        <div className="flex flex-col min-h-screen bg-secondary">
            <Header />
            <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-center">
                 <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <User className="h-12 w-12 text-primary mx-auto mb-4" />
                        <CardTitle>Profile Not Found</CardTitle>
                        <CardDescription>
                            You haven't created your freelancer profile yet.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <p className="text-muted-foreground mb-4">Create your profile to start bidding on projects and engage with the platform features.</p>
                         <Link href="/profile/create" passHref>
                             <Button>Create Profile</Button>
                         </Link>
                    </CardContent>
                 </Card>
            </main>
        </div>
    )
  }

  // Profile exists, display it
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex justify-center items-start">
        {/* Use grid layout for profile and feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mt-10">

           {/* Profile Card (takes 1 column on large screens) */}
          <Card className="lg:col-span-1 shadow-lg h-fit sticky top-24"> {/* Make card sticky */}
            <CardHeader className="items-center text-center border-b pb-6">
              <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="professional portrait" />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{profile.email}</p>

              {/* Gamification Level Progress */}
              <LevelProgress profile={profile} className="mt-4 w-full px-4" />

              {/* Display Average Rating */}
              {feedbackData && feedbackData.stats.totalRatings > 0 && (
                  <RatingDisplay
                    rating={feedbackData.stats.averageRating}
                    totalRatings={feedbackData.stats.totalRatings}
                    className="mt-3 justify-center"
                  />
              )}
               {feedbackData && feedbackData.stats.totalRatings === 0 && (
                   <p className="text-sm text-muted-foreground mt-3">No ratings yet</p>
               )}
                {/* Loading state for ratings */}
               {!feedbackData && (
                    <div className="flex items-center justify-center mt-3">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">Loading ratings...</span>
                    </div>
               )}
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                  <h4 className="font-semibold mb-2 text-lg">Bio</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{profile.bio || "No bio provided."}</p>
              </div>
              <div>
                  <h4 className="font-semibold mb-2 text-lg">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                      {profile.skills.length > 0 ? (
                          profile.skills.map(skill => <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>)
                      ) : (
                          <p className="text-sm text-muted-foreground">No skills listed.</p>
                      )}
                  </div>
              </div>

              {/* Earned Badges Section */}
              <Separator />
              <EarnedBadges profile={profile} />

              <div className="pt-4 border-t mt-6">
                  <Link href="/profile/edit" passHref>
                      <Button className="w-full" variant="outline">Edit Profile</Button>
                  </Link>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section (takes 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-8">
             {/* Feedback Form Placeholder/Example */}
             {/* <FeedbackForm
                projectId="example-project-id" // Replace with actual context if applicable
                recipientId={profile.id}
                authorId="logged-in-user-id" // Replace with actual logged-in user ID
                authorRole='client' // Or 'freelancer', depending on context
             />
             <Separator /> */}

             {/* Display Received Feedback */}
             {feedbackData ? (
                <FeedbackList feedbackItems={feedbackData.feedback} />
             ) : (
                // Show skeleton or loading state for feedback
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Feedback Received</h3>
                    <Card><CardContent className="p-4"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto" /></CardContent></Card>
                </div>
             )}
          </div>

        </div>
      </main>
    </div>
  );
}
