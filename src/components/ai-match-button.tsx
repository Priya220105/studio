
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { matchProjects } from '@/ai/flows/match-projects';
import type { Project } from '@/types/project';
import type { Profile } from '@/types/profile';

interface AiMatchButtonProps {
    freelancerProfile: Profile | null;
    availableProjects: Project[];
    onMatchesFound: (matchedIds: string[]) => void;
}

export function AiMatchButton({ freelancerProfile, availableProjects, onMatchesFound }: AiMatchButtonProps) {
    const [isMatching, setIsMatching] = useState(false);
    const { toast } = useToast();

    const handleMatchClick = async () => {
        if (!freelancerProfile) {
            toast({
                title: "Profile Required",
                description: "Please create or load your profile to find matches.",
                variant: "destructive",
            });
            return;
        }

        if (availableProjects.length === 0) {
            toast({
                title: "No Projects",
                description: "There are no projects available to match against.",
                variant: "default",
            });
            return;
        }

        setIsMatching(true);
        try {
            const input = {
                freelancerProfile: {
                    skills: freelancerProfile.skills,
                    bio: freelancerProfile.bio || "", // Ensure bio is a string
                },
                // Select only relevant fields for the AI prompt to save tokens/cost
                availableProjects: availableProjects.map(p => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    budget: p.budget, // Include budget as it might influence relevance
                })),
            };

            const result = await matchProjects(input);
            onMatchesFound(result.matchedProjectIds);

            if (result.matchedProjectIds.length > 0) {
                toast({
                    title: "Matches Found!",
                    description: `Highlighted the top ${result.matchedProjectIds.length} project matches for you.`,
                });
            } else {
                 toast({
                    title: "No Strong Matches Found",
                    description: "We couldn't find any strong project matches based on your current profile and available projects.",
                    variant: "default"
                });
            }

        } catch (error) {
            console.error("Error matching projects:", error);
            toast({
                title: "Matching Failed",
                description: "Could not find project matches at this time.",
                variant: "destructive",
            });
             onMatchesFound([]); // Clear highlights on error
        } finally {
            setIsMatching(false);
        }
    };

    return (
        <Button
            onClick={handleMatchClick}
            disabled={isMatching || !freelancerProfile}
            variant="outline"
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
            {isMatching ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Wand2 className="mr-2 h-4 w-4" />
            )}
            {isMatching ? 'Finding Matches...' : 'Find AI Matches'}
        </Button>
    );
}
```