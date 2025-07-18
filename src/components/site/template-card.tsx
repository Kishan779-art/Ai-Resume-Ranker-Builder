
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Code } from 'lucide-react';

type TemplateCardProps = {
  name: string;
  imageUrl: string;
  category: string;
  hint?: string;
};

export function TemplateCard({ name, imageUrl, category, hint }: TemplateCardProps) {
  return (
    <div className="group rounded-lg perspective-1000 h-full">
      <Card className="relative transform-style-3d transition-transform duration-700 group-hover:rotate-y-180 h-full w-full bg-card/50 backdrop-blur-sm border-border/20 neon-glow">
        {/* Front Face */}
        <div className="absolute w-full h-full backface-hidden">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={565}
            className="rounded-lg object-cover w-full h-full"
            data-ai-hint={hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-lg" />
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="font-headline text-xl font-bold text-white">{name}</h3>
            <p className="text-sm text-primary-foreground/80">{category}</p>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center p-6">
            <h3 className="font-headline text-2xl font-bold">{name}</h3>
            <p className="text-muted-foreground mb-6">{category}</p>
            <div className="space-y-4">
                <Button className="w-40 holographic-button">
                    <Eye className="mr-2 h-4 w-4" /> Use Template
                </Button>
                <Button variant="secondary" className="w-40">
                    <Code className="mr-2 h-4 w-4" /> Preview
                </Button>
            </div>
        </div>
      </Card>
    </div>
  );
}
