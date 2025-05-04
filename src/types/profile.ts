
/**
 * Represents a freelancer's profile.
 */
export interface Profile {
  /**
   * Unique identifier for the user/profile (might align with auth user ID).
   */
  id: string;
  /**
   * Freelancer's full name.
   */
  name: string;
  /**
   * Freelancer's contact email address.
   */
  email: string;
  /**
   * A short biography or description of the freelancer.
   */
  bio?: string;
  /**
   * A list of the freelancer's skills.
   */
  skills: string[];
  /**
   * URL pointing to the freelancer's avatar image.
   */
  avatarUrl?: string;
  // Add other relevant fields as needed, e.g.:
  // portfolioUrl?: string;
  // hourlyRate?: number;
  // location?: string;
  // joinedDate: Date;
}
