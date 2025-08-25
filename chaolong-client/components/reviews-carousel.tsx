"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Khanh",
    rating: 5,
    review:
      "The most authentic Vietnamese porridge I've had outside of Vietnam! The broth is rich and flavorful, and you can taste the love in every spoon.",
    avatar: "/customer/khanh.png",
  },
  {
    id: 2,
    name: "Duy Le",
    rating: 5,
    review:
      "A hidden gem! The family recipes and warm atmosphere make this place special. The porridge reminds me of my grandmother's cooking.",
    avatar: "/customer/duyle.jpg",
  },
  {
    id: 3,
    name: "Minh Quan",
    rating: 5,
    review:
      "Incredible comfort food! The staff treats you like family, and the porridge is absolutely delicious. I come here every week now.",
    avatar: "/customer/minhquan.jpg",
  },
  {
    id: 4,
    name: "Quach Khang",
    rating: 5,
    review:
      "Outstanding quality and authentic flavors. This restaurant brings back memories of street food in Saigon. Highly recommended!",
    avatar: "/customer/quachkhang.jpg",
  },
  {
    id: 5,
    name: "Sinl",
    rating: 5,
    review:
      "The perfect blend of tradition and taste. Every visit feels like coming home to a warm, welcoming family meal.",
    avatar: "/customer/sinl.jpg",
  },
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-accent text-accent" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="font-sans text-base sm:text-lg max-w-2xl mx-auto text-muted-foreground px-2 sm:px-0">
            Don&apos;t just take our word for it - hear from the families and
            food lovers who make our restaurant their home away from home.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full flex-shrink-0 px-2 sm:px-4"
              >
                <Card className="max-w-2xl mx-auto bg-background border-border">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover flex-shrink-0"
                        width={48}
                        height={48}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-sans font-semibold text-foreground text-sm sm:text-base truncate">
                          {review.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="font-sans leading-relaxed text-sm sm:text-base lg:text-lg italic text-muted-foreground">
                      &apos;{review.review}&apos;
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors touch-manipulation ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
