import { PageTitle } from '@/components/site/page-title';
import { ResumeRankerForm } from '@/components/site/resume-ranker-form';
import { BarChart } from 'lucide-react';

export default function RankerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle
        title="AI Resume Ranker"
        subtitle="See how your resume stacks up against a job description and get your match score in seconds."
        icon={<BarChart className="w-12 h-12" />}
      />
      <ResumeRankerForm />
    </div>
  );
}
