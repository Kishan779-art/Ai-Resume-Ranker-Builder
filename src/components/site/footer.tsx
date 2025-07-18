import Link from 'next/link';
import { Bolt, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { name: 'GitHub', href: '#', icon: <Github className="h-5 w-5" /> },
    { name: 'Twitter', href: '#', icon: <Twitter className="h-5 w-5" /> },
    { name: 'LinkedIn', href: '#', icon: <Linkedin className="h-5 w-5" /> },
  ];

  return (
    <footer className="border-t border-border/20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bolt className="text-primary h-5 w-5" />
                <span>Bolt Resume AI</span>
            </div>
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
        <div className="mt-6 pt-6 border-t border-border/20 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bolt Resume AI. All rights reserved.</p>
          <p>Designed and developed by Kishan Patel.</p>
        </div>
      </div>
    </footer>
  );
}
