import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Paintbrush, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/AddToCartButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { products, services, testimonials, makeupLooks } from '@/lib/data';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const userPortraitPlaceholder = PlaceHolderImages.find(p => p.id === 'user_portrait_placeholder');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-24">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold !leading-tight drop-shadow-lg">
              Define Your Beauty
            </h1>
            <p className="mt-4 max-w-lg text-lg md:text-xl drop-shadow-md">
              Discover premium cosmetics and book professional makeup services to unveil your inner radiance.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="products" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">Featured Products</h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {products.slice(0, 5).map((product, index) => {
                  const productImage = PlaceHolderImages.find(p => p.id === product.imageId);
                  return (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <CardHeader className="p-0">
                            {productImage && (
                                <Image
                                  src={productImage.imageUrl}
                                  alt={product.name}
                                  width={400}
                                  height={400}
                                  className="w-full h-64 object-cover"
                                  data-ai-hint={productImage.imageHint}
                                />
                            )}
                          </CardHeader>
                          <CardContent className="flex-1 p-6">
                            <h3 className="font-headline text-xl">{product.name}</h3>
                            <p className="text-muted-foreground mt-2">{product.category}</p>
                          </CardContent>
                          <CardFooter className="p-6 pt-0 flex justify-between items-center">
                            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                            <AddToCartButton product={product} />
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="ml-12" />
              <CarouselNext className="mr-12"/>
            </Carousel>
             <div className="text-center mt-12">
                <Button asChild size="lg" variant="link" className="text-lg">
                    <Link href="/products">
                        View All Products <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">Our Makeup Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
                return (
                  <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                     {serviceImage && (
                        <Image
                          src={serviceImage.imageUrl}
                          alt={service.name}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover"
                          data-ai-hint={serviceImage.imageHint}
                        />
                     )}
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl">{service.name}</CardTitle>
                      <CardDescription>{service.duration} &bull; ${service.price}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href="/services">Book Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Virtual Try-On Section */}
        <section id="try-on" className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Sparkles className="w-12 h-12 text-accent" />
                <h2 className="text-3xl md:text-4xl font-headline mt-4">Virtual Makeup Try-On</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Not sure which look suits you? Use our AI-powered tool to try on different makeup styles virtually before you buy or book.
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href="/virtual-try-on">
                    Try it Now <Paintbrush className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                {userPortraitPlaceholder && (
                  <Image 
                    src={userPortraitPlaceholder.imageUrl}
                    alt="Virtual makeup try on example"
                    fill
                    className="object-cover"
                    data-ai-hint={userPortraitPlaceholder.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent flex items-center justify-center">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg">
                      <Sparkles className="w-16 h-16 text-white" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => {
                const testimonialImage = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                return (
                  <Card key={index} className="bg-background border-none shadow-lg">
                    <CardContent className="pt-6">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent fill-accent' : 'text-muted-foreground/50'}`} />
                        ))}
                      </div>
                      <blockquote className="mt-4 text-foreground italic">"{testimonial.quote}"</blockquote>
                    </CardContent>
                    <CardFooter className="flex items-center gap-4">
                      {testimonialImage && (
                         <Avatar>
                            <AvatarImage src={testimonialImage.imageUrl} alt={testimonial.name} data-ai-hint={testimonialImage.imageHint} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                      )}
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                      </div>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
