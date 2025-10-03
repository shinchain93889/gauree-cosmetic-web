import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function AccountPage() {
    const userImage = PlaceHolderImages.find(p => p.id === 'testimonial1');
  return (
    <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            {userImage && (
                <Avatar className="w-24 h-24">
                    <AvatarImage src={userImage.imageUrl} alt="User Name" data-ai-hint={userImage.imageHint} />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
            <div>
                <h1 className="text-4xl font-headline">My Account</h1>
                <p className="text-muted-foreground">Welcome back, Jessica!</p>
            </div>
            <div className="md:ml-auto">
                 <Button asChild variant="outline">
                    <Link href="/login">Log Out</Link>
                </Button>
            </div>
        </div>
      
        <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
                <Card>
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                        <CardDescription>You have not placed any orders yet.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center py-12">
                        <p className="text-muted-foreground mb-4">Ready to find your new favorite products?</p>
                        <Button asChild>
                            <Link href="/products">Start Shopping</Link>
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="appointments">
                <Card>
                    <CardHeader>
                        <CardTitle>Appointments</CardTitle>
                        <CardDescription>You have no upcoming appointments.</CardDescription>
                    </CardHeader>
                     <CardContent className="text-center py-12">
                        <p className="text-muted-foreground mb-4">Book a session with one of our talented artists.</p>
                        <Button asChild>
                            <Link href="/services">Book a Service</Link>
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="favorites">
                <Card>
                    <CardHeader>
                        <CardTitle>Favorite Products</CardTitle>
                        <CardDescription>Your saved products will appear here.</CardDescription>
                    </CardHeader>
                     <CardContent className="text-center py-12">
                        <p className="text-muted-foreground">You haven't saved any favorites yet.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
