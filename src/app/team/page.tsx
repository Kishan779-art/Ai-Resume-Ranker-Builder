import { PageTitle } from '@/components/site/page-title';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

const teamMembers = [
    {
        name: 'Alex Johnson',
        role: 'Founder & CEO',
        avatarUrl: 'https://placehold.co/100x100.png',
        avatarFallback: 'AJ',
        dataAiHint: 'man portrait'
    },
    {
        name: 'Samantha Lee',
        role: 'Lead AI Engineer',
        avatarUrl: 'https://placehold.co/100x100.png',
        avatarFallback: 'SL',
        dataAiHint: 'woman portrait'
    },
    {
        name: 'David Chen',
        role: 'Head of Product',
        avatarUrl: 'https://placehold.co/100x100.png',
        avatarFallback: 'DC',
        dataAiHint: 'professional person'
    },
    {
        name: 'Maria Garcia',
        role: 'UX/UI Design Lead',
        avatarUrl: 'https://placehold.co/100x100.png',
        avatarFallback: 'MG',
        dataAiHint: 'smiling woman'
    },
    {
        name: 'Chris Roberts',
        role: 'Senior Frontend Developer',
        avatarUrl: 'https://placehold.co/100x100.png',
        avatarFallback: 'CR',
        dataAiHint: 'developer coding'
    },
    {
        name: 'Jessica Williams',
        role: 'Marketing Director',
        avatarUrl: 'https://placehold.co/100x100.png',
        avatarFallback: 'JW',
        dataAiHint: 'business woman'
    }
]

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle
        title="Meet the Team"
        subtitle="The passionate minds behind Bolt Resume AI, dedicated to helping you achieve your career goals."
        icon={<Users className="w-12 h-12" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map(member => (
            <Card key={member.name} className="text-center group bg-card/50 backdrop-blur-sm border-border/20 hover:border-primary/50 transition-all">
                <CardContent className="pt-6">
                    <Avatar className="h-28 w-28 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                        <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                        <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
