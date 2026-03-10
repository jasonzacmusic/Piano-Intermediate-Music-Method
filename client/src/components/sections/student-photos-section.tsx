import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function StudentPhotosSection() {
  const photos = [
    {
      src: "/images/student-playing-2.jpg",
      alt: "Student learning piano in class",
      orientation: "left"
    },
    {
      src: "/images/student-3.jpg",
      alt: "Young student with headphones at keyboard",
      orientation: "right"
    },
    {
      src: "/images/student-9.jpg",
      alt: "Student performing at keyboard",
      orientation: "left"
    },
    {
      src: "/images/student-4.jpg",
      alt: "Band ensemble with keyboard player",
      orientation: "right"
    },
    {
      src: "/images/student-7.jpg",
      alt: "Student practicing piano technique",
      orientation: "center"
    },
    {
      src: "/images/student-playing-1.jpg",
      alt: "Student performing at piano",
      orientation: "right"
    },
    {
      src: "/images/student-8.jpg",
      alt: "Experienced student at keyboard",
      orientation: "center"
    },
    {
      src: "/images/student-5.jpg",
      alt: "Advanced student performing",
      orientation: "right"
    },
    {
      src: "/images/student-6.jpg",
      alt: "Adult learner at piano",
      orientation: "right"
    }
  ];

  // Massive pool of 150+ course highlights for intermediate/advanced
  const allHighlights = [
    // USPs & Core Features (18)
    "Music Factory: Deep song transcription & analysis",
    "Music Gym: 3D exercises for ears, technique & theory",
    "Modular learning pathways tailored to your goals",
    "Graded certification recognized internationally",
    "From Foundation graduate to performing musician",
    "Learn from 115k+ YouTube educator Jason Zachariah",
    "15k+ Instagram community of advanced learners",
    "Three albums worth of musical influences shared",
    "Multi-instrumentalist teacher: piano, bass, horns & more",
    "Live online, offline Bangalore, or hybrid modes",
    "HD recordings plus handwritten notes every class",
    "Weekly assignments with personalized feedback",
    "Custom-made teaching style for every student level",
    "Result-oriented methods lauded in music circles",
    "Interactive, engaging & flexible to your needs",
    "Learn piano, theory, composition & ear training together",
    "Production, arrangement & recording insights included",
    "Structured like a professional music conservatory",
    
    // Student Testimonials (20)
    "Jason's teaching transformed me from hobbyist to musician",
    "The Music Factory approach makes everything click",
    "Finally understand WHY composers chose those chords",
    "Music Gym exercises built my skills in 3 dimensions",
    "Transcribing real songs unlocked my musical ear",
    "Jason makes advanced concepts feel approachable",
    "From Foundation graduate to confident performer",
    "Custom teaching style adapted perfectly to my level",
    "Discovered Jason's 115k subscriber YouTube channel first",
    "WhatsApp group support keeps me accountable weekly",
    "Jason's multi-instrumental expertise shows in lessons",
    "Modular pathways let me focus on what I need most",
    "Outstanding musicianship development, not just technique",
    "Interactive workshops are engaging and result-oriented",
    "Love analyzing real songs to understand structure",
    "Handwritten notes plus HD recordings are invaluable",
    "Graded certification motivated me to push harder",
    "Teachers blend theory with practical performance skills",
    "Curriculum respects my musical intelligence",
    "Space to learn AND improvise above and beyond",
    
    // Advanced Piano Skills (18)
    "Master quartal harmony and modern voicings",
    "Advanced chord inversions and drop voicings",
    "Left-hand arpeggios with octaves & spread voicings",
    "Use 'wrong' notes creatively with interval magic",
    "Five essential piano techniques for fills & solos",
    "Advanced blues & pentatonic application over changes",
    "Arpeggios over all beat divisions for fluency",
    "Voice leading for smooth chord transitions",
    "Play melody and chords with one hand techniques",
    "Polyrhythms and odd time signatures made simple",
    "Left-hand independence training for complex music",
    "Advanced pedal control and flow techniques",
    "Modal playing and chord substitution mastery",
    "Open, closed & drop 2 voicing structures",
    "Build melodies over complex harmonic changes",
    "Extended chords: 9ths, 11ths, 13ths explored",
    "Secondary dominants and modal interchange",
    "Reharmonization and arrangement techniques",
    
    // Advanced Theory (18)
    "Chord progressions that changed music forever",
    "Voice leading principles for every musician",
    "Functional harmony: how chords truly relate",
    "Modal interchange for unexpected colors",
    "Circle of fifths for smooth modulation",
    "Barry Harris 6-diminished concept explained",
    "Building chord progressions using modes",
    "Harmonic minor & jazz minor in real music",
    "Rhythm subdivision & syncopation mastery",
    "The science of groove and feel",
    "Chord substitution ideas for richer harmony",
    "Understanding secondary dominants deeply",
    "Quartal chords in modern compositions",
    "How to compose using rhythm as foundation",
    "Rhythm theory from classical to funk",
    "Analyzing structure: why chords were chosen",
    "Decode professional arrangements by ear",
    "Music theory integrated with performance",
    
    // Advanced Ear Training (18)
    "Learn to sing any triad in all inversions",
    "Interval training: secret to playing by ear",
    "Triad recognition practice for instant identification",
    "Advanced rhythm dictation for complex patterns",
    "Melodic dictation for intermediate players",
    "Identify chords by ear: step-by-step method",
    "Singing scales for pitch accuracy mastery",
    "Transcribe professional recordings accurately",
    "Hear voice leading and inner chord movement",
    "Recognize modal colors and characteristics",
    "Identify extended chord tensions by sound",
    "Hear secondary dominants and modulations",
    "Detect polyrhythms and metric shifts",
    "Train ear for world music rhythm patterns",
    "Transcribe bass lines with harmonic awareness",
    "Recognize chord substitutions in real time",
    "Hear the difference in voicing structures",
    "Develop musical memory through transcription",
    
    // Advanced Rhythm & World Music (15)
    "Master ALL pulses from classical to funk",
    "Odd time signatures: 5/4, 7/8 made simple",
    "Practice polyrhythms: 3:2, 4:3, 5:4 control",
    "Afro-Cuban patterns and complex clave variations",
    "Konnakol: South Indian rhythmic sophistication",
    "World music patterns from multiple traditions",
    "Rhythm as compositional foundation technique",
    "Advanced syncopation and metric modulation",
    "Playing over all beat divisions with precision",
    "Cross-rhythms and displaced accents mastery",
    "Groove science: space, dynamics & momentum",
    "Triplet feels versus straight subdivision",
    "Complex meter internalization through practice",
    "Rhythmic phrasing for expressive performance",
    "Brazilian, Caribbean & African rhythm concepts",
    
    // Course Structure (15)
    "20 practical classes + 12 musicianship sessions",
    "Music Factory: transcribe & analyze real songs",
    "Music Gym: structured 3D skill-building exercises",
    "Modular pathways: singing, playing, chords, gospel, etc",
    "6-month intensive intermediate-level program",
    "3-4 lesson modules with clear learning goals",
    "Live classes plus HD recordings & handwritten notes",
    "Weekly assignments with personalized teacher feedback",
    "Graded certification upon successful completion",
    "Small batches for individual attention & support",
    "Progressive curriculum building advanced concepts",
    "Theory, ear training & technique integrated seamlessly",
    "Regular performance reviews and skill assessments",
    "Flexible scheduling: mornings, evenings, weekends",
    "Online, Bangalore offline, or hybrid learning modes",
    
    // Teaching Philosophy (15)
    "Musician first, pianist second philosophy",
    "Custom-made teaching adapted to your level",
    "Engaging, interactive & flexible methods",
    "Result-oriented approach with proven outcomes",
    "Space to learn and improvise beyond curriculum",
    "Understanding WHY, not just memorizing WHAT",
    "Real-world application from lesson one",
    "Build musicianship through deep analysis",
    "Learn to think, hear & create like a professional",
    "Genre diversity: Classical to world music fusion",
    "Creative exploration within structured framework",
    "Develop musical intelligence systematically",
    "Practical skills that work in any musical context",
    "Critical listening and analytical thinking emphasized",
    "Multi-instrumentalist perspective enriches lessons",
    
    // For Intermediate/Advanced Learners (15)
    "Perfect for Foundation course graduates advancing",
    "Self-taught pianists wanting proper structure",
    "Trinity/ABRSM students seeking real musicianship",
    "Producers adding advanced piano & theory skills",
    "Songwriters deepening harmonic understanding",
    "Serious learners committed to musical growth",
    "Classical pianists exploring contemporary styles",
    "Intermediate players ready for next level",
    "Musicians from other instruments expanding skills",
    "Hobbyists becoming serious performing musicians",
    "Adults and professionals balancing music & career",
    "Anyone wanting to truly understand music deeply",
    "Students ready for graded certification path",
    "Musicians preparing for teaching careers",
    "Performers wanting compositional expertise",
    
    // Performance & Real-World Application (18)
    "Perform live: stage experience builds confidence",
    "Studio recording sessions for real projects",
    "Jam with other advanced students & musicians",
    "Graded exams prepare you for certification",
    "Accompany vocalists in any key instantly",
    "Perform original arrangements and compositions",
    "Learn professional stage presence techniques",
    "Collaborate on real musical projects",
    "Build diverse repertoire across genres",
    "Handle performance pressure with preparation",
    "Record demos in professional studio setting",
    "Play at concerts, cafes and music events",
    "Session musician skills for recording work",
    "Arrange songs for different ensemble sizes",
    "Improvise confidently in live situations",
    "Network with serious musicians and educators",
    "Develop portfolio for teaching or performing",
    "Apply advanced skills to real-world scenarios",
    
    // Musicianship & Creativity (18)
    "Play by ear using advanced interval recognition",
    "Improvise over complex chord progressions",
    "Understand harmony at a deep structural level",
    "Create sophisticated chord progressions naturally",
    "Arrange songs with professional voicings",
    "Compose with harmonic & rhythmic sophistication",
    "Transpose any piece to any key fluently",
    "Reharmonize melodies with creative substitutions",
    "Develop your unique musical voice & style",
    "Play with advanced dynamics and expression",
    "Use modal concepts for color and variety",
    "Master fills, embellishments & improvised solos",
    "Think in Roman numerals and chord functions",
    "Hear and play chord extensions naturally",
    "Understand world music harmonic systems",
    "Blend genres with musical intelligence",
    "Create arrangements for multiple instruments",
    "Apply music production insights to performance",
    
    // Career & Life Benefits (15)
    "Build foundation for professional music teaching",
    "Develop skills for session musician work",
    "Open doors to music industry opportunities",
    "Join network of 115k+ YouTube community learners",
    "Connect with 15k+ Instagram music supporters",
    "Compose with confidence and deep knowledge",
    "Turn serious hobby into performance career",
    "Add professional certification to your credentials",
    "Enhance creativity across all life pursuits",
    "Develop discipline through structured practice",
    "Understand music at professional musician level",
    "Build confidence to teach or perform publicly",
    "Experience fulfillment of musical mastery",
    "Network with musicians across India & globally",
    "Create music that expresses your unique voice"
  ];

  // Track used highlights globally to avoid repeats across all images
  const [usedHighlights, setUsedHighlights] = useState<Set<string>>(new Set());
  const [photoHighlights, setPhotoHighlights] = useState<{ [key: number]: string }>({});

  // Initialize with unique random highlights for each photo (guaranteed no repeats)
  useEffect(() => {
    const initialHighlights: { [key: number]: string } = {};
    const shuffled = [...allHighlights].sort(() => Math.random() - 0.5);
    
    photos.forEach((_, index) => {
      initialHighlights[index] = shuffled[index];
    });
    
    const initialUsed = new Set(shuffled.slice(0, photos.length));
    setPhotoHighlights(initialHighlights);
    setUsedHighlights(initialUsed);
  }, []);

  // Get new random highlight on hover (never repeats until all exhausted)
  const getNewHighlight = (photoIndex: number) => {
    const available = allHighlights.filter(h => !usedHighlights.has(h));
    
    // If all highlights used, reset the pool
    if (available.length === 0) {
      const currentHighlight = photoHighlights[photoIndex];
      setUsedHighlights(new Set([currentHighlight]));
      const freshAvailable = allHighlights.filter(h => h !== currentHighlight);
      const randomIndex = Math.floor(Math.random() * freshAvailable.length);
      const newHighlight = freshAvailable[randomIndex];
      
      setPhotoHighlights(prev => ({ ...prev, [photoIndex]: newHighlight }));
      setUsedHighlights(new Set([currentHighlight, newHighlight]));
    } else {
      const randomIndex = Math.floor(Math.random() * available.length);
      const newHighlight = available[randomIndex];
      
      setPhotoHighlights(prev => ({ ...prev, [photoIndex]: newHighlight }));
      setUsedHighlights(prev => {
        const newSet = new Set(prev);
        newSet.add(newHighlight);
        return newSet;
      });
    }
  };

  return (
    <section className="py-8 md:py-12 lg:py-14 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 space-y-4"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Students in Action
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A glimpse into our journey of learning, practice, and live performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-w-6xl mx-auto">
          {photos.map((photo, index) => {
            const highlight = photoHighlights[index] || allHighlights[0];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden group border border-primary/20"
                data-testid={`img-student-${index}`}
                onMouseEnter={() => getNewHighlight(index)}
              >
                <div className="relative md:aspect-square" style={{ aspectRatio: "3 / 2" }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{
                      filter: "sepia(0.3) brightness(0.85) contrast(1.15) saturate(0.85) hue-rotate(10deg)",
                      objectPosition: photo.orientation === "left" ? "left center" : 
                                     photo.orientation === "right" ? "right center" : 
                                     "center center"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-60" />
                  
                  {/* Highlight overlay - visible on hover (desktop) */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-end p-4">
                      <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  </div>

                  {/* Mobile-only: Always show highlight at bottom */}
                  <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                    <p className="text-xs font-medium text-foreground/90 leading-tight">
                      {highlight}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
