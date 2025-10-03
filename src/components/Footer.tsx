import Link from 'next/link';
import { Button } from './ui/button';
import Logo from './Logo';

// A simple SVG icon component for social media links
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Button variant="ghost" size="icon" asChild>
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only">{href}</span>
    </a>
  </Button>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9s-1.8-1.5-3.3-1.5c-1.3 1.5-2.7 2.9-5.1 2.9-3.3 0-5.9-2.5-5.9-5.9s2.6-5.9 5.9-5.9c.9 0 1.8.2 2.6.6.9-.6 2.1-.9 3.3-.9z"/></svg>
)
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
)
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
)


export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo className="text-muted-foreground"/>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gauree Cosmetics. All rights reserved.
          </p>

          <div className="flex gap-2">
            <SocialIcon href="https://twitter.com">
                <TwitterIcon />
            </SocialIcon>
            <SocialIcon href="https://instagram.com">
                <InstagramIcon />
            </SocialIcon>
            <SocialIcon href="https://facebook.com">
                <FacebookIcon />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}
