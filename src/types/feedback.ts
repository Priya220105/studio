
/**
 * Represents feedback left by a user (client or freelancer).
 */
export interface Feedback {
  /**
   * Unique identifier for the feedback.
   */
  id: string;
  /**
   * ID of the project the feedback relates to.
   */
  projectId: string;
  /**
   * ID of the user leaving the feedback.
   */
  authorId: string;
  /**
   * ID of the user receiving the feedback.
   */
  recipientId: string;
  /**
   * The numeric rating given (e.g., 1-5 stars).
   */
  rating: number;
  /**
   * Written comments or feedback text.
   */
  comment: string;
  /**
   * Timestamp of when the feedback was submitted.
   */
  submittedAt: Date;
  /**
   * Role of the author when leaving feedback
   */
  authorRole: 'client' | 'freelancer';
}

/**
 * Represents aggregated rating statistics for a user.
 */
export interface RatingStats {
    /**
     * The average rating received by the user.
     */
    averageRating: number;
    /**
     * The total number of ratings received.
     */
    totalRatings: number;
}
