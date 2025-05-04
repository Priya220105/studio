
'use client';

import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { calculateLevel, levelThresholds } from "@/lib/gamification-utils";
import type { Level } from "@/types/gamification";
import type { Profile } from "@/types/profile";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface LevelProgressProps {
  profile: Profile | null;
  className?: string;
}

export function LevelProgress({ profile, className }: LevelProgressProps) {
  if (!profile) {
    return <div className={cn("text-sm text-muted-foreground", className)}>Level info unavailable</div>;
  }

  const points = profile.points || 0;
  const currentLevelData = calculateLevel(points);
  const nextLevelIndex = levelThresholds.findIndex(l => l.level === currentLevelData.level + 1);
  const nextLevelData = nextLevelIndex !== -1 ? levelThresholds[nextLevelIndex] : null;

  let progressPercentage = 0;
  let pointsToNext = 0;
  let currentLevelMinPoints = currentLevelData.minPoints;

  if (nextLevelData) {
    const pointsInCurrentLevel = points - currentLevelMinPoints;
    const pointsForNextLevel = nextLevelData.minPoints - currentLevelMinPoints;
    pointsToNext = nextLevelData.minPoints - points;
    if (pointsForNextLevel > 0) {
      progressPercentage = Math.max(0, Math.min(100, (pointsInCurrentLevel / pointsForNextLevel) * 100));
    } else {
      progressPercentage = 100; // Handle case where next level requires same points (shouldn't happen with proper data)
    }
  } else {
    // Highest level reached
    progressPercentage = 100;
    pointsToNext = 0;
  }

  const tooltipContent = nextLevelData
    ? `${pointsToNext} points to Level ${nextLevelData.level} (${nextLevelData.name})`
    : "Highest level achieved!";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("w-full space-y-1.5", className)}>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-primary" />
                Level {currentLevelData.level} ({currentLevelData.name})
              </span>
              <span className="text-xs text-muted-foreground">{points.toLocaleString()} PTS</span>
            </div>
            <Progress value={progressPercentage} aria-label={`Level ${currentLevelData.level} progress`} className="h-2" />
             {nextLevelData && (
                <p className="text-xs text-muted-foreground text-right">
                    {pointsToNext.toLocaleString()} to next level
                </p>
             )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
