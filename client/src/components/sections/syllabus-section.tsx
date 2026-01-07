import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface SyllabusItem {
  title: string;
  icon: string;
  items: string[];
}

interface SyllabusSectionProps {
  data: {
    [key: string]: SyllabusItem;
  };
}

export function SyllabusSection({ data }: SyllabusSectionProps) {
  const syllabusItems = Object.values(data);

  // Gradient variations for syllabus cards
  const syllabusGradients = [
    "bg-gradient-to-br from-primary/8 via-card to-card",
    "bg-gradient-to-br from-accent/10 via-card to-card",
    "bg-gradient-to-br from-primary/10 via-accent/6 to-card",
    "bg-gradient-to-br from-accent/8 via-primary/6 to-card",
  ];

  return (
    <section id="syllabus" className="py-8 md:py-12 lg:py-14 bg-accent/5">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            What You'll Learn
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete musical education covering all essential skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {syllabusItems.map((section, index) => {
            const IconComponent = (Icons[section.icon as keyof typeof Icons] || Icons.Music) as LucideIcon;
            const gradientClass = syllabusGradients[index % syllabusGradients.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className={`p-6 md:p-8 h-full border-l-4 border-l-primary ${gradientClass}`}
                  data-testid={`card-syllabus-${index}`}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/20 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl font-semibold">
                        {section.title}
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-muted-foreground"
                          data-testid={`text-syllabus-item-${index}-${itemIndex}`}
                        >
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
