'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Service, services } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AppointmentForm } from "@/components/AppointmentForm";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { useState } from "react";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service>();

  const handleAppointmentSubmit = async (appointment: {
    service: Service;
    date: Date;
    time: string;
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      // Here you would typically send this to your backend
      // For now, we'll simulate a successful booking
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      console.log('Appointment booked:', appointment);

      toast({
        title: "Success!",
        description: `Your appointment for ${appointment.service.name} has been scheduled for ${appointment.date.toLocaleDateString()} at ${appointment.time}. We'll send a confirmation to ${appointment.email}.`,
        variant: "default",
      });

      setSelectedService(undefined); // Reset selected service
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
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
              const isSelected = selectedService?.id === service.id;

              return (
                <Card key={service.id} className={`flex flex-col ${isSelected ? 'ring-2 ring-primary' : ''}`}>
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
                    <CardDescription>{service.duration} • ₹{service.price.toLocaleString('en-IN')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={isSelected ? "secondary" : "default"}
                      onClick={() => setSelectedService(isSelected ? undefined : service)}
                    >
                      {isSelected ? 'Cancel Selection' : 'Select Service'}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
          <div className="lg:col-span-1">
            <AppointmentForm
              service={selectedService}
              onSubmit={handleAppointmentSubmit}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
