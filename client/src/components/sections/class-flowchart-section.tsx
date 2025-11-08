import { motion, AnimatePresence } from "framer-motion";
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
    <div className="w-full max-w-6xl mx-auto">
      {/* Mobile: Show instruction text at top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: selectedClass ? 0 : 1, y: selectedClass ? -20 : 0 }}
        transition={{ duration: 0.4 }}
        className="lg:hidden text-center mb-6"
      >
        <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 shadow-lg">
          <p className="text-lg md:text-xl font-serif font-bold text-primary">
            Click any class to see the sessions covered throughout the semester
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:w-80 flex-shrink-0">
          {classData.map((classItem, idx) => {
            const IconComponent = classItem.icon;
            const isSelected = selectedClass === classItem.id;

            return (
              <motion.button
                key={classItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  initial: { delay: 0.5 + idx * 0.08, duration: 0.4 },
                  whileHover: { duration: 0.2 },
                  whileTap: { duration: 0.1 }
                }}
                onClick={() => setSelectedClass(isSelected ? null : classItem.id)}
                className={`
                  aspect-square rounded-lg border-2 p-4
                  flex flex-col items-center justify-center gap-3
                  transition-all duration-300 hover-elevate active-elevate-2
                  ${isSelected 
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                    : 'border-primary/30 bg-card hover:border-primary/50'
                  }
                `}
                data-testid={`card-class-${classItem.id}`}
              >
                <motion.div
                  animate={isSelected ? { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                </motion.div>
                <h3 className="font-serif text-sm md:text-base font-bold text-center leading-tight">
                  {classItem.title}
                </h3>
              </motion.button>
            );
          })}
        </div>

        {/* Right Panel: Instruction Text OR Flowchart */}
        <div className="flex-1 min-h-[300px] lg:min-h-[400px] relative">
          <AnimatePresence mode="wait">
            {!selectedClass ? (
              // Desktop: Show instruction text when no card is selected
              <motion.div
                key="instruction"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="hidden lg:flex h-full items-center justify-center"
              >
                <div className="bg-primary/10 border-2 border-primary rounded-lg p-8 shadow-xl max-w-md">
                  <motion.p 
                    className="text-2xl font-serif font-bold text-primary text-center leading-relaxed"
                    animate={{ 
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    Click any class to see the sessions covered throughout the semester
                  </motion.p>
                </div>
              </motion.div>
            ) : selectedClassData ? (
              // Show flowchart when a card is selected
              <motion.div
                key={selectedClassData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <div className="bg-muted/30 rounded-lg p-4 md:p-6 h-full">
                  <div className="flex flex-col items-center md:items-start gap-0 h-full">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-card border-2 border-primary rounded-lg px-6 py-3 shadow-md z-10 relative mb-2"
                      data-testid={`flowchart-header-${selectedClassData.id}`}
                    >
                      <div className="flex items-center gap-3">
                        {(() => {
                          const SelectedIcon = selectedClassData.icon;
                          return <SelectedIcon className="w-5 h-5 text-primary" />;
                        })()}
                        <span className="font-serif text-lg md:text-xl font-bold">
                          {selectedClassData.title}
                        </span>
                      </div>
                    </motion.div>

                    <div className="w-0.5 h-8 bg-primary/40 ml-16 md:ml-20" />

                    <div className="w-full space-y-0">
                      {selectedClassData.sessions.map((session, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + idx * 0.06 }}
                          className="flex items-center gap-0"
                          data-testid={`session-${selectedClassData.id}-${idx}`}
                        >
                          <div className="flex items-center flex-shrink-0">
                            <div className="w-0.5 h-8 bg-primary/40" />
                            <div className="w-10 md:w-12 h-0.5 bg-primary/40" />
                          </div>

                          <div 
                            className="bg-primary/10 border-2 border-primary/40 px-4 py-2 shadow-sm relative flex-1"
                            style={{
                              transform: 'skewX(-10deg)',
                              maxWidth: '350px'
                            }}
                          >
                            <p 
                              className="text-xs md:text-sm font-medium text-foreground"
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
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
