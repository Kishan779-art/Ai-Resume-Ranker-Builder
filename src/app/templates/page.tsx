
'use client';
import { useState } from 'react';
import { PageTitle } from '@/components/site/page-title';
import { TemplateCard } from '@/components/site/template-card';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

const templates = [
  { name: 'Modern', imageUrl: 'https://placehold.co/400x565.png', category: 'Modern', hint: 'resume professional' },
  { name: 'Creative', imageUrl: 'https://placehold.co/400x565.png', category: 'Creative', hint: 'resume creative' },
  { name: 'Minimalist', imageUrl: 'https://placehold.co/400x565.png', category: 'Minimalist', hint: 'resume simple' },
  { name: 'Professional', imageUrl: 'https://placehold.co/400x565.png', category: 'Modern', hint: 'resume corporate' },
  { name: 'Tech', imageUrl: 'https://placehold.co/400x565.png', category: 'Creative', hint: 'resume tech' },
  { name: 'Academic', imageUrl: 'https://placehold.co/400x565.png', category: 'Minimalist', hint: 'resume academic' },
];

const categories = ['All', 'Modern', 'Creative', 'Minimalist'];

export default function TemplatesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTemplates = activeFilter === 'All'
    ? templates
    : templates.filter(t => t.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };


  return (
    <div className="container mx-auto px-4 py-8">
       <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <PageTitle
            title="Resume Templates"
            subtitle="Choose a professionally designed template and make it your own. First impressions matter."
            icon={<LayoutGrid className="w-12 h-12" />}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-2 mb-12 flex-wrap">
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
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTemplates.map((template, index) => (
           <motion.div
            key={`${template.name}-${index}`}
            className="h-[565px]"
            variants={itemVariants}
          >
            <TemplateCard {...template} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
