
import type { LucideIcon } from 'lucide-react';

/**
 * Represents an achievable badge in the gamification system.
 */
export interface Badge {
  /**
   * Unique identifier for the badge.
   */
  id: string;
  /**
   * Name of the badge.
   */
  name: string;
  /**
   * Description explaining how to earn the badge.
   */
  description: string;
  /**
   * Icon component associated with the badge.
   */
  icon: LucideIcon; // Using LucideIcon type
   /**
    * Points awarded when this badge is earned.
    */
   pointsAwarded?: number;
}

/**
 * Defines the structure for different levels in the gamification system.
 */
export interface Level {
    /**
     * The level number (e.g., 1, 2, 3).
     */
    level: number;
    /**
     * The name of the level (e.g., "Beginner", "Intermediate", "Expert").
     */
    name: string;
    /**
     * The minimum points required to reach this level.
     */
    minPoints: number;
    /**
     * Optional: Points required to reach the *next* level from this one.
     * Undefined for the highest level.
     */
    pointsToNextLevel?: number;
}
