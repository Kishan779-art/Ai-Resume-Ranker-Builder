
'use client';

import { PageTitle } from '@/components/site/page-title';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, BarChart, FileText, TrendingUp, Wand2 } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useAuth } from '@/contexts/auth-context';
import { motion } from 'framer-motion';
import Link from 'next/link';

const chartData = [
  { month: 'January', score: 75 },
  { month: 'February', score: 82 },
  { month: 'March', score: 88 },
  { month: 'April', score: 85 },
  { month: 'May', score: 92 },
  { month: 'June', score: 95 },
];

const chartConfig = {
  score: {
    label: 'Avg. Score',
    color: 'hsl(var(--primary))',
  },
};

export default function DashboardPage() {
  const { user } = useAuth();

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

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <PageTitle
          title={`Welcome Back, ${user ? user.split('@')[0] : 'User'}!`}
          subtitle="Here's a snapshot of your recent activity and AI-driven insights."
          icon={<TrendingUp className="w-12 h-12" />}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes Analyzed</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Highest Match Score</CardTitle>
              <BarChart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">For "Senior Product Manager"</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AI Suggestions Applied</CardTitle>
              <Wand2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">Across 5 resumes</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div className="grid grid-cols-1 lg:grid-cols-5 gap-8" variants={containerVariants}>
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow h-full">
            <CardHeader>
              <CardTitle className="font-headline">Average Score Trend</CardTitle>
              <CardDescription>Your average resume match score over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-[300px] w-full">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={chartData}>
                         <defs>
                          <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                          stroke="hsl(var(--muted-foreground))"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}%`}
                        />
                         <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                          />
                        <Area type="monotone" dataKey="score" fill="url(#fillScore)" stroke="hsl(var(--primary))" />
                        <Bar dataKey="score" fill="hsl(var(--primary) / 0.5)" radius={[4, 4, 0, 0]} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/20 neon-glow h-full flex flex-col">
                 <CardHeader>
                    <CardTitle className="font-headline">Quick Actions</CardTitle>
                    <CardDescription>Jump right back into improving your career prospects.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center gap-4">
                    <Button asChild size="lg" className="w-full holographic-button">
                        <Link href="/ranker">
                            <BarChart className="mr-2" />
                            Rank a New Resume
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="w-full">
                         <Link href="/builder">
                            <Wand2 className="mr-2" />
                            Build a New Resume
                        </Link>
                    </Button>
                     <Button asChild size="lg" variant="outline" className="w-full">
                         <Link href="/templates">
                            <FileText className="mr-2" />
                            Browse Templates
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

    