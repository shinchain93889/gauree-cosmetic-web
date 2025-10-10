"use client";

import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag } from "lucide-react";

export default function AddToCartButton({ product, size = "default" as const, variant = "outline" as const }: { product: Product; size?: "default" | "sm" | "lg"; variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" }) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const onAdd = () => {
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button onClick={onAdd} size={size} variant={variant} aria-label={`Add ${product.name} to cart`}>
      <ShoppingBag className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
