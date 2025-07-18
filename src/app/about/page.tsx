
'use client';
import { PageTitle } from '@/components/site/page-title';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Info, User, Wand2, BarChart, Rocket, Milestone } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <PageTitle
          title="About Bolt Resume AI"
          subtitle="Learn more about the project, its features, and the creator behind it."
          icon={<Info className="w-12 h-12" />}
        />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        <motion.div className="md:col-span-2 space-y-8" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 neon-glow">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Rocket className="text-primary" />
                  About The Project
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Bolt Resume AI was created to provide modern job seekers with a
                  powerful, intuitive, and AI-driven toolkit to navigate the
                  competitive job market. The goal is to demystify the resume
                  creation and optimization process, giving users a clear advantage.
                </p>
                <p>
                  By leveraging cutting-edge AI, this platform helps you not only
                  build a resume from scratch but also analyze its effectiveness
                  against specific job descriptions, ensuring you always put your
                  best foot forward.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 neon-glow">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Milestone className="text-primary" />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <BarChart className="h-5 w-5" /> AI Resume Ranker
                </h3>
                <p>
                  Navigate to the <Link href="/ranker" className="text-primary hover:underline">Ranker</Link> page. Paste your resume content and the job description you're targeting. Our AI will analyze both and give you a "Match Score," along with a summary and actionable areas for improvement.
                </p>

                 <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <Wand2 className="h-5 w-5" /> AI Resume Builder
                </h3>
                <p>
                  On the <Link href="/builder" className="text-primary hover:underline">Builder</Link> page, paste your existing resume content (or start typing a new one) and provide a target job. The AI will provide real-time suggestions to strengthen each section of your resume, tailored to the job you want.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="space-y-8" variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 neon-glow">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <User className="text-primary" />
                About The Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary/50 neon-glow">
                <AvatarImage src="https://github.com/shadcn.png" alt="Kishan Patel" />
                <AvatarFallback>KP</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold font-headline">Kishan Patel</h3>
              <p className="text-muted-foreground mt-2">
                Solo Developer & Creator
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                This project was designed and developed entirely by me. I'm passionate about building tools that solve real-world problems and empower people in their careers.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
