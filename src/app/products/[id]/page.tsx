'use client';

import { products } from "@/lib/data";
import { reviews } from "@/lib/reviews";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsDisplay } from "@/components/ReviewsDisplay";
import AddToCartButton from "@/components/AddToCartButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { useState, use } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find(p => p.id === id);
    const [productReviews, setProductReviews] = useState(
        reviews.filter(r => r.productId === id)
    );

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16">
                <Card className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
                    <Button asChild>
                        <Link href="/products">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Products
                        </Link>
                    </Button>
                </Card>
            </div>
        );
    }

    const productImage = PlaceHolderImages.find(p => p.id === product.imageId);
    const avgRating = productReviews.length > 0
        ? productReviews.reduce((acc, rev) => acc + rev.rating, 0) / productReviews.length
        : 0;

    const handleReviewSubmit = (review: {
        rating: number;
        userName: string;
        comment: string;
    }) => {
        const newReview = {
            id: `rev${Date.now()}`,
            productId: product.id,
            ...review,
            date: new Date().toISOString(),
        };
        setProductReviews(prev => [...prev, newReview]);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Link>
            </Button>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="relative aspect-square">
                    {productImage && (
                        <Image
                            src={productImage.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                            data-ai-hint={productImage.imageHint}
                        />
                    )}
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-headline mb-2">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Star
                                        key={value}
                                        className={`h-5 w-5 ${value <= avgRating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground">
                                ({productReviews.length} {productReviews.length === 1 ? "review" : "reviews"})
                            </span>
                        </div>
                        <p className="text-muted-foreground">{product.description}</p>
                    </div>

                    <div>
                        <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="w-full md:w-auto">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <ReviewsDisplay reviews={productReviews} />
                <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />
            </div>
        </div>
    );
}