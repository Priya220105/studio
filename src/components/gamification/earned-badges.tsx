
import type { Profile } from '@/types/profile';
import { getEarnedBadges } from '@/lib/gamification-utils';
import { BadgeDisplay } from './badge-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Optional card wrapper

interface EarnedBadgesProps {
  profile: Profile | null;
  maxVisible?: number; // Optional: Limit number of badges shown initially
}

export function EarnedBadges({ profile, maxVisible = 6 }: EarnedBadgesProps) {
  const earnedBadges = getEarnedBadges(profile);

  if (!earnedBadges || earnedBadges.length === 0) {
    return null; // Don't render if no badges earned
  }

  const visibleBadges = earnedBadges.slice(0, maxVisible);
  // const hiddenBadgeCount = earnedBadges.length - visibleBadges.length; // TODO: Implement "Show More" if needed

  return (
    <div> {/* Or use Card for better structure */}
      <h4 className="font-semibold mb-3 text-lg">Earned Badges ({earnedBadges.length})</h4>
      <div className="flex flex-wrap gap-3">
        {visibleBadges.map((badge) => (
          <BadgeDisplay key={badge.id} badge={badge} earned={true} size={20} />
        ))}
        {/* {hiddenBadgeCount > 0 && (
           <div className="text-sm text-muted-foreground self-center">
             + {hiddenBadgeCount} more
           </div>
           // TODO: Add a button/link to show all badges, maybe in a dialog
        )} */}
      </div>
    </div>
  );
}
