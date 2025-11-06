import { motion } from "framer-motion";
import { Piano, BookOpen, Dumbbell, Music } from "lucide-react";
import { useState } from "react";

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
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const selectedClassData = classData.find(c => c.id === selectedClass);

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
            Click any class to see the sessions and topics covered throughout the semester
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {classData.map((classItem, idx) => {
            const IconComponent = classItem.icon;
            const isSelected = selectedClass === classItem.id;

            return (
              <motion.button
                key={classItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                onClick={() => setSelectedClass(isSelected ? null : classItem.id)}
                className={`
                  aspect-square rounded-lg border-2 p-6
                  flex flex-col items-center justify-center gap-4
                  transition-all duration-300 hover-elevate active-elevate-2
                  ${isSelected 
                    ? 'border-primary bg-primary/5 scale-105' 
                    : 'border-primary/30 bg-card'
                  }
                `}
                data-testid={`card-class-${classItem.id}`}
              >
                <IconComponent className={`w-12 h-12 md:w-16 md:h-16 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                <h3 className="font-serif text-lg md:text-xl font-bold text-center">
                  {classItem.title}
                </h3>
              </motion.button>
            );
          })}
        </div>

        {selectedClassData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="bg-muted/30 rounded-lg p-6 md:p-8 lg:p-10">
              <div className="flex justify-center">
                <div className="relative w-full max-w-3xl">
                  <div className="flex flex-col items-center gap-0">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-card border-2 border-primary rounded-lg px-8 py-4 shadow-md z-10 relative"
                      data-testid={`flowchart-header-${selectedClassData.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <selectedClassData.icon className="w-6 h-6 text-primary" />
                        <span className="font-serif text-xl md:text-2xl font-bold">
                          {selectedClassData.title}
                        </span>
                      </div>
                    </motion.div>

                    <div className="w-0.5 h-12 bg-primary/40" />

                    <div className="w-full space-y-0">
                      {selectedClassData.sessions.map((session, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.08 }}
                          className="flex items-center gap-0"
                          data-testid={`session-${selectedClassData.id}-${idx}`}
                        >
                          <div className="flex items-center">
                            <div className="w-0.5 h-12 bg-primary/40" />
                            <div className="w-12 md:w-16 h-0.5 bg-primary/40" />
                          </div>

                          <div 
                            className="bg-primary/10 border-2 border-primary/40 px-6 py-3 shadow-sm relative"
                            style={{
                              transform: 'skewX(-10deg)',
                              minWidth: '200px',
                              maxWidth: '400px'
                            }}
                          >
                            <p 
                              className="text-sm md:text-base font-medium text-foreground"
                              style={{ transform: 'skewX(10deg)' }}
                            >
                              {session}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
