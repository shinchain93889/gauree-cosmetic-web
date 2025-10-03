import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-xl font-headline font-bold", className)}>
      <Sparkles className="h-6 w-6 text-accent" />
      <span>Gauree</span>
    </Link>
  );
};

export default Logo;
