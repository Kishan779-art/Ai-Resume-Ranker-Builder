import { LoginForm } from '@/components/site/login-form';
import { PageTitle } from '@/components/site/page-title';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen animated-gradient-bg relative overflow-hidden">
       <div className="absolute inset-0 particles-bg"></div>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <LoginForm />
      </div>
    </div>
  );
}
