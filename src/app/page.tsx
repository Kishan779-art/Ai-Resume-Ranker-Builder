
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Rocket,
  Wand2,
  LayoutGrid,
  CreditCard,
  BarChart,
} from 'lucide-react';

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  ];

  return (
    <div className="w-full text-center">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden animated-gradient-bg">
        <div
          className="absolute inset-0 bg-grid opacity-20"
          style={{
            maskImage:
              'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${offsetY * 0.5}px)` }}
        >
          <div className="container mx-auto px-4 z-10 relative">
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 leading-tight">
              Build Your Future, Faster.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground">
              Harness the power of AI to create a resume that lands you interviews.
              Bolt Resume AI analyzes, builds, and perfects your application materials.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="holographic-button">
                <Link href="/builder">
                  Start Building
                  <Wand2 className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/ranker">
                  Rank My Resume
                  <BarChart className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline tracking-tight">
              Why Choose Bolt Resume AI?
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Everything you need to get the job of your dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2"
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
