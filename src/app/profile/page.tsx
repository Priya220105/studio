
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

// Mock function to fetch user profile data - replace with actual API call
async function fetchUserProfile(): Promise<Profile | null> {
    console.log("Fetching user profile...");
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate scenarios: profile exists or not
    const hasProfile = Math.random() > 0.3; // 70% chance profile exists

    if (hasProfile) {
        return {
            id: "mock-user-id",
            name: "Freelancer Name",
            email: "freelancer@example.com", // Should come from auth ideally
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Web Design"],
            bio: "Experienced web developer specializing in modern frontend frameworks. Passionate about creating intuitive and performant user interfaces.",
            avatarUrl: `https://picsum.photos/100/100?random=${Math.ceil(Math.random() * 10)}`, // Placeholder with slight variation
        };
    } else {
        return null; // Simulate no profile found
    }
}


export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    fetchUserProfile()
      .then(data => {
        setProfile(data);
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
                         <p className="text-muted-foreground mb-4">Create your profile to start bidding on projects.</p>
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
        <Card className="w-full max-w-lg mt-10 shadow-lg">
          <CardHeader className="items-center text-center border-b pb-6">
             <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="professional portrait" />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
             <p className="text-sm text-muted-foreground">{profile.email}</p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
             <div>
                <h4 className="font-semibold mb-2 text-lg">Bio</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio || "No bio provided."}</p>
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
             <div className="pt-4 border-t mt-6">
                 {/* Link to edit page - future implementation */}
                 <Link href="/profile/edit" passHref>
                     <Button className="w-full" variant="outline">Edit Profile</Button>
                 </Link>
                 {/* <Button className="w-full" variant="outline" disabled>Edit Profile (Coming Soon)</Button> */}
             </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
