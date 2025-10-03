import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">Contact Us</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, services, or anything else, our team is ready to answer all your questions.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Question about..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
            <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                    <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Mail className="w-6 h-6"/>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl">Email</h3>
                        <p className="text-muted-foreground">General Inquiries</p>
                        <a href="mailto:contact@gauree.com" className="text-primary hover:underline">contact@gauree.com</a>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                    <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Phone className="w-6 h-6"/>
                    </div>
                     <div>
                        <h3 className="font-headline text-xl">Phone</h3>
                        <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                        <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6 flex items-start gap-4">
                    <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <MapPin className="w-6 h-6"/>
                    </div>
                     <div>
                        <h3 className="font-headline text-xl">Our Studio</h3>
                        <p className="text-muted-foreground">123 Beauty Lane,</p>
                        <p className="text-muted-foreground">New York, NY 10001</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
