'use server';

/**
 * @fileOverview An AI-powered tool to enhance freelancer proposals based on project requirements.
 *
 * - enhanceProposal - A function that takes a proposal and project requirements and returns suggestions for improvement.
 * - EnhanceProposalInput - The input type for the enhanceProposal function.
 * - EnhanceProposalOutput - The return type for the enhanceProposal function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const EnhanceProposalInputSchema = z.object({
  proposal: z.string().describe('The freelancer proposal to enhance.'),
  projectRequirements: z
    .string()
    .describe('The requirements for the project.'),
});
export type EnhanceProposalInput = z.infer<typeof EnhanceProposalInputSchema>;

const EnhanceProposalOutputSchema = z.object({
  enhancedProposal: z
    .string()
    .describe('The enhanced freelancer proposal with suggestions.'),
});
export type EnhanceProposalOutput = z.infer<typeof EnhanceProposalOutputSchema>;

export async function enhanceProposal(input: EnhanceProposalInput): Promise<EnhanceProposalOutput> {
  return enhanceProposalFlow(input);
}

const enhanceProposalPrompt = ai.definePrompt({
  name: 'enhanceProposalPrompt',
  input: {
    schema: z.object({
      proposal: z.string().describe('The freelancer proposal to enhance.'),
      projectRequirements: z
        .string()
        .describe('The requirements for the project.'),
    }),
  },
  output: {
    schema: z.object({
      enhancedProposal: z
        .string()
        .describe('The enhanced freelancer proposal with suggestions.'),
    }),
  },
  prompt: `You are an AI assistant designed to enhance freelancer proposals.

  Based on the project requirements and the original proposal, provide suggestions and improvements to make the proposal more compelling and increase the freelancer's chances of winning the bid.

  Project Requirements: {{{projectRequirements}}}

  Original Proposal: {{{proposal}}}

  Enhanced Proposal:`,
});

const enhanceProposalFlow = ai.defineFlow<
  typeof EnhanceProposalInputSchema,
  typeof EnhanceProposalOutputSchema
>({
  name: 'enhanceProposalFlow',
  inputSchema: EnhanceProposalInputSchema,
  outputSchema: EnhanceProposalOutputSchema,
},
async input => {
  const {output} = await enhanceProposalPrompt(input);
  return output!;
});
