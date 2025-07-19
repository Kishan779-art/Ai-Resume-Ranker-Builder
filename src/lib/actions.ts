
// src/lib/actions.ts
'use server';
import {
  rankResumeAgainstJobDescription,
  RankResumeAgainstJobDescriptionInput,
} from '@/ai/flows/rank-resume';
import {
  getAiResumeSuggestions,
  AiResumeSuggestionsInput,
} from '@/ai/flows/suggest-resume-improvements';
import { z } from 'zod';

// Note: In showcase mode, these schemas are not strictly enforced on the server-side call
// but are kept for form validation on the client.
const rankSchema = z.object({
  resumeText: z.string().min(1, 'Resume content is too short.'),
  jobDescriptionText: z.string().min(1, 'Job description is too short.'),
});

const suggestionsSchema = z.object({
  resumeContent: z.string().min(50, 'Resume content is too short.'),
  jobDescription: z.string().min(10, 'Target job description is too short.'),
});

export async function rankResumeAction(
  input: RankResumeAgainstJobDescriptionInput
) {
  // Showcase mode: Bypassing actual AI call.
  // The client will handle the timeout and dummy data.
  // This function can be left as-is or return a promise that resolves.
  console.log("Showcase: rankResumeAction called, but no AI will be invoked.");
  return new Promise(resolve => setTimeout(resolve, 100));
}

export async function suggestImprovementsAction(
  input: AiResumeSuggestionsInput
) {
  const validation = suggestionsSchema.safeParse(input);
  if (!validation.success) {
    throw new Error(validation.error.errors.map((e) => e.message).join(', '));
  }
  try {
    return await getAiResumeSuggestions(input);
  } catch (error) {
    console.error('Error in suggestImprovementsAction:', error);
    throw new Error('Failed to get resume suggestions from AI.');
  }
}
