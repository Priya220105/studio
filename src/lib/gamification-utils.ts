
import type { Badge, Level } from '@/types/gamification';
import { availableBadges, levelThresholds } from '@/lib/gamification-data';
import type { Profile } from '@/types/profile';

/**
 * Calculates the user's current level based on their points.
 * @param points - The total points the user has earned.
 * @returns The corresponding Level object.
 */
export function calculateLevel(points: number): Level {
  // Iterate backwards through thresholds to find the highest level achieved
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (points >= levelThresholds[i].minPoints) {
      return levelThresholds[i];
    }
  }
  // Should always return level 1 if points are 0 or positive
  return levelThresholds[0];
}

/**
 * Retrieves the full badge details for a given badge ID.
 * @param badgeId - The ID of the badge to retrieve.
 * @returns The Badge object or undefined if not found.
 */
export function getBadgeDetails(badgeId: string): Badge | undefined {
  return availableBadges.find(badge => badge.id === badgeId);
}

/**
 * Gets the details for all badges earned by a user.
 * @param profile - The user's profile containing earnedBadgeIds.
 * @returns An array of Badge objects.
 */
export function getEarnedBadges(profile: Profile | null): Badge[] {
  if (!profile || !profile.earnedBadgeIds) {
    return [];
  }
  return profile.earnedBadgeIds
    .map(id => getBadgeDetails(id))
    .filter((badge): badge is Badge => badge !== undefined); // Filter out undefined results
}

/**
 * Gets the details for all badges *not yet* earned by a user.
 * @param profile - The user's profile containing earnedBadgeIds.
 * @returns An array of Badge objects.
 */
export function getUnearnedBadges(profile: Profile | null): Badge[] {
    const earnedIds = new Set(profile?.earnedBadgeIds || []);
    return availableBadges.filter(badge => !earnedIds.has(badge.id));
}

/**
 * Awards points to a user profile (simulated in-memory update).
 * @param profile - The profile to update.
 * @param pointsToAdd - The number of points to add.
 * @returns The updated profile object.
 */
export function awardPoints(profile: Profile, pointsToAdd: number): Profile {
    const currentPoints = profile.points || 0;
    const newPoints = currentPoints + pointsToAdd;
    const newLevelData = calculateLevel(newPoints);

    return {
        ...profile,
        points: newPoints,
        level: newLevelData.level,
    };
}

/**
 * Awards a badge to a user profile if they haven't earned it already (simulated in-memory update).
 * Also awards associated points if defined on the badge.
 * @param profile - The profile to update.
 * @param badgeId - The ID of the badge to award.
 * @returns The updated profile object. Returns the original profile if badge doesn't exist or already earned.
 */
export function awardBadge(profile: Profile, badgeId: string): Profile {
    const badge = getBadgeDetails(badgeId);
    if (!badge || (profile.earnedBadgeIds && profile.earnedBadgeIds.includes(badgeId))) {
        return profile; // Badge doesn't exist or already earned
    }

    const updatedEarnedBadges = [...(profile.earnedBadgeIds || []), badgeId];
    let updatedProfile = {
        ...profile,
        earnedBadgeIds: updatedEarnedBadges,
    };

    // Award points associated with the badge, if any
    if (badge.pointsAwarded && badge.pointsAwarded > 0) {
        updatedProfile = awardPoints(updatedProfile, badge.pointsAwarded);
    }

    return updatedProfile;
}

// --- Integration Points (Examples - NEED actual implementation) ---

// Example function to call when a profile is completed/updated
export async function checkAndAwardProfileCompletionBadge(userId: string, profileData: Profile) {
    // Check if essential fields are filled
    if (profileData.name && profileData.bio && profileData.skills && profileData.skills.length > 0) {
        // Fetch current profile (replace with actual fetch)
        // const currentProfile = await fetchUserProfile(userId);
        // if (currentProfile && !currentProfile.earnedBadgeIds?.includes('profile-complete')) {
        //     const updatedProfile = awardBadge(currentProfile, 'profile-complete');
        //     // Save updated profile (replace with actual save)
        //     // await updateProfile(userId, updatedProfile);
        //     console.log(`Awarded 'Profile Polished' badge to user ${userId}`);
        // }
        console.log(`User ${userId} profile seems complete, potentially award 'Profile Polished'.`); // Placeholder
    }
}

// Example function to call when a proposal is submitted
export async function checkAndAwardFirstProposalBadge(userId: string) {
    // Fetch user's proposal history count (replace with actual logic)
    const proposalCount = 1; // Assume this is the first one for demo
    if (proposalCount === 1) {
         // Fetch current profile
        // const currentProfile = await fetchUserProfile(userId);
        // if (currentProfile && !currentProfile.earnedBadgeIds?.includes('first-proposal')) {
        //     const updatedProfile = awardBadge(currentProfile, 'first-proposal');
        //     // Save updated profile
        //     // await updateProfile(userId, updatedProfile);
        //     console.log(`Awarded 'Bidder Beginner' badge to user ${userId}`);
        // }
        console.log(`User ${userId} submitted first proposal, potentially award 'Bidder Beginner'.`); // Placeholder
    }
}


// Example function to call when feedback is submitted
export async function checkAndAwardFeedbackBadge(authorId: string, authorRole: 'client' | 'freelancer') {
    const badgeId = authorRole === 'client' ? 'feedback-given' : null; // Only clients get this specific badge for *giving* feedback in this example

    if (!badgeId) return;

    // Check if user has already given feedback (replace with actual logic)
    const hasGivenFeedbackBefore = false; // Assume this is the first time for demo

    if (!hasGivenFeedbackBefore) {
        // const currentProfile = await fetchUserProfile(authorId);
        // if (currentProfile && !currentProfile.earnedBadgeIds?.includes(badgeId)) {
        //     const updatedProfile = awardBadge(currentProfile, badgeId);
        //     // await updateProfile(authorId, updatedProfile);
        //     console.log(`Awarded '${badgeId}' badge to user ${authorId}`);
        // }
         console.log(`User ${authorId} gave first feedback, potentially award '${badgeId}'.`); // Placeholder
    }
}

// Example check for positive feedback badge
export async function checkAndAwardPositiveFeedbackBadge(recipientId: string, rating: number) {
     if (rating === 5) {
         // Check if this is the *first* 5-star rating (replace with actual logic)
        const isFirstFiveStar = true; // Assume true for demo

         if (isFirstFiveStar) {
             // const currentProfile = await fetchUserProfile(recipientId);
             // if (currentProfile && !currentProfile.earnedBadgeIds?.includes('feedback-received-positive')) {
             //     const updatedProfile = awardBadge(currentProfile, 'feedback-received-positive');
             //     // await updateProfile(recipientId, updatedProfile);
             //     console.log(`Awarded 'Top Rated' badge to user ${recipientId}`);
             // }
             console.log(`User ${recipientId} received first 5-star rating, potentially award 'Top Rated'.`); // Placeholder
         }
     }
}


// --- Add more functions for other badge triggers ---
// e.g., checkAndAwardProjectCompletionBadge, checkAndAwardEarningsMilestoneBadge, etc.
// These would require more complex state tracking (project status, earnings).
