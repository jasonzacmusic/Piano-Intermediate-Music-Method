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
          className="max-w-7xl mx-auto"
        >
          <Accordion type="multiple" className="space-y-8 md:space-y-12">
            {classData.map((classItem) => {
              const IconComponent = classItem.icon;
              return (
                <AccordionItem
                  key={classItem.id}
                  value={classItem.id}
                  className="border-none"
                  data-testid={`accordion-${classItem.id}`}
                >
                  <AccordionTrigger 
                    className="border rounded-lg bg-card px-4 md:px-6 py-4 hover:no-underline hover-elevate mb-6"
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
                  <AccordionContent>
                    <div className="md:hidden flex flex-col gap-4 py-4">
                      {classItem.sessions.map((session, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          data-testid={`session-${classItem.id}-${idx}`}
                        >
                          <div className="bg-muted/50 border-2 border-primary/40 rounded-full px-4 py-3 shadow-sm">
                            <p className="text-center text-sm font-medium text-foreground">
                              {session}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="hidden md:flex justify-center py-12">
                      <div className="relative w-full max-w-2xl aspect-square">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="border-2 border-primary bg-card rounded-lg px-6 py-4 shadow-lg"
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-6 h-6 text-primary" />
                              <span className="font-serif text-xl font-bold text-foreground whitespace-nowrap">
                                {classItem.title}
                              </span>
                            </div>
                          </motion.div>
                        </div>

                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {classItem.sessions.map((_, idx) => {
                          const total = classItem.sessions.length;
                          const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
                          const radius = 35;
                          const centerX = 50;
                          const centerY = 50;
                          const endX = centerX + radius * Math.cos(angle);
                          const endY = centerY + radius * Math.sin(angle);
                          
                          return (
                            <line
                              key={idx}
                              x1={centerX}
                              y1={centerY}
                              x2={endX}
                              y2={endY}
                              stroke="hsl(var(--primary))"
                              strokeWidth="0.4"
                              opacity="0.4"
                            />
                          );
                        })}
                      </svg>

                      {classItem.sessions.map((session, idx) => {
                        const total = classItem.sessions.length;
                        const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
                        const radius = 35;
                        const centerX = 50;
                        const centerY = 50;
                        const bubbleX = centerX + radius * Math.cos(angle);
                        const bubbleY = centerY + radius * Math.sin(angle);
                        
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.08 }}
                            className="absolute"
                            style={{
                              left: `${bubbleX}%`,
                              top: `${bubbleY}%`,
                              transform: 'translate(-50%, -50%)',
                            }}
                            data-testid={`session-${classItem.id}-${idx}`}
                          >
                            <div className="bg-muted/50 border-2 border-primary/40 rounded-full px-4 py-3 shadow-sm whitespace-nowrap min-w-32 max-w-48">
                              <p className="text-center text-sm font-medium text-foreground">
                                {session}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                      </div>
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
