
'use server';

/**
 * @fileOverview AI flow to match freelancers with relevant projects based on skills and project descriptions.
 *
 * - matchProjects - Finds suitable projects for a given freelancer profile.
 * - MatchProjectsInput - Input type for the matchProjects function.
 * - MatchProjectsOutput - Output type for the matchProjects function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import type { Project } from '@/types/project';
import type { Profile } from '@/types/profile';

// Define the input schema using Zod
const MatchProjectsInputSchema = z.object({
  freelancerProfile: z.object({
    skills: z.array(z.string()).describe("List of the freelancer's skills."),
    bio: z.string().optional().describe("Freelancer's biography describing their experience."),
  }).describe("The profile of the freelancer seeking projects."),
  availableProjects: z.array(
    z.object({
      id: z.string().describe("Unique identifier for the project."),
      title: z.string().describe("Title of the project."),
      description: z.string().describe("Detailed description of the project requirements."),
      budget: z.number().optional().describe("Budget for the project."), // Optional budget
      // Add other relevant project fields if needed for matching
    })
  ).describe("A list of available projects to match against."),
});
export type MatchProjectsInput = z.infer<typeof MatchProjectsInputSchema>;

// Define the output schema using Zod
const MatchProjectsOutputSchema = z.object({
  matchedProjectIds: z.array(z.string()).describe("A list of project IDs that are a good match for the freelancer, ordered by relevance (most relevant first). Limit to top 5 matches."),
});
export type MatchProjectsOutput = z.infer<typeof MatchProjectsOutputSchema>;


// Define the AI prompt for matching
const matchProjectsPrompt = ai.definePrompt({
  name: 'matchProjectsPrompt',
  input: { schema: MatchProjectsInputSchema },
  output: { schema: MatchProjectsOutputSchema },
  prompt: `You are an expert project matching assistant for a freelance platform. Your goal is to connect freelancers with the most relevant projects based on their skills and experience.

Analyze the freelancer's profile (skills and bio) and compare it against the available projects.

Freelancer Profile:
Skills: {{#each freelancerProfile.skills}} {{this}}{{#unless @last}}, {{/unless}}{{/each}}
Bio: {{{freelancerProfile.bio}}}

Available Projects:
{{#each availableProjects}}
---
Project ID: {{id}}
Title: {{title}}
Description: {{{description}}}
Budget: {{#if budget}}${{budget}}{{else}}Not specified{{/if}}
---
{{/each}}

Based on the freelancer's skills and experience described in their bio, identify the top 5 most relevant projects from the list. Consider the technologies, tasks, and experience level mentioned in both the profile and project descriptions.

Return the IDs of the matched projects, ordered from most relevant to least relevant, in the 'matchedProjectIds' array. Only include projects that are a strong match. Do not include more than 5 project IDs.
`,
});


// Define the Genkit flow
const matchProjectsFlow = ai.defineFlow<
  typeof MatchProjectsInputSchema,
  typeof MatchProjectsOutputSchema
>(
  {
    name: 'matchProjectsFlow',
    inputSchema: MatchProjectsInputSchema,
    outputSchema: MatchProjectsOutputSchema,
  },
  async (input) => {
    console.log("AI Flow Input:", JSON.stringify(input, null, 2)); // Log input for debugging

    const {output} = await matchProjectsPrompt(input);

    console.log("AI Flow Output:", output); // Log output for debugging
    if (!output) {
        throw new Error("AI failed to generate matches.");
    }

    // Ensure output is always an array, even if empty
    if (!output.matchedProjectIds) {
        output.matchedProjectIds = [];
    }

    return output;
  }
);

/**
 * Finds suitable projects for a given freelancer profile using an AI model.
 * @param input - Contains the freelancer's profile and a list of available projects.
 * @returns A promise that resolves to a list of matched project IDs.
 */
export async function matchProjects(input: MatchProjectsInput): Promise<MatchProjectsOutput> {
   // Basic validation: Ensure there are projects to match against
   if (!input.availableProjects || input.availableProjects.length === 0) {
        console.warn("No projects provided for matching.");
        return { matchedProjectIds: [] };
    }
   // Basic validation: Ensure freelancer has some skills or bio
    if ((!input.freelancerProfile.skills || input.freelancerProfile.skills.length === 0) && !input.freelancerProfile.bio) {
        console.warn("Freelancer profile lacks skills and bio for matching.");
        return { matchedProjectIds: [] };
    }

  return matchProjectsFlow(input);
}
```