import { PageTitle } from '@/components/site/page-title';
import { ResumeBuilderForm } from '@/components/site/resume-builder-form';
import { Wand2 } from 'lucide-react';

export default function BuilderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle
        title="AI Resume Builder"
        subtitle="Craft a compelling resume from scratch with real-time, AI-powered suggestions tailored to your target job."
        icon={<Wand2 className="w-12 h-12" />}
      />
      <ResumeBuilderForm />
    </div>
  );
}
