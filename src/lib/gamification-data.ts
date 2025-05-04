
import type { Badge, Level } from '@/types/gamification';
import { Star, UserPlus, Edit3, Send, Award, CheckCircle, MessageSquare, Briefcase, DollarSign, TrendingUp } from 'lucide-react';

/**
 * List of all available badges in the system.
 */
export const availableBadges: Badge[] = [
  // Profile Badges
  { id: 'profile-complete', name: 'Profile Polished', description: 'Complete your profile information (name, bio, skills).', icon: Edit3, pointsAwarded: 50 },
  { id: 'first-login', name: 'Welcome Aboard!', description: 'Log in for the first time.', icon: UserPlus, pointsAwarded: 10 }, // Example, needs login system

  // Freelancer Badges
  { id: 'first-proposal', name: 'Bidder Beginner', description: 'Submit your first project proposal.', icon: Send, pointsAwarded: 20 },
  { id: 'first-win', name: 'Project Winner', description: 'Win your first project bid.', icon: Award, pointsAwarded: 100 },
  { id: 'project-completed-freelancer', name: 'Task Master', description: 'Successfully complete your first project as a freelancer.', icon: CheckCircle, pointsAwarded: 75 },
  { id: 'feedback-received-positive', name: 'Top Rated', description: 'Receive your first 5-star rating.', icon: Star, pointsAwarded: 50 },
  { id: 'earnings-milestone-1', name: 'Money Maker', description: 'Earn your first $100.', icon: DollarSign, pointsAwarded: 50 }, // Needs earnings tracking

  // Client Badges
  { id: 'first-project-posted', name: 'Project Pioneer', description: 'Post your first project.', icon: Briefcase, pointsAwarded: 30 },
  { id: 'first-hire', name: 'Talent Scout', description: 'Hire a freelancer for the first time.', icon: UserPlus, pointsAwarded: 50 },
  { id: 'project-completed-client', name: 'Completionist', description: 'Have your first project completed by a freelancer.', icon: CheckCircle, pointsAwarded: 75 },
  { id: 'feedback-given', name: 'Feedback Champion', description: 'Leave feedback for a freelancer.', icon: MessageSquare, pointsAwarded: 20 },
  { id: 'spending-milestone-1', name: 'Big Spender', description: 'Spend your first $100 on projects.', icon: TrendingUp, pointsAwarded: 50 }, // Needs spending tracking

  // Generic/Future Badges
  { id: 'streak-login-3', name: 'Consistent Contributor', description: 'Log in 3 days in a row.', icon: TrendingUp },
  { id: 'streak-proposal-5', name: 'Bidding Machine', description: 'Submit 5 proposals in a week.', icon: Send },
];

/**
 * Defines the points required for each level.
 * Assumes levels start at 1.
 */
export const levelThresholds: Level[] = [
  { level: 1, name: "Newcomer", minPoints: 0 },
  { level: 2, name: "Apprentice", minPoints: 100 },
  { level: 3, name: "Journeyman", minPoints: 300 },
  { level: 4, name: "Artisan", minPoints: 700 },
  { level: 5, name: "Master", minPoints: 1500 },
  // Add more levels as needed
];

// Calculate pointsToNextLevel for easier use in UI
levelThresholds.forEach((level, index) => {
  if (index < levelThresholds.length - 1) {
    level.pointsToNextLevel = levelThresholds[index + 1].minPoints - level.minPoints;
  } else {
    level.pointsToNextLevel = undefined; // Highest level
  }
});
