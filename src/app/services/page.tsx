import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-headline text-center mb-4">
        Book a Service
      </h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Treat yourself to a professional makeup session with one of our talented artists. Select a service and choose your preferred date.
      </p>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const serviceImage = PlaceHolderImages.find(p => p.id === service.imageId);
            return (
              <Card key={service.id} className="flex flex-col">
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
                  <CardDescription>{service.duration} &bull; ₹{service.price.toLocaleString('en-IN')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Select Service</Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Select a Date</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                className="p-0"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled>Book Appointment</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
