
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingDisplayProps {
  rating: number;
  totalRatings?: number;
  size?: number;
  className?: string;
}

/**
 * Displays a star rating based on a numeric value.
 */
export function RatingDisplay({ rating, totalRatings, size = 16, className }: RatingDisplayProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} fill="currentColor" size={size} className="text-accent" />
        ))}
        {hasHalfStar && (
           <StarHalf key="half" fill="currentColor" size={size} className="text-accent" />
           // If StarHalf is not desired or looks bad, use a full star with partial fill (more complex SVG needed)
           // or simply round to nearest half/full star for display. For simplicity, using StarHalf.
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-muted-foreground/50" />
        ))}
      </div>
      {totalRatings !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">
          ({totalRatings} rating{totalRatings !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
}
