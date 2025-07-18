
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const titleText = 'Welcome Back';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (typedTitle.length < titleText.length) {
      const timeoutId = setTimeout(() => {
        setTypedTitle(titleText.slice(0, typedTitle.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [typedTitle]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 2500); // Wait for the success animation/message to show
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      login(values.email);
      toast({
        title: 'Login Successful!',
        description: `Welcome back, ${values.email}`,
      });
    }, 2000);
  }

  const cardVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 1.2, transition: { duration: 0.5, ease: 'easeIn' } },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          variants={successVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/20 p-8 neon-glow">
            <CardHeader>
              <CardTitle className="text-3xl font-headline text-green-400">
                Access Granted
              </CardTitle>
              <CardDescription>Redirecting you to the dashboard...</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ) : (
        <motion.div
            key="form"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline text-primary h-10">
                {typedTitle}
                <span className="animate-ping">|</span>
                </CardTitle>
                <CardDescription>
                Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input
                            type="email"
                            placeholder="Email Address"
                            className="h-12 text-lg focus:ring-primary/80 focus:ring-offset-0 focus:border-primary/50 transition-shadow duration-300 shadow-inner bg-background/50"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input
                            type="password"
                            placeholder="Password"
                            className="h-12 text-lg focus:ring-primary/80 focus:ring-offset-0 focus:border-primary/50 transition-shadow duration-300 shadow-inner bg-background/50"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 text-lg holographic-button"
                    >
                        {isLoading ? (
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        ) : (
                        <LogIn className="mr-2 h-6 w-6" />
                        )}
                        Login
                    </Button>
                </form>
                </Form>
                <div className="mt-6 text-center text-sm">
                <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
                >
                    Forgot Password?
                </Link>
                </div>
            </CardContent>
            </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
