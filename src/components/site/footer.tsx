import Link from 'next/link';
import { Bolt } from 'lucide-react';

export function Footer() {
  const navItems = [
    { name: 'Ranker', href: '/ranker' },
    { name: 'Builder', href: '/builder' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Team', href: '/team' },
  ];

  return (
    <footer className="border-t border-border/20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Bolt className="text-primary h-6 w-6" />
            <span className="font-bold text-lg font-headline">Bolt Resume AI</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bolt Resume AI. All rights are owned by kishan patel.</p>
          <p>Designed and developed by kishan patel.</p>
        </div>
      </div>
    </footer>
  );
}
