import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  teaser: string;
  quote: string;
}

interface TestimonialsSectionProps {
  data: Testimonial[];
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="testimonials" className="py-8 md:py-12 lg:py-14 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Student Success Stories
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear From Our Students About Their Piano Journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {data.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card 
                className="p-5 hover-elevate transition-all cursor-pointer"
                onClick={() => toggleExpand(index)}
                data-testid={`card-testimonial-${index}`}
              >
                <div className="space-y-3">
                  {/* Name and Role - Always Visible */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base truncate">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="flex-shrink-0 text-primary">
                      {expandedIndex === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </div>

                  {/* Teaser - Always Visible */}
                  <p className="text-sm italic text-muted-foreground line-clamp-2">
                    "{testimonial.teaser}"
                  </p>

                  {/* Full Quote - Expandable */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-border">
                          <p className="text-sm leading-relaxed">
                            "{testimonial.quote}"
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
