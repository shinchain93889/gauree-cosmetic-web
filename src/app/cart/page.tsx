"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter as DialogFooterUI, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState } from "react";

export default function CartPage() {
  const { items, total, count, clear, removeItem, setQuantity } = useCart();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (count === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-headline text-center mb-12">Shopping Cart</h1>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Your Cart is Empty</CardTitle>
            <CardDescription>Looks like you haven't added anything to your cart yet.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-16">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground/50" />
            <Button asChild className="mt-8">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-headline text-center mb-12">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Items</CardTitle>
            <CardDescription>Review your selections and adjust quantities.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {items.map((item) => {
                const img = PlaceHolderImages.find((p) => p.id === item.imageId);
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    ) : (
                      <div className="w-20 h-20 bg-muted rounded" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={99}
                        value={item.quantity}
                        onChange={(e) => setQuantity(item.id, Number(e.target.value))}
                        className="w-20"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="w-24 text-right font-medium">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="ghost" onClick={clear}>Clear Cart</Button>
            <p className="text-sm text-muted-foreground">Subtotal shown on the right</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg">
              <span>Total</span>
              <span className="font-bold">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">Proceed to Checkout</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact & Shipping Details</DialogTitle>
                  <DialogDescription>We’ll use this to confirm your order.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jessica Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Beauty Lane, NY 10001" />
                  </div>
                </div>
                <DialogFooterUI>
                  <Button
                    onClick={() => {
                      // rudimentary validation
                      if (!name || !phone || !address) return;
                      // Optionally save to sessionStorage for the checkout page to read
                      try {
                        sessionStorage.setItem(
                          "gauree_checkout_details",
                          JSON.stringify({ name, phone, address })
                        );
                      } catch { }
                      setOpen(false);
                      // Navigate to /checkout
                      window.location.href = "/checkout";
                    }}
                    className="w-full"
                  >
                    Continue to Checkout
                  </Button>
                </DialogFooterUI>
              </DialogContent>
            </Dialog>
            <Button asChild variant="link" className="w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
