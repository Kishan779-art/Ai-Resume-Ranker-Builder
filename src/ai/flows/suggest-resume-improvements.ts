'use server';

/**
 * @fileOverview AI-powered resume improvement suggestions based on job description.
 *
 * This file defines a Genkit flow that takes a resume content and a job description,
 * then provides context-aware suggestions and auto-generates improvement points for weak sections,
 * tailored to the job description.
 *
 * @remarks
 * - `getAiResumeSuggestions` - A function that handles the resume improvement suggestions process.
 * - `AiResumeSuggestionsInput` - The input type for the `getAiResumeSuggestions` function.
 * - `AiResumeSuggestionsOutput` - The return type for the `getAiResumeSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiResumeSuggestionsInputSchema = z.object({
  resumeContent: z.string().describe('The content of the resume.'),
  jobDescription: z.string().describe('The job description for the targeted job.'),
});
export type AiResumeSuggestionsInput = z.infer<typeof AiResumeSuggestionsInputSchema>;

const AiResumeSuggestionsOutputSchema = z.object({
  suggestions: z.array(
    z.object({
      section: z.string().describe('The resume section the suggestion applies to.'),
      improvementPoints: z.array(z.string()).describe('Specific suggestions for improving the section.'),
    })
  ).describe('A list of suggestions for improving the resume, tailored to the job description.'),
});
export type AiResumeSuggestionsOutput = z.infer<typeof AiResumeSuggestionsOutputSchema>;

export async function getAiResumeSuggestions(input: AiResumeSuggestionsInput): Promise<AiResumeSuggestionsOutput> {
  return getAiResumeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiResumeSuggestionsPrompt',
  input: {schema: AiResumeSuggestionsInputSchema},
  output: {schema: AiResumeSuggestionsOutputSchema},
  prompt: `You are an AI resume expert. Given the resume content and the job description, you will provide context-aware suggestions and auto-generate improvement points for weak sections.

Resume Content:
{{resumeContent}}

Job Description:
{{jobDescription}}

Provide a list of suggestions for improving the resume, tailored to the job description. Focus on providing actionable improvement points for each section of the resume.
`,
});

const getAiResumeSuggestionsFlow = ai.defineFlow(
  {
    name: 'getAiResumeSuggestionsFlow',
    inputSchema: AiResumeSuggestionsInputSchema,
    outputSchema: AiResumeSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
