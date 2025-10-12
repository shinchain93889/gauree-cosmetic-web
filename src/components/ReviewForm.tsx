'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

interface ReviewFormProps {
    productId: string;
    onSubmit: (review: {
        rating: number;
        userName: string;
        comment: string;
    }) => void;
}

export function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        onSubmit({
            rating,
            userName,
            comment,
        });

        // Reset form
        setRating(0);
        setUserName("");
        setComment("");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                className="p-1"
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoverRating(value)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <Star
                                    className={`h-6 w-6 ${value <= (hoverRating || rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-muted-foreground"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <Input
                            placeholder="Your Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Write your review here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={rating === 0 || !userName.trim() || !comment.trim()}
                    >
                        Submit Review
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}