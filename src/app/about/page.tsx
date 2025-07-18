
'use client';

import { PageTitle } from '@/components/site/page-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BrainCircuit,
  FileUp,
  FileDown,
  FileSearch,
  Sparkles,
  Info,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const timelineSteps = [
  {
    icon: <FileUp className="w-8 h-8 text-primary" />,
    title: 'Upload Job Description',
    description:
      'Start by providing the job description for the role you are targeting.',
  },
  {
    icon: <FileSearch className="w-8 h-8 text-primary" />,
    title: 'Upload Your Resume',
    description: 'Next, upload your current resume for our AI to analyze.',
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Click Analyze',
    description:
      'Our AI gets to work, comparing your resume against the job description.',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: 'View Results',
    description:
      'Receive a detailed match score and actionable feedback in seconds.',
  },
  {
    icon: <FileDown className="w-8 h-8 text-primary" />,
    title: 'Optimize & Download',
    description:
      'Use the insights to improve your resume and get ready to apply.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen animated-gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 particles-bg"></div>
      <motion.div
        className="container mx-auto px-4 py-8 z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <PageTitle
            title="About Bolt Resume AI"
            subtitle="Harnessing the power of AI to forge career opportunities."
            icon={<Info className="w-12 h-12" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="max-w-3xl mx-auto mb-16 bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
            <CardHeader className="text-center">
              <CardTitle className="font-headline flex items-center justify-center gap-2">
                <User className="w-6 h-6" /> About The Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                <Avatar className="h-24 w-24 border-2 border-primary shadow-lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Kishan Patel" />
                  <AvatarFallback>KP</AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold font-headline">Kishan Patel</h3>
                <p className="text-primary font-semibold">AIML Engineer</p>
                <p className="text-muted-foreground mt-2">
                  As an AI and Machine Learning Engineer, I created Bolt Resume AI
                  to bridge the gap between talented individuals and their dream
                  jobs using cutting-edge technology.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">How It Works</h2>
          <p className="mt-2 text-lg text-muted-foreground">A simple, powerful process to optimize your resume.</p>
        </motion.div>
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>
          {timelineSteps.map((step, index) => (
            <motion.div key={index} custom={index} variants={itemVariants} className="mb-8 flex justify-center md:justify-normal items-center w-full">
              <div className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center w-full`}>
                <div className="hidden md:flex flex-1"></div>
                <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0 bg-background border-2 border-primary rounded-full h-8 w-8 z-10 flex items-center justify-center font-bold">{index + 1}</div>
                <div className="flex-1">
                  <motion.div 
                    whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                    className={`md:w-10/12 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow h-full">
                      <CardHeader className="flex flex-row items-center gap-4">
                        {step.icon}
                        <CardTitle className="font-headline text-xl">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
