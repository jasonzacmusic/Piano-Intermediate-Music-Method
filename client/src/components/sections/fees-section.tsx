import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee, DollarSign, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FeesData {
  domestic: {
    region: string[];
    amount: string;
    note: string;
  };
  international: {
    region: string;
    amount: string;
    note: string;
  };
}

interface FeesSectionProps {
  data: FeesData;
  userRegion: "domestic" | "international";
}

export function FeesSection({ data, userRegion }: FeesSectionProps) {
  const currentFee = userRegion === "domestic" ? data.domestic : data.international;
  const isDomestic = userRegion === "domestic";

  return (
    <section className="py-8 md:py-12 lg:py-14 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Course Fees
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional training at an accessible investment
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 md:p-12 border-2 border-primary/30 bg-primary/5">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-2 mb-4">
                  {isDomestic ? (
                    <>
                      <IndianRupee className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                      <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
                        20,000
                      </div>
                      <span className="text-xs md:text-sm text-muted-foreground">(+GST)</span>
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                      <div className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
                        420
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full text-base md:text-lg py-6 min-h-14"
                  onClick={() => window.open('https://wa.me/917760456847', '_blank')}
                  data-testid="button-whatsapp-fees"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
