"use client";

import { useState, useEffect } from "react";

interface HeroCarouselProps {
    slides: {
        image: string;
        title?: string;
        subtitle?: string;
    }[];
    autoPlayInterval?: number;
}

export default function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, autoPlayInterval);
        return () => clearInterval(timer);
    }, [slides.length, autoPlayInterval]);

    const goTo = (index: number) => setCurrent(index);
    const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
    const next = () => setCurrent((current + 1) % slides.length);

    return (
        <div className="relative w-full h-[calc(100vh-120px)] mt-[120px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title || `Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {(slide.title || slide.subtitle) && (
                        <div className="absolute bottom-16 left-0 right-0 text-center text-white px-4">
                            {slide.title && (
                                <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">{slide.title}</h2>
                            )}
                            {slide.subtitle && (
                                <p className="text-lg md:text-xl opacity-90 drop-shadow-md max-w-2xl mx-auto">
                                    {slide.subtitle}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
