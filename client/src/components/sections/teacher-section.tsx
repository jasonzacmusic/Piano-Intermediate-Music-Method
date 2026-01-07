import { motion } from "framer-motion";
import { Youtube, Instagram, Music, Layers } from "lucide-react";
import teacherImage from "@assets/Jason's Riffs and Tutorials_October 10th '24 Photos (1 of 1)-10_1761334416663.jpg";

export function TeacherSection() {
  const highlights = [
    {
      icon: Youtube,
      title: "115k+ YouTube Subscribers",
      description: "Comprehensive tutorials on piano, theory, and musicianship"
    },
    {
      icon: Instagram,
      title: "15k+ Instagram Supporters",
      description: "Daily tips, lessons, and music inspiration"
    },
    {
      icon: Music,
      title: "Three Released Albums",
      description: "Blending Indian Classical and Celtic Folk influences"
    },
    {
      icon: Layers,
      title: "Multi-Instrumentalist",
      description: "Piano, bass, horns, percussion, and vocals"
    }
  ];

  return (
    <section id="instructor" className="py-8 md:py-12 lg:py-14 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 space-y-4"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            About Your Teacher
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from Jason Zachariah, a Bangalore-based musician with over two decades of experience as a performer, educator, and producer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={teacherImage}
                alt="Jason Zachariah at the piano"
                className="w-full h-full object-cover"
                data-testid="img-teacher"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Jason is the co-director of the <strong className="text-foreground">Nathaniel School of Music</strong> and 
                runs a YouTube Education channel with over <strong className="text-foreground">115,000 subscribers</strong>, 
                teaching piano, bass, music theory, composition, ear training, production, and rhythm concepts. His 
                <strong className="text-foreground"> 15,000+ Instagram supporters</strong> benefit from daily music tips and lessons.
              </p>
              
              <p>
                His teaching style is best described as <strong className="text-foreground">custom-made to suit every level</strong>. 
                Jason has a knack for identifying the best methods that are engaging, interactive, and flexible to suit the needs 
                of almost any student. His workshops and tutorials are lauded in the music circle for being 
                <strong className="text-foreground"> result-oriented</strong> while allowing space for students to learn and improvise 
                above and beyond.
              </p>
              
              <p>
                As a <strong className="text-foreground">multi-instrumentalist</strong>, Jason plays piano, bass, horns, assorted 
                percussion, and sings. He has released <strong className="text-foreground">three albums</strong> to date, each showing 
                his growth in musical expression, with the latest incorporating influences from Indian Classical Music and Celtic Folk. 
                He has also performed with bands including <strong className="text-foreground">Allegro Fudge</strong>, blending folk with 
                Indian influences.
              </p>
              
              <p>
                Jason comes from a family of music pioneers. His grandfathers, <strong className="text-foreground">Walter Nathaniel</strong> and 
                <strong className="text-foreground"> A.D. Zachariah</strong>, were key figures in Western and Indian Classical Music in India, 
                respectively, a legacy that informs his unique approach to music education.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
