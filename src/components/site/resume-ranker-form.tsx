
'use client';

import { useState, useRef } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { rankResumeAction } from '@/lib/actions';
import type { RankResumeAgainstJobDescriptionOutput } from '@/ai/flows/rank-resume';
import { Loader2, BarChart, FileText, Briefcase, Sparkles, Lightbulb, Upload } from 'lucide-react';
import { ScoreGauge } from './score-gauge';
import { Skeleton } from '../ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/input';

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
  const [isParsing, setIsParsing] = useState(false);
  const [result, setResult] =
    useState<RankResumeAgainstJobDescriptionOutput | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: '',
      jobDescriptionText: '',
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
        toast({
            variant: 'destructive',
            title: 'Invalid File Type',
            description: 'Please upload a PDF file.',
        });
        return;
    }
    
    setIsParsing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/parse-pdf', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to parse PDF');
        }

        const data = await response.json();
        form.setValue('resumeText', data.text, { shouldValidate: true });
        toast({
            title: 'Resume Uploaded',
            description: 'The resume content has been extracted and placed in the text area.',
        });

    } catch (error) {
        console.error('Error parsing PDF:', error);
        toast({
            variant: 'destructive',
            title: 'Parsing Error',
            description: 'Could not extract text from the PDF. Please paste it manually.',
        });
    } finally {
        setIsParsing(false);
        // Reset file input
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
  };


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

  const resultsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-primary" />
            Analysis Engine
          </CardTitle>
          <CardDescription>
            Paste your resume and the target job description below. Or, upload a resume PDF.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="resumeText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center justify-between">
                            <span className="flex items-center gap-2"><FileText className="text-primary/80"/> Your Resume</span>
                             <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isParsing}
                              >
                                {isParsing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Upload className="mr-2 h-4 w-4" />
                                )}
                                Upload PDF
                              </Button>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste the full text of your resume here, or upload a PDF."
                              className="min-h-[300px] bg-background/50 shadow-inner"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={isParsing}
                    />
                 </div>
                <FormField
                  control={form.control}
                  name="jobDescriptionText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Briefcase className="text-primary/80"/> Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste the job description you're applying for..."
                          className="min-h-[300px] bg-background/50 shadow-inner"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading || isParsing} size="lg" className="w-full holographic-button">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <BarChart className="mr-2 h-4 w-4" />
                )}
                Rank My Resume
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <AnimatePresence>
        {isLoading && (
            <motion.div
              key="loading"
              variants={resultsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
                  <CardHeader>
                      <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> Analysis In Progress...</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                      <div className="flex justify-center mb-4">
                           <Loader2 className="h-16 w-16 animate-spin text-primary"/>
                      </div>
                       <p className="text-muted-foreground">Our AI is analyzing your documents. Please wait a moment.</p>
                       <Skeleton className="h-6 w-3/4 mx-auto" />
                       <Skeleton className="h-6 w-1/2 mx-auto" />
                  </CardContent>
              </Card>
            </motion.div>
        )}
        {result && (
          <motion.div
            key="results"
            variants={resultsVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
              <CardHeader>
                <CardTitle className="font-headline text-center text-2xl">Analysis Complete</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <ScoreGauge value={result.matchScore} />
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-xl flex items-center gap-2 mb-2"><FileText className="text-primary"/>Summary</h3>
                    <p className="text-muted-foreground bg-black/20 p-4 rounded-md shadow-inner">{result.summary}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl flex items-center gap-2 mb-2"><Briefcase className="text-primary"/>Areas for Improvement</h3>
                    <p className="text-muted-foreground bg-black/20 p-4 rounded-md shadow-inner">{result.areasForImprovement}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
