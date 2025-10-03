import { Paintbrush, Sparkles } from 'lucide-react';
import VirtualTryOnClient from './VirtualTryOnClient';

export const metadata = {
  title: 'Virtual Makeup Try-On | Gauree Cosmetics',
  description: 'Upload your photo and try on various makeup looks virtually with our AI-powered tool.',
};

export default function VirtualTryOnPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="text-center">
        <Sparkles className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-4 text-4xl font-headline md:text-5xl">Virtual Makeup Try-On</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          See how you look before you buy! Upload a selfie and select a makeup style to see the magic happen.
        </p>
      </div>

      <div className="mt-12">
        <VirtualTryOnClient />
      </div>
    </div>
  );
}
