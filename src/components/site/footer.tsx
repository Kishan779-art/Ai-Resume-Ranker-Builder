import Link from 'next/link';
import { Bolt, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'GitHub', href: '#', icon: <Github className="h-5 w-5" /> },
    { name: 'Twitter', href: '#', icon: <Twitter className="h-5 w-5" /> },
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="h-5 w-5" /> },
  ];

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Templates', href: '/templates' },
  ];

  return (
    <footer className="border-t border-border/20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <Bolt className="text-primary h-6 w-6" />
              <span className="font-bold font-headline">Bolt Resume AI</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              AI-Powered Resume Tools for the Modern Job Seeker.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <h4 className="font-headline mb-2">Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-headline mb-2">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={item.name}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/20 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bolt Resume AI. All rights are owned by Kishan Patel.</p>
          <p>Designed and developed by Kishan Patel.</p>
        </div>
      </div>
    </footer>
  );
}
