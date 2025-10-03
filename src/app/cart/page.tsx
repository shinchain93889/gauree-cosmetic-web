import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";


export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-headline text-center mb-12">
        Shopping Cart
      </h1>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle>Your Cart is Empty</CardTitle>
            <CardDescription>Looks like you haven't added anything to your cart yet.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground/50" />
            <Button asChild className="mt-8">
                <Link href="/products">
                    Continue Shopping
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
