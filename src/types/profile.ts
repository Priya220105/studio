

/**
 * Represents a freelancer's or client's profile.
 */
export interface Profile {
  /**
   * Unique identifier for the user/profile (might align with auth user ID).
   */
  id: string;
  /**
   * User's full name.
   */
  name: string;
  /**
   * User's contact email address.
   */
  email: string;
  /**
   * A short biography or description of the user.
   */
  bio?: string;
  /**
   * A list of the user's skills (primarily for freelancers).
   */
  skills: string[];
  /**
   * URL pointing to the user's avatar image.
   */
  avatarUrl?: string;

  // --- Gamification Fields ---
  /**
   * Total points earned by the user. Defaults to 0.
   */
  points?: number;
  /**
   * Current level achieved by the user based on points. Defaults to 1.
   */
  level?: number;
  /**
   * List of IDs of badges earned by the user. Defaults to an empty array.
   */
  earnedBadgeIds?: string[];

  // Add other relevant fields as needed, e.g.:
  // portfolioUrl?: string;
  // hourlyRate?: number; // Freelancer specific
  // location?: string;
  // joinedDate: Date;
  // companyName?: string; // Client specific
}
