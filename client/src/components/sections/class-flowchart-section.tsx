import { motion } from "framer-motion";
import { Piano, BookOpen, Dumbbell, Music, ArrowDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ClassFlowchartData {
  id: string;
  title: string;
  icon: any;
  sessions: string[];
}

const classData: ClassFlowchartData[] = [
  {
    id: "modular-piano",
    title: "Modular Piano",
    icon: Piano,
    sessions: [
      "Surprise",
      "Gospel Piano",
      "Roots Genre",
      "Bollywood",
      "Regional (South Indian)",
      "Jazz Piano & Standards",
      "Western Pop",
      "Rock",
      "Western Classical",
      "Exercise"
    ]
  },
  {
    id: "theory",
    title: "Theory",
    icon: BookOpen,
    sessions: [
      "Chord Theory",
      "Scales, Intervals and Modes",
      "Ear Training"
    ]
  },
  {
    id: "music-gym",
    title: "Music Gym",
    icon: Dumbbell,
    sessions: [
      "Exercises",
      "Sight Singing",
      "Rhythm Training"
    ]
  },
  {
    id: "music-factory",
    title: "Music Factory",
    icon: Music,
    sessions: [
      "Song Transcription",
      "Music Production",
      "Improvisation and Composition",
      "Jamming Session"
    ]
  }
];

export function ClassFlowchartSection() {
  return (
    <section className="py-8 md:py-12 lg:py-14 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10 space-y-3"
        >
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            What's Covered in Each Class
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Expand any class to see the sessions and topics covered throughout the semester
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Accordion type="multiple" className="space-y-4">
            {classData.map((classItem, index) => {
              const IconComponent = classItem.icon;
              return (
                <AccordionItem
                  key={classItem.id}
                  value={classItem.id}
                  className="border rounded-lg bg-card overflow-hidden"
                  data-testid={`accordion-${classItem.id}`}
                >
                  <AccordionTrigger 
                    className="px-4 md:px-6 py-4 hover:no-underline hover-elevate"
                    data-testid={`button-expand-${classItem.id}`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <span className="font-serif text-lg md:text-xl font-semibold text-left">
                        {classItem.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 md:px-6 pb-6">
                    <div className="pt-4 flex flex-col items-center max-w-2xl mx-auto">
                      {classItem.sessions.map((session, sessionIndex) => (
                        <div key={sessionIndex} className="w-full">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sessionIndex * 0.08 }}
                            className="w-full"
                          >
                            <div 
                              className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-muted/50 border-2 border-primary/30 shadow-sm"
                              data-testid={`session-${classItem.id}-${sessionIndex}`}
                            >
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary">
                                  {sessionIndex + 1}
                                </span>
                              </div>
                              <span className="text-sm md:text-base font-medium text-foreground">
                                {session}
                              </span>
                            </div>
                          </motion.div>
                          
                          {sessionIndex < classItem.sessions.length - 1 && (
                            <div className="flex justify-center py-2">
                              <ArrowDown className="w-5 h-5 text-primary/60" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
