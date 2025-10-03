'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Sparkles, Wand2, Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { makeupLooks } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { applyMakeup } from '@/app/actions';
import type { VirtualMakeupTryOnOutput } from '@/ai/flows/virtual-makeup-try-on';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function VirtualTryOnClient() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedLook, setSelectedLook] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VirtualMakeupTryOnOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
        })
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null); // Clear previous result
    }
  };

  const handleTryOn = async () => {
    if (!imagePreview || !selectedLook) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please upload a photo and select a makeup style.",
        })
      return;
    }

    setIsLoading(true);
    setResult(null);

    const actionResult = await applyMakeup({
      photoDataUri: imagePreview,
      makeupStyle: selectedLook,
    });

    if (actionResult.success) {
      setResult(actionResult.data);
    } else {
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: actionResult.error,
      })
    }
    setIsLoading(false);
  };

  const reset = () => {
    setImageFile(null);
    setImagePreview(null);
    setSelectedLook(null);
    setResult(null);
  };
  
  const userPortraitPlaceholder = PlaceHolderImages.find(p => p.id === 'user_portrait_placeholder');

  if (result) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Your Makeover!</CardTitle>
          <CardDescription>{result.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="text-center">
              <h3 className="font-headline text-xl mb-2">Original</h3>
              {imagePreview && <Image src={imagePreview} alt="Original" width={500} height={500} className="rounded-lg shadow-md mx-auto" />}
            </div>
            <div className="text-center">
              <h3 className="font-headline text-xl mb-2">With {selectedLook} Makeup</h3>
              <Image src={result.modifiedPhotoDataUri} alt={`After applying ${selectedLook} makeup`} width={500} height={500} className="rounded-lg shadow-md mx-auto" />
            </div>
          </div>
          <div className="text-center mt-8">
            <Button onClick={reset} size="lg">
              <Wand2 className="mr-2 h-5 w-5" />
              Try Another Look
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Step 1: Upload Photo */}
                <div>
                    <h3 className="flex items-center gap-2 font-headline text-2xl mb-4"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">1</span> Upload Your Photo</h3>
                    <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center h-80 flex flex-col justify-center items-center transition-colors hover:border-primary">
                        {imagePreview ? (
                        <>
                            <Image src={imagePreview} alt="Preview" layout="fill" objectFit="contain" className="p-2 rounded-lg" />
                            <Button variant="destructive" size="icon" onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute top-2 right-2 z-10 h-8 w-8">
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                        ) : (
                        <>
                            <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <span className="text-primary font-semibold">Click to upload</span> or drag and drop
                            </label>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
                            <p className="text-xs text-muted-foreground mt-2">PNG, JPG, WEBP up to 4MB</p>
                        </>
                        )}
                    </div>
                </div>

                {/* Step 2: Choose Look */}
                <div>
                    <h3 className="flex items-center gap-2 font-headline text-2xl mb-4"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">2</span> Choose Your Look</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {makeupLooks.map(look => {
                            const lookImage = PlaceHolderImages.find(p => p.id === look.imageId);
                            return (
                                <div key={look.id} onClick={() => setSelectedLook(look.name)} className={cn("relative rounded-lg overflow-hidden cursor-pointer group border-4", selectedLook === look.name ? "border-primary" : "border-transparent")}>
                                    {lookImage && <Image src={lookImage.imageUrl} alt={look.name} width={200} height={200} className="w-full h-full object-cover transition-transform group-hover:scale-105" data-ai-hint={lookImage.imageHint} />}
                                    <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                                        <p className="text-white font-bold text-sm font-headline">{look.name}</p>
                                    </div>
                                    {selectedLook === look.name && (
                                        <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                                            <Sparkles className="w-8 h-8 text-white"/>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Step 3: Generate */}
            <div className="mt-8 text-center">
                 <h3 className="flex items-center justify-center gap-2 font-headline text-2xl mb-4"><span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">3</span> Get Your Makeover</h3>
                <Button onClick={handleTryOn} disabled={!imagePreview || !selectedLook || isLoading} size="lg" className="w-full max-w-xs">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Applying Makeup...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-5 w-5" />
                            Try it On!
                        </>
                    )}
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
