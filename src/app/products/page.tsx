import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/data";
import { useMemo, useState } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['All', ...cats];
  }, []);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery = query.trim() === '' || p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-headline text-center mb-12">
          Our Products
        </h1>
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm text-muted-foreground">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border px-3 py-2 bg-background">
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by name or description"
              className="rounded-md border px-3 py-2 w-72 bg-background"
            />
            <Button variant="ghost" onClick={() => { setQuery(''); setCategory('All'); }}>Clear</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => {
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
