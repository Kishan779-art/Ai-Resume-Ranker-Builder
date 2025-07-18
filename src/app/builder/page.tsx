
'use client';

import { PageTitle } from '@/components/site/page-title';
import { ResumeBuilderForm } from '@/components/site/resume-builder-form';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BuilderPage() {
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
    <div className="min-h-[90vh] animated-gradient-bg relative overflow-hidden">
       <div className="absolute inset-0 particles-bg"></div>
      <motion.div
        className="container mx-auto px-4 py-8 z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <PageTitle
            title="AI Resume Builder"
            subtitle="Craft a compelling resume from scratch with real-time, AI-powered suggestions tailored to your target job."
            icon={<Wand2 className="w-12 h-12" />}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResumeBuilderForm />
        </motion.div>
      </motion.div>
    </div>
  );
}
