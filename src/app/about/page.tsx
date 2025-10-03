import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function AboutPage() {
    const aboutHero = PlaceHolderImages.find(p => p.id === 'service2'); // Using a relevant image
    const teamMember1 = PlaceHolderImages.find(p => p.id === 'testimonial2');
    const teamMember2 = PlaceHolderImages.find(p => p.id === 'testimonial3');
    const teamMember3 = PlaceHolderImages.find(p => p.id === 'testimonial1');

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] text-white">
        {aboutHero && (
            <Image
              src={aboutHero.imageUrl}
              alt="Our team working on makeup"
              fill
              className="object-cover"
              data-ai-hint={aboutHero.imageHint}
              priority
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold !leading-tight drop-shadow-lg">
            About Gauree Cosmetics
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
            Crafting beauty and confidence with every product.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-headline">Our Story</h2>
                      <p className="mt-4 text-lg text-muted-foreground">
                          Founded in 2021, Gauree Cosmetics was born from a passion for makeup that not only looks beautiful but also feels amazing on the skin. We believe in the power of cosmetics to boost confidence and express individuality. Our journey started with a simple idea: to create high-quality, cruelty-free makeup accessible to everyone.
                      </p>
                      <p className="mt-4 text-muted-foreground">
                          From our first lipstick to our latest AI-powered virtual try-on, we've always put innovation and our customers at the heart of what we do.
                      </p>
                  </div>
                  <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                    {teamMember1 && (
                         <Image 
                            src={PlaceHolderImages.find(p => p.id === 'makeup flatlay')?.imageUrl || ''}
                            alt="Makeup flatlay"
                            fill
                            className="object-cover"
                            data-ai-hint="makeup collection"
                         />
                    )}
                  </div>
              </div>
          </div>
      </section>
      
      {/* Mission & Vision Section */}
       <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl md:text-4xl font-headline mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <Award className="w-12 h-12 text-accent" />
                    <h3 className="font-headline text-2xl mt-4">Quality</h3>
                    <p className="text-muted-foreground mt-2">We are committed to using only the finest ingredients to create products that deliver exceptional performance and wear.</p>
                </div>
                <div className="flex flex-col items-center">
                    <Target className="w-12 h-12 text-accent" />
                    <h3 className="font-headline text-2xl mt-4">Empowerment</h3>
                    <p className="text-muted-foreground mt-2">Our mission is to empower individuals to feel confident and beautiful in their own skin, celebrating diversity and self-expression.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <Users className="w-12 h-12 text-accent" />
                    <h3 className="font-headline text-2xl mt-4">Community</h3>
                    <p className="text-muted-foreground mt-2">We strive to build a supportive and inclusive community where beauty lovers can connect, learn, and grow together.</p>
                </div>
            </div>
          </div>
       </section>

      {/* Meet the Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: 'Jessica Doe', role: 'Founder & CEO', image: teamMember3 },
              { name: 'Alex Smith', role: 'Head Makeup Artist', image: teamMember1 },
              { name: 'Emily White', role: 'Product Development Lead', image: teamMember2 },
            ].map((member) => (
              <Card key={member.name} className="text-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                  {member.image && (
                    <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-accent">
                      <AvatarImage src={member.image.imageUrl} alt={member.name} data-ai-hint={member.image.imageHint} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <h3 className="font-headline text-xl">{member.name}</h3>
                  <p className="text-accent font-semibold">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
