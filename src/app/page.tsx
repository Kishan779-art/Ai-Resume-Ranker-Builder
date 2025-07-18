
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Rocket,
  Wand2,
  LayoutGrid,
  CreditCard,
  BarChart,
  MoveRight,
} from 'lucide-react';

export default function Home() {

  const features = [
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: 'AI Resume Ranker',
      description:
        'Score your resume against any job description and get instant feedback on how to improve your chances.',
      link: '/ranker',
    },
    {
      icon: <Wand2 className="w-8 h-8 text-primary" />,
      title: 'AI Resume Builder',
      description:
        'Craft the perfect resume with our AI assistant providing context-aware suggestions as you type.',
      link: '/builder',
    },
    {
      icon: <LayoutGrid className="w-8 h-8 text-primary" />,
      title: 'Stunning Templates',
      description:
        'Choose from a gallery of professionally designed templates that stand out from the crowd.',
      link: '/templates',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      title: 'Flexible Pricing',
      description:
        'Find the perfect plan that fits your needs, with monthly and yearly options available.',
      link: '/pricing',
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: 'Get Hired Faster',
      description:
        'Our tools are designed to give you a competitive edge and accelerate your job search.',
      link: '/builder',
    },
     {
      icon: <MoveRight className="w-8 h-8 text-primary" />,
      title: 'And Much More',
      description: 'Explore all our features and see how we can help you land your dream job.',
      link: '/about'
    }
  ];

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden animated-gradient-bg py-20 md:py-0">
         <div
          className="absolute inset-0 bg-grid opacity-20"
          style={{
            maskImage:
              'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        ></div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
            className="text-center"
          >
            <motion.h1 
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 leading-tight"
            >
              Build Your Future, Faster.
            </motion.h1>
            <motion.p 
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground"
            >
              Harness the power of AI to create a resume that lands you interviews.
              Bolt Resume AI analyzes, builds, and perfects your application materials.
            </motion.p>
            <motion.div 
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Button asChild size="lg" className="holographic-button w-full sm:w-auto">
                <Link href="/builder">
                  Start Building
                  <Wand2 className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/ranker">
                  Rank My Resume
                  <BarChart className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
              Why Choose Bolt Resume AI?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive suite of tools designed to give you a competitive edge and accelerate your job search. Everything you need to land the job of your dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {features.map((feature, index) => (
               <motion.div
                key={index}
                variants={FADE_IN_ANIMATION_VARIANTS}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
              <Card
                className="bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2 h-full"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  {feature.icon}
                  <CardTitle className="font-headline text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
