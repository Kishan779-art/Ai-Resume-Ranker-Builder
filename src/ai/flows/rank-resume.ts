
// src/ai/flows/rank-resume.ts
'use server';
/**
 * @fileOverview Ranks a resume against a job description.
 *
 * - rankResumeAgainstJobDescription - A function that handles the resume ranking process.
 * - RankResumeAgainstJobDescriptionInput - The input type for the rankResumeAgainstJobDescription function.
 * - RankResumeAgainstJobDescriptionOutput - The return type for the rankResumeAgainstJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RankResumeAgainstJobDescriptionInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobDescriptionText: z.string().describe('The text content of the job description.'),
});
export type RankResumeAgainstJobDescriptionInput = z.infer<typeof RankResumeAgainstJobDescriptionInputSchema>;

const RankResumeAgainstJobDescriptionOutputSchema = z.object({
  matchScore: z.number().describe('A score (0-100) representing how well the resume matches the job description.'),
  summary: z.string().describe('A summary of why the resume received the score it did.'),
  areasForImprovement: z.string().describe('Specific suggestions for improving the resume to better match the job description.'),
});
export type RankResumeAgainstJobDescriptionOutput = z.infer<typeof RankResumeAgainstJobDescriptionOutputSchema>;

export async function rankResumeAgainstJobDescription(input: RankResumeAgainstJobDescriptionInput): Promise<RankResumeAgainstJobDescriptionOutput> {
  return rankResumeAgainstJobDescriptionFlow(input);
}

const rankResumeAgainstJobDescriptionPrompt = ai.definePrompt({
  name: 'rankResumeAgainstJobDescriptionPrompt',
  input: {schema: RankResumeAgainstJobDescriptionInputSchema},
  output: {schema: RankResumeAgainstJobDescriptionOutputSchema},
  prompt: `You are an expert resume reviewer. Your task is to analyze the provided resume and job description.
  
  Based on your analysis, you will:
  1.  Provide a "matchScore" from 0 to 100, where 100 is a perfect match.
  2.  Write a "summary" explaining the key strengths and weaknesses of the resume in relation to the job.
  3.  Provide "areasForImprovement" with specific, actionable advice on how to make the resume a better fit for the role.

Resume:
{{{resumeText}}}

Job Description:
{{{jobDescriptionText}}}
`,
});

const rankResumeAgainstJobDescriptionFlow = ai.defineFlow(
  {
    name: 'rankResumeAgainstJobDescriptionFlow',
    inputSchema: RankResumeAgainstJobDescriptionInputSchema,
    outputSchema: RankResumeAgainstJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await rankResumeAgainstJobDescriptionPrompt(input);
    return output!;
  }
);
