'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard } from 'lucide-react';
import { PageTitle } from '@/components/site/page-title';
import { motion } from 'framer-motion';

const pricingTiers = [
    {
        name: 'Free',
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: 'Get a feel for our platform.',
        features: [
            '1 Resume Rank per day',
            'Limited AI suggestions',
            'Access to free templates',
        ],
        cta: 'Start for Free',
        variant: 'secondary'
    },
    {
        name: 'Pro',
        monthlyPrice: 15,
        yearlyPrice: 12,
        description: 'For job seekers who want to stand out.',
        features: [
            'Unlimited Resume Ranks',
            'Unlimited AI suggestions',
            'Full template gallery access',
            'Priority support'
        ],
        cta: 'Get Started',
        variant: 'default'
    },
    {
        name: 'Team',
        monthlyPrice: 50,
        yearlyPrice: 40,
        description: 'For career coaches and teams.',
        features: [
            'All Pro features',
            '5 user seats',
            'Team dashboard',
            'Centralized billing'
        ],
        cta: 'Contact Sales',
        variant: 'outline'
    }
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
    >
      <motion.div variants={FADE_IN_ANIMATION_VARIANTS}>
        <PageTitle
            title="Our Pricing"
            subtitle="Choose the plan that's right for you. Get a competitive edge in your job search today."
            icon={<CreditCard className="w-12 h-12" />}
        />
      </motion.div>
      

      <motion.div variants={FADE_IN_ANIMATION_VARIANTS} className="flex items-center justify-center space-x-2 mb-12">
        <Label htmlFor="billing-cycle">Monthly</Label>
        <Switch
          id="billing-cycle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <Label htmlFor="billing-cycle">Yearly (Save 20%)</Label>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {pricingTiers.map((tier, index) => (
            <motion.div
                key={tier.name}
                variants={FADE_IN_ANIMATION_VARIANTS}
                transition={{ delay: index * 0.1, duration: 0.5 }}
            >
                <Card className={`flex flex-col h-full neon-glow ${tier.variant === 'default' ? 'border-primary shadow-lg shadow-primary/20' : ''}`}>
                    <CardHeader>
                        <CardTitle className="font-headline">{tier.name}</CardTitle>
                        <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="mb-6">
                            <span className="text-4xl font-bold font-headline">${isYearly ? tier.yearlyPrice : tier.monthlyPrice}</span>
                            <span className="text-muted-foreground">/month{tier.name === 'Team' ? '/seat' : ''}</span>
                        </div>
                        <ul className="space-y-3">
                            {tier.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full holographic-button" variant={tier.variant as any}>{tier.cta}</Button>
                    </CardFooter>
                </Card>
            </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
