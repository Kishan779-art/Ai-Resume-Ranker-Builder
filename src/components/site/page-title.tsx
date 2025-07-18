import type { ReactNode } from 'react';

type PageTitleProps = {
  title: string;
  subtitle: string;
  icon?: ReactNode;
};

export function PageTitle({ title, subtitle, icon }: PageTitleProps) {
  return (
    <div className="text-center my-12 md:my-16">
      {icon && (
        <div className="flex justify-center mb-4 text-primary">{icon}</div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}
