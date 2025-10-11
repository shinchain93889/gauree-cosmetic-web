'use client';

import { Review } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, SortAsc, SortDesc } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ReviewsDisplayProps {
    reviews: Review[];
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

export function ReviewsDisplay({ reviews }: ReviewsDisplayProps) {
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [filterRating, setFilterRating] = useState<string>('all');
    if (reviews.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                </CardContent>
            </Card>
        );
    }

    // Filter and sort reviews
    const filteredAndSortedReviews = useMemo(() => {
        let result = [...reviews];

        // Filter by rating
        if (filterRating !== 'all') {
            result = result.filter(review => review.rating === parseInt(filterRating));
        }

        // Sort reviews
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
            case 'highest':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'lowest':
                result.sort((a, b) => a.rating - b.rating);
                break;
        }

        return result;
    }, [reviews, sortBy, filterRating]);

    // Calculate average rating
    const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    // Calculate rating distribution
    const ratingCounts = useMemo(() => {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            counts[review.rating as keyof typeof counts]++;
        });
        return counts;
    }, [reviews]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        Reviews
                        <span className="text-sm font-normal text-muted-foreground">
                            ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Sort by..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                                <SelectItem value="highest">Highest Rated</SelectItem>
                                <SelectItem value="lowest">Lowest Rated</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardTitle>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex items-center gap-2">
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
                        <span className="text-lg font-semibold">{avgRating.toFixed(1)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={filterRating === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterRating('all')}
                        >
                            All ({reviews.length})
                        </Button>
                        {[5, 4, 3, 2, 1].map((rating) => (
                            <Button
                                key={rating}
                                variant={filterRating === rating.toString() ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterRating(rating.toString())}
                            >
                                {rating} ★ ({ratingCounts[rating as keyof typeof ratingCounts]})
                            </Button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredAndSortedReviews.map((review) => (
                    <div key={review.id} className="space-y-2 border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Star
                                        key={value}
                                        className={`h-4 w-4 ${value <= review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="font-medium">{review.userName}</span>
                            <span className="text-sm text-muted-foreground">
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}