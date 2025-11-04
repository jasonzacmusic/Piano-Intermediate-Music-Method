import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee, DollarSign, Euro, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Package {
  hours: number;
  inr: number;
  eur: number;
  usd: number;
}

const PACKAGES: Package[] = [
  { hours: 32, inr: 20000, eur: 380, usd: 420 },
  { hours: 40, inr: 22500, eur: 430, usd: 480 },
  { hours: 50, inr: 27500, eur: 500, usd: 550 },
  { hours: 65, inr: 35000, eur: 600, usd: 700 },
];

interface FeesSectionProps {
  userRegion: "domestic" | "europe" | "international";
}

export function FeesSection({ userRegion }: FeesSectionProps) {
  const getCurrencyIcon = () => {
    switch (userRegion) {
      case "domestic":
        return IndianRupee;
      case "europe":
        return Euro;
      default:
        return DollarSign;
    }
  };

  const getCurrencySymbol = () => {
    switch (userRegion) {
      case "domestic":
        return "₹";
      case "europe":
        return "€";
      default:
        return "$";
    }
  };

  const getPrice = (pkg: Package) => {
    switch (userRegion) {
      case "domestic":
        return pkg.inr.toLocaleString();
      case "europe":
        return pkg.eur.toLocaleString();
      default:
        return pkg.usd.toLocaleString();
    }
  };

  const CurrencyIcon = getCurrencyIcon();

  return (
    <section className="py-8 md:py-12 lg:py-14 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Course Fees
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the package that fits your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.hours}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-primary/20 hover-elevate">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="font-serif text-2xl md:text-3xl font-bold text-primary">
                    {pkg.hours} Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex items-baseline justify-center gap-2">
                    <CurrencyIcon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    <div className="font-serif text-3xl md:text-4xl font-bold">
                      {getPrice(pkg)}
                    </div>
                  </div>
                  {userRegion === "domestic" && (
                    <p className="text-xs text-muted-foreground">(+GST)</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Button
            size="lg"
            className="w-full text-base md:text-lg py-6 min-h-14"
            onClick={() => window.open('https://wa.me/917760456847', '_blank')}
            data-testid="button-whatsapp-fees"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
