'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { rankResumeAction } from '@/lib/actions';
import type { RankResumeAgainstJobDescriptionOutput } from '@/ai/flows/rank-resume';
import { Loader2, BarChart, FileText, Briefcase } from 'lucide-react';
import { ScoreGauge } from './score-gauge';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  resumeText: z
    .string()
    .min(100, 'Please paste your full resume content.')
    .max(5000, 'Resume is too long.'),
  jobDescriptionText: z
    .string()
    .min(50, 'Please paste the full job description.')
    .max(5000, 'Job description is too long.'),
});

export function ResumeRankerForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<RankResumeAgainstJobDescriptionOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: '',
      jobDescriptionText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const aiResult = await rankResumeAction(values);
      setResult(aiResult);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error.message || 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="resumeText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Resume</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the full text of your resume here..."
                    className="min-h-[250px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobDescriptionText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste the job description you're applying for..."
                    className="min-h-[250px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BarChart className="mr-2 h-4 w-4" />
            )}
            Rank My Resume
          </Button>
        </form>
      </Form>
      <div className="space-y-6">
        {isLoading && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Analysis Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-center">
                        <Skeleton className="h-36 w-36 rounded-full" />
                    </div>
                     <Skeleton className="h-8 w-1/3 mx-auto" />
                     <Skeleton className="h-6 w-full" />
                     <Skeleton className="h-6 w-5/6" />
                     <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
        )}
        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-center">Match Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <ScoreGauge value={result.matchScore} />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2"><FileText className="text-primary"/>Summary</h3>
                  <p className="text-muted-foreground">{result.summary}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2"><Briefcase className="text-primary"/>Areas for Improvement</h3>
                  <p className="text-muted-foreground">{result.areasForImprovement}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
