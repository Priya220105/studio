
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Badge as BadgeType } from "@/types/gamification";
import { cn } from "@/lib/utils";
import { Lock } from 'lucide-react'; // Icon for unearned badges

interface BadgeDisplayProps {
  badge: BadgeType;
  earned: boolean;
  size?: number;
  className?: string;
}

export function BadgeDisplay({ badge, earned, size = 24, className }: BadgeDisplayProps) {
  const Icon = earned ? badge.icon : Lock;

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative inline-flex items-center justify-center rounded-full border p-2 transition-opacity duration-200",
              earned ? "bg-accent/10 border-accent text-accent" : "bg-muted/50 border-muted text-muted-foreground opacity-50 hover:opacity-75",
              className
            )}
            style={{ width: size * 1.8, height: size * 1.8 }} // Adjust container size based on icon size
          >
            <Icon style={{ width: size, height: size }} aria-label={badge.name} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-center max-w-xs">
          <p className="font-semibold">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {earned && badge.pointsAwarded && (
            <p className="text-xs text-primary mt-1">+{badge.pointsAwarded} PTS</p>
          )}
          {!earned && (
            <p className="text-xs text-muted-foreground/80 mt-1">(Locked)</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
