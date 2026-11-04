import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { googleMapsReviewsUrl } from "@/lib/googleMaps";
import { googleReviews } from "@/data/googleReviewsData";

function GoogleWordmark() {
  return (
    <span aria-label="Google" className="inline-flex font-sans text-xl font-semibold tracking-tight">
      <span className="text-[#4285f4]">G</span>
      <span className="text-[#ea4335]">o</span>
      <span className="text-[#fbbc05]">o</span>
      <span className="text-[#4285f4]">g</span>
      <span className="text-[#34a853]">l</span>
      <span className="text-[#ea4335]">e</span>
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1 text-[#fbbc04]"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "currentColor" : "none"}
          strokeWidth={index < rating ? 0 : 1.5}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  const [carouselRef, carouselApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateCarouselState = useCallback(() => {
    if (!carouselApi) return;
    setSelectedIndex(carouselApi.selectedScrollSnap());
    setSnapCount(carouselApi.scrollSnapList().length);
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    updateCarouselState();
    carouselApi.on("select", updateCarouselState);
    carouselApi.on("reInit", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
      carouselApi.off("reInit", updateCarouselState);
    };
  }, [carouselApi, updateCarouselState]);

  return (
    <section
      aria-labelledby="google-reviews-heading"
      className="overflow-hidden bg-warm-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <SectionLabel>Google Reviews</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                id="google-reviews-heading"
                className="mt-6 font-display text-4xl leading-[1.05] text-charcoal md:text-6xl"
              >
                Loved by our <em className="text-gradient-gold">clients.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Real words from clients who trusted us with their homes.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <a
              href={googleMapsReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-charcoal px-6 py-4 text-xs uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-warm-white"
            >
              Read all reviews on Google
              <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </div>

        <div
          className="mt-12 overflow-hidden"
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Google customer reviews"
        >
          <div className="-ml-5 flex touch-pan-y">
            {googleReviews.map((review) => (
              <div
                key={`${review.name}-${review.date}`}
                className="min-w-0 shrink-0 grow-0 basis-full pl-5 sm:basis-1/2 xl:basis-1/3"
                role="group"
                aria-roledescription="slide"
              >
                <article className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-2xl border border-[#e9e1d3] bg-white p-6 shadow-[0_12px_35px_rgba(47,39,26,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d8c49d] hover:shadow-[0_22px_50px_rgba(47,39,26,0.12)] sm:p-7">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c5a46d] via-[#f2dfb6] to-[#c5a46d]" />

                  <div className="flex items-center justify-between gap-4">
                    <GoogleWordmark />
                    <span className="rounded-full bg-[#f8f6f1] px-3 py-1.5 text-[11px] font-medium text-muted-foreground">
                      {review.date}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <div className="rounded-full bg-[#fff8e8] px-3 py-2">
                      <StarRating rating={review.rating} />
                    </div>
                    <span className="text-xs font-semibold text-charcoal">{review.rating}.0</span>
                  </div>

                  <div className="relative mt-5 flex-1 rounded-xl bg-[#faf8f3] p-5">
                    <span
                      className="mb-1 block font-display text-4xl leading-none text-[#c5a46d]/70"
                      aria-hidden="true"
                    >
                      “
                    </span>
                    <p className="line-clamp-7 whitespace-pre-line text-sm leading-7 text-charcoal/80">
                      {review.text}
                    </p>
                  </div>

                  <a
                    href={googleMapsReviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-1 text-xs font-semibold text-charcoal/60 transition-colors hover:text-[#a47b3c]"
                    aria-label={`Read ${review.name}'s review on Google`}
                  >
                    Read on Google <ArrowUpRight size={13} />
                  </a>

                  <div className="mt-5 flex items-center gap-3 border-t border-[#eee9df] pt-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d6bd8b] to-[#a9874f] text-sm font-semibold text-white shadow-sm"
                      aria-hidden="true"
                    >
                      {review.name.charAt(0)}
                    </span>
                    <div>
                      <span className="block text-sm font-semibold text-charcoal">{review.name}</span>
                      <span className="mt-0.5 block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Google review
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => carouselApi?.scrollPrev()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex justify-center gap-2" aria-label="Choose a review">
            {Array.from({ length: snapCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => carouselApi?.scrollTo(index)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  index === selectedIndex
                    ? "w-8 bg-charcoal"
                    : "w-2.5 bg-border hover:bg-charcoal/50"
                }`}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => carouselApi?.scrollNext()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-warm-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Next reviews"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
