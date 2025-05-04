
/**
 * Represents a project available for bidding.
 */
export interface Project {
  /**
   * Unique identifier for the project.
   */
  id: string;
  /**
   * Title of the project.
   */
  title: string;
  /**
   * Detailed description of the project requirements.
   */
  description: string;
  /**
   * The client's budget for the project (in USD).
   */
  budget: number;
  /**
   * The deadline for proposal submissions.
   */
  deadline: Date;
   /**
   * Icon name representing the project category (maps to lucide-react icons).
   */
  categoryIcon: string;
   /**
    * Optional: ID of the client who posted the project.
    */
   clientId?: string;
   /**
    * Optional: Name of the client (company or individual).
    */
   clientName?: string;
   /**
    * Optional: URL for the client's avatar or logo.
    */
   clientAvatarUrl?: string;
}

/**
 * Represents a proposal submitted by a freelancer for a project.
 */
export interface Proposal {
  /**
   * Unique identifier for the proposal.
   */
  id: string;
  /**
   * ID of the project this proposal is for.
   */
  projectId: string;
  /**
   * ID of the freelancer submitting the proposal.
   */
  freelancerId: string;
  /**
   * The cover letter or introductory message.
   */
  coverLetter: string;
  /**
   * The proposed rate or price for the project.
   */
  proposedRate: number;
   /**
   * The status of the proposal (e.g., submitted, viewed, accepted, rejected).
   */
  status: 'submitted' | 'viewed' | 'accepted' | 'rejected';
  /**
   * Timestamp of when the proposal was submitted.
   */
  submittedAt: Date;
}

