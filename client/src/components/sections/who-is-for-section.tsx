import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface WhoIsForItem {
  icon: string;
  title: string;
  description: string;
}

interface WhoIsForSectionProps {
  data: WhoIsForItem[];
}

export function WhoIsForSection({ data }: WhoIsForSectionProps) {
  return (
    <section id="who-is-for" className="py-8 md:py-12 lg:py-14 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Who Is This Course For?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            For intermediate to advanced students ready to become complete musicians
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {data.map((item, index) => {
            const IconComponent = (Icons[item.icon as keyof typeof Icons] || Icons.Music) as LucideIcon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="p-6 md:p-8 text-center hover-elevate transition-all h-full"
                  data-testid={`card-who-${index}`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-accent/30 flex items-center justify-center">
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-accent-foreground" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
