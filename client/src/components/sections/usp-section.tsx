import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface USP {
  icon: string;
  title: string;
  description: string;
}

interface USPSectionProps {
  data: USP[];
}

export function USPSection({ data }: USPSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Gradient variations for each card
  const cardGradients = [
    "bg-gradient-to-br from-primary/5 via-card to-card",
    "bg-gradient-to-br from-accent/8 via-card to-card",
    "bg-gradient-to-br from-primary/8 via-accent/5 to-card",
    "bg-gradient-to-br from-card via-primary/5 to-accent/8",
    "bg-gradient-to-br from-accent/5 via-card to-primary/5",
    "bg-gradient-to-br from-primary/6 via-card to-accent/6",
    "bg-gradient-to-br from-card via-accent/6 to-primary/8",
    "bg-gradient-to-br from-accent/6 via-primary/5 to-card",
    "bg-gradient-to-br from-primary/7 via-accent/4 to-card",
  ];

  return (
    <section id="features" className="py-8 md:py-12 lg:py-14 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Why We're Different
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive approach that sets you up for real-world music performance
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {data.map((usp, index) => {
            const IconComponent = (Icons[usp.icon as keyof typeof Icons] || Icons.Music) as LucideIcon;
            const gradientClass = cardGradients[index % cardGradients.length];

            return (
              <motion.div key={index} variants={item}>
                <Card 
                  className={`p-6 md:p-8 h-full hover-elevate transition-all duration-300 border-primary/10 ${gradientClass}`}
                  data-testid={`card-usp-${index}`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/20 border border-primary/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    
                    <h3 className="font-serif text-xl md:text-2xl font-semibold">
                      {usp.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {usp.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
