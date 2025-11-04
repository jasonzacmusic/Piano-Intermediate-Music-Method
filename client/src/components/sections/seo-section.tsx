import { motion } from "framer-motion";

export function SEOSection() {
  return (
    <section className="py-8 md:py-12 bg-card/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
            <h2>🎹 Looking for Intermediate Piano Lessons in Bangalore or Online?</h2>

            <p>
            The <strong>Nathaniel School of Music</strong>, led by <strong>Jason Zac</strong>, is recognised as one of the <strong>best music schools in Bangalore</strong> for piano learners who want to go beyond the basics. Our <strong>6-month Piano Intermediate Course</strong> is designed for students who already understand chords, scales, and simple songs and now want to master <strong>theory, ear training, transcription, and rhythm</strong> at a professional level.
            </p>

            <p>
            This <strong>performance-based piano course</strong> blends practical playing, composition, and analysis through structured weekly lessons. You’ll train in <strong>Music Theory, Harmony, Rhythm, Ear Training,</strong> and <strong>Transcription</strong> while improving technique and musical expression through <strong>Music Factory</strong> (song transcription &amp; arrangement) and <strong>Music Gym</strong> (advanced technical drills &amp; creative exercises).
            </p>

            <p>
            All classes include <strong>HD video recordings</strong>, <strong>handwritten notes</strong>, and <strong>graded feedback</strong> to help you build real-world musicianship. You can learn <strong>online</strong>, <strong>offline in Bangalore</strong>, or in a <strong>hybrid mode</strong>, with <strong>weekday and weekend batches</strong> to suit your schedule.
            </p>

            <p>
            Whether you’re searching for <em>“intermediate piano classes near me”</em>, <em>“online piano lessons India”</em>, or <em>“best piano course in Bangalore”</em>, this program provides a <strong>structured, flexible, and inspiring path</strong> to becoming a complete musician. Join hundreds of students worldwide who continue their journey with <strong>Jason Zac’s advanced piano training</strong> and take your playing to the next level. 🌍🎶
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
