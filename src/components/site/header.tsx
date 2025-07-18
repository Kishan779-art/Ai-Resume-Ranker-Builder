
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Bolt, Menu, LogIn, LogOut } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { name: 'Ranker', href: '/ranker' },
    { name: 'Builder', href: '/builder' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bolt className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">
              Bolt Resume AI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          </nav>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <Bolt className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Bolt Resume AI</span>
          </Link>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2">
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="outline" className="hidden md:flex">
              Logout
              <LogOut className="ml-2" />
            </Button>
          ) : (
            <Button asChild className="hidden md:flex">
              <Link href="/login">
                Login
                <LogIn className="ml-2" />
              </Link>
            </Button>
          )}

          <ThemeToggle />

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-12">
                  <Link href="/" className="flex items-center space-x-2 mb-4">
                     <Bolt className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Bolt Resume AI</span>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                   {isAuthenticated ? (
                     <button onClick={handleLogout} className="transition-colors hover:text-primary text-left flex items-center">
                      Logout <LogOut className="ml-2"/>
                    </button>
                  ) : (
                    <Link href="/login" className="transition-colors hover:text-primary flex items-center">
                      Login <LogIn className="ml-2"/>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
