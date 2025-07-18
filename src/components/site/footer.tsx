import Link from 'next/link';
import { Bolt, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const socialLinks = [
    { name: 'GitHub', href: '#', icon: <Github className="h-5 w-5" /> },
    { name: 'Twitter', href: '#', icon: <Twitter className="h-5 w-5" /> },
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="h-5 w-5" /> },
  ];

  const footerLinks = [
      { name: 'Home', href: '/' },
      { name: 'Ranker', href: '/ranker' },
      { name: 'Builder', href: '/builder' },
      { name: 'Templates', href: '/templates' },
      { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <footer className="border-t border-border/20 bg-background/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 particles-bg opacity-50"></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Bolt className="text-primary h-8 w-8 transition-transform group-hover:scale-110" />
              <span className="text-2xl font-bold font-headline">Bolt Resume AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-Powered Resume Tools for the Modern Job Seeker.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h4 className="font-headline mb-4 text-lg">Navigate</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {footerLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
             <h4 className="font-headline mb-4 text-lg">Get in Touch</h4>
             <Button asChild className="holographic-button mb-4">
                <Link href="#">Contact Us</Link>
             </Button>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={item.name}
                >
                   <Button variant="ghost" size="icon" className="rounded-full">
                     {item.icon}
                   </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bolt Resume AI. All rights are owned by Kishan Patel.</p>
          <p>Designed and developed by Kishan Patel.</p>
        </div>
      </div>
    </footer>
  );
}
