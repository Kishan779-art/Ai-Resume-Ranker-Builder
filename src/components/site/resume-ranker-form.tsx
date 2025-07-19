
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
import type { RankResumeAgainstJobDescriptionOutput } from '@/ai/flows/rank-resume';
import { BarChart, FileText, Briefcase, Sparkles, Lightbulb, Upload, FileCheck, BrainCircuit } from 'lucide-react';
import { ScoreGauge } from './score-gauge';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/input';

const formSchema = z.object({
  resumeText: z
    .string()
    .min(1, 'Please paste your resume or upload a PDF.')
    .max(15000, 'Resume is too long.'),
  jobDescriptionText: z
    .string()
    .min(1, 'Please paste the job description.')
    .max(15000, 'Job description is too long.'),
});

const LoadingAnimation = () => {
    const variants = {
        initial: { opacity: 0, y: 20 },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                type: "spring",
                stiffness: 100
            }
        })
    }
    const items = [
        "Parsing Documents...",
        "Analyzing Keywords...",
        "Cross-Referencing Skills...",
        "Calculating Match Score...",
        "Finalizing Report..."
    ];

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
            <CardHeader>
                <CardTitle className="font-headline flex items-center justify-center gap-2"><BrainCircuit className="text-primary"/> Analysis In Progress...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                 <motion.div
                    className="relative w-24 h-24 mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div className="absolute inset-0 border-4 border-primary/20 rounded-full"></motion.div>
                    <motion.div 
                        className="absolute inset-0 border-4 border-t-primary rounded-full"
                        initial={{ clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' }}
                        animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                        transition={{ duration: 4.5, ease: "easeInOut" }}
                    ></motion.div>
                </motion.div>
                <div className="overflow-hidden h-6 mt-4">
                    <AnimatePresence mode="wait">
                         {items.map((item, index) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    delay: index * 0.9,
                                    duration: 0.4,
                                    ease: "easeInOut"
                                }}
                                style={{ position: 'absolute', left: 0, right: 0 }}
                                className="text-muted-foreground"
                            >
                               {item}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </CardContent>
        </Card>
    )
}

export function ResumeRankerForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false); // Used for filename display
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
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

    setIsParsing(true);
    setUploadedFileName(file.name);
    
    // Simulate reading the file and populating the textarea
    setTimeout(() => {
        const dummyResumeText = `DUMMY RESUME DATA FOR: ${file.name}\n\n--- Showcase Mode ---\nThis text is for demonstration purposes. In the full version, the actual content of your PDF would be extracted and placed here for analysis by our AI.\n\nExperience:\n- Led a team of developers in a fast-paced environment.\n- Designed and implemented scalable web applications.\n- Proficient in React, Node.js, and TypeScript.`;
        form.setValue('resumeText', dummyResumeText, { shouldValidate: true });
        toast({
            title: 'Resume Uploaded (Showcase)',
            description: `Showing dummy data for ${file.name}.`,
        });
        setIsParsing(false);
    }, 1000);


    // Reset file input so the same file can be uploaded again
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    // Simulate a 4.5 second analysis with animations
    setTimeout(() => {
      const dummyResult: RankResumeAgainstJobDescriptionOutput = {
        matchScore: 88,
        summary: "This is a strong resume with excellent alignment in key skill areas like React and Node.js. The candidate's experience in leading teams is a major plus. The resume could be further strengthened by quantifying achievements with specific metrics.",
        areasForImprovement: "1. Quantify Achievements: Instead of 'Led a team,' try 'Led a team of 5 developers, increasing productivity by 20%.'\n2. Tailor to Job Description: Add keywords from the job description like 'Agile Methodologies' and 'CI/CD pipelines.'\n3. Add a Project Section: Showcase a specific project that demonstrates your technical skills and impact."
      };
      setResult(dummyResult);
      setIsLoading(false);
      
      // Scroll to results
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    }, 4500);
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
            Analysis Engine (Showcase Mode)
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
                                    <BarChart className="mr-2 h-4 w-4 animate-pulse" />
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
                           {uploadedFileName && !isParsing && (
                                <div className="text-sm text-green-500 flex items-center gap-2 pt-1">
                                    <FileCheck className="h-4 w-4" /> 
                                    <span>{uploadedFileName} uploaded. (Showing dummy data)</span>
                                </div>
                            )}
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
                  <>
                    <BarChart className="mr-2 h-4 w-4 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart className="mr-2 h-4 w-4" />
                    Rank My Resume
                  </>
                )}
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
              <LoadingAnimation />
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
                    <p className="text-muted-foreground bg-black/20 p-4 rounded-md shadow-inner whitespace-pre-line">{result.summary}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl flex items-center gap-2 mb-2"><Briefcase className="text-primary"/>Areas for Improvement</h3>
                    <p className="text-muted-foreground bg-black/20 p-4 rounded-md shadow-inner whitespace-pre-line">{result.areasForImprovement}</p>
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
