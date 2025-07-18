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

const rankSchema = z.object({
  resumeText: z.string().min(50, 'Resume content is too short.'),
  jobDescriptionText: z.string().min(50, 'Job description is too short.'),
});

const suggestionsSchema = z.object({
  resumeContent: z.string().min(50, 'Resume content is too short.'),
  jobDescription: z.string().min(10, 'Target job description is too short.'),
});

export async function rankResumeAction(
  input: RankResumeAgainstJobDescriptionInput
) {
  const validation = rankSchema.safeParse(input);
  if (!validation.success) {
    throw new Error(validation.error.errors.map((e) => e.message).join(', '));
  }
  try {
    return await rankResumeAgainstJobDescription(input);
  } catch (error) {
    console.error('Error in rankResumeAction:', error);
    throw new Error('Failed to get resume ranking from AI.');
  }
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
