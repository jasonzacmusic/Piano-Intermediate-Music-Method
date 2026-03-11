import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type SyntheticEvent } from "react";
import { trackVideoPlay } from "@/lib/analytics";

interface Tutorial {
  title: string;
  url: string;
  category: "piano" | "ear-training" | "theory" | "song-learning" | "technology";
}

const selectedTutorials: Tutorial[] = [
  {
    title: "How to Use 'Wrong' Notes Creatively - Interval Magic",
    url: "https://youtu.be/W6rTUhK4RgY",
    category: "piano"
  },
  {
    title: "5 Piano Techniques I Use ALL the Time for Fills and Solos",
    url: "https://youtu.be/JHPK4FCSP0g",
    category: "piano"
  },
  {
    title: "Left Hand Piano Arpeggios Tutorial - Octaves, Spread Voicings & Intervals",
    url: "https://youtu.be/dFbfYE0r8Ws",
    category: "piano"
  },
  {
    title: "Chord Progressions That Changed Music Forever",
    url: "https://youtu.be/s0yC6Ojixso",
    category: "theory"
  },
  {
    title: "Voice Leading Explained: Why Every Musician Needs It",
    url: "https://youtu.be/0w-8y38kKKA",
    category: "theory"
  },
  {
    title: "Triads Aren't Just 3 Notes! Learn to Sing Any Triad",
    url: "https://youtu.be/La3PJILVppg",
    category: "ear-training"
  },
  {
    title: "Interval Training – The Secret to Playing by Ear",
    url: "https://youtu.be/OVdK3pXbqg8",
    category: "ear-training"
  },
  {
    title: "Bella Ciao – Advanced Arrangement",
    url: "https://youtu.be/BaTywzMGA2U",
    category: "song-learning"
  }
];

export function FreeTutorialsSection() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const getVideoId = (url: string) => {
    return url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  const getYouTubeThumbnail = (url: string, quality: 'max' | 'hq' = 'max') => {
    const videoId = getVideoId(url);
    const qualityStr = quality === 'max' ? 'maxresdefault' : 'hqdefault';
    return `https://img.youtube.com/vi/${videoId}/${qualityStr}.jpg`;
  };

  const handleThumbnailError = (e: SyntheticEvent<HTMLImageElement>, url: string) => {
    // Fallback to hqdefault if maxresdefault fails (404)
    const img = e.currentTarget;
    if (img.src.includes('maxresdefault')) {
      img.src = getYouTubeThumbnail(url, 'hq');
    }
  };

  const handlePlayClick = (url: string, title: string) => {
    setPlayingVideo(url);
    trackVideoPlay(`free_tutorial_${title.substring(0, 20)}`);
  };

  return (
    <section id="free-tutorials" className="py-8 md:py-12 lg:py-14 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 space-y-4"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            See How We Teach
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced piano techniques, theory, ear training, and musicianship from our intermediate-level curriculum.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {selectedTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover-elevate">
                <div className="relative aspect-video w-full bg-muted">
                  {playingVideo !== tutorial.url ? (
                    <div 
                      className="absolute inset-0 cursor-pointer group"
                      onClick={() => handlePlayClick(tutorial.url, tutorial.title)}
                      data-testid={`button-tutorial-play-${index}`}
                    >
                      <img
                        src={getYouTubeThumbnail(tutorial.url, 'max')}
                        alt={tutorial.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => handleThumbnailError(e, tutorial.url)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={getYouTubeEmbedUrl(tutorial.url)}
                      title={tutorial.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      data-testid={`iframe-tutorial-video-${index}`}
                    />
                  )}
                </div>

                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-medium leading-tight line-clamp-2">
                    {tutorial.title}
                  </h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
