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
  prompt: `You are an expert resume reviewer. Given a resume and a job description, you will provide a match score (0-100), a summary of the resume's strengths and weaknesses, and specific suggestions for improvement.

Resume:
{{{resumeText}}}

Job Description:
{{{jobDescriptionText}}}

Respond in a structured JSON format:
{
  "matchScore": number,
  "summary": string,
  "areasForImprovement": string
}
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
