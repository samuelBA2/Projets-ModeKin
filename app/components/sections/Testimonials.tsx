import { Star } from "lucide-react";
import { testimonials } from "~/data/testimonials";
import { Card } from "~/components/ui/Card";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Reveal } from "./Reveal";

const MAX_RATING = 5;

/** Note en étoiles : chaque étoile est décorative, la note réelle est portée par l'`aria-label` du groupe. */
function Rating({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`Note : ${rating} sur ${MAX_RATING}`} className="flex gap-0.5">
      {Array.from({ length: MAX_RATING }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={i < rating ? "size-4 fill-gold text-gold" : "size-4 fill-none text-border"}
        />
      ))}
    </div>
  );
}

/** Grille d'avis clients (nom, ville, texte, note). */
export function Testimonials() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading title="Ce que disent nos clients" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.05}>
              <Card className="flex h-full flex-col gap-3">
                <Rating rating={testimonial.rating} />
                <p className="flex-1 text-sm text-ink/80">« {testimonial.text} »</p>
                <div>
                  <p className="font-medium text-navy">{testimonial.name}</p>
                  <p className="text-sm text-ink/60">{testimonial.city}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
