'use client';
import { useState } from 'react';
import { PageTitle } from '@/components/site/page-title';
import { TemplateCard } from '@/components/site/template-card';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';

const templates = [
  { name: 'Modern', imageUrl: 'https://placehold.co/400x565.png', category: 'Modern' },
  { name: 'Creative', imageUrl: 'https://placehold.co/400x565.png', category: 'Creative' },
  { name: 'Minimalist', imageUrl: 'https://placehold.co/400x565.png', category: 'Minimalist' },
  { name: 'Professional', imageUrl: 'https://placehold.co/400x565.png', category: 'Modern' },
  { name: 'Tech', imageUrl: 'https://placehold.co/400x565.png', category: 'Creative' },
  { name: 'Academic', imageUrl: 'https://placehold.co/400x565.png', category: 'Minimalist' },
];

const categories = ['All', 'Modern', 'Creative', 'Minimalist'];

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTemplates = activeFilter === 'All'
    ? templates
    : templates.filter(t => t.category === activeFilter);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle
        title="Resume Templates"
        subtitle="Choose a professionally designed template and make it your own. First impressions matter."
        icon={<LayoutGrid className="w-12 h-12" />}
      />

      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeFilter === category ? 'default' : 'secondary'}
            onClick={() => setActiveFilter(category)}
            className="holographic-button disabled:opacity-100"
            disabled={activeFilter === category}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div key={template.name} className="h-[565px]">
            <TemplateCard {...template} />
          </div>
        ))}
      </div>
    </div>
  );
}
