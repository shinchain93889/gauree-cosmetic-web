import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-headline text-center mb-12">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const productImage = PlaceHolderImages.find(
              (p) => p.id === product.imageId
            );
            return (
              <Card
                key={product.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardContent className="p-0">
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
                  <div className="p-4">
                    <h3 className="font-headline text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <AddToCartButton product={product} size="sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
