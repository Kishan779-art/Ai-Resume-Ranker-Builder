
'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { suggestImprovementsAction } from '@/lib/actions';
import type { AiResumeSuggestionsOutput } from '@/ai/flows/suggest-resume-improvements';
import { Loader2, Sparkles, Lightbulb, Wand2, FileText, Briefcase } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  resumeContent: z
    .string()
    .min(100, { message: 'Please paste your full resume content.' }),
  jobDescription: z.string().min(20, {
    message: 'Please enter a target job title or short description.',
  }),
});

export function ResumeBuilderForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiResumeSuggestionsOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeContent: '',
      jobDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const aiResult = await suggestImprovementsAction(values);
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
            Improvement Engine
          </CardTitle>
          <CardDescription>
            Paste your resume and the target job description. The AI will provide tailored suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="resumeContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><FileText className="text-primary/80"/> Your Resume Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full text of your resume here..."
                        className="min-h-[250px] bg-background/50 shadow-inner"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Briefcase className="text-primary/80"/> Target Job</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Senior Software Engineer at Google"
                        className="bg-background/50 shadow-inner"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full holographic-button">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get AI Suggestions
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
                      <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> Generating Suggestions...</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                      <div className="flex justify-center mb-4">
                           <Loader2 className="h-16 w-16 animate-spin text-primary"/>
                      </div>
                       <p className="text-muted-foreground">Our AI is crafting suggestions for your resume. This may take a moment.</p>
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
                <CardTitle className="font-headline flex items-center gap-2">
                  <Lightbulb className="text-primary" />
                  AI-Powered Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {result.suggestions.map((suggestion, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="bg-black/20 rounded-md px-4 mb-2 border-b-0 shadow-inner"
                    >
                      <AccordionTrigger className="font-semibold text-lg hover:text-primary no-underline">
                        {suggestion.section}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                            {suggestion.improvementPoints.map((point, pIndex) => (
                                <li key={pIndex}>{point}</li>
                            ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
