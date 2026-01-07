import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type SyntheticEvent } from "react";
import { trackVideoPlay } from "@/lib/analytics";

interface CoursePreviewProps {
  data: {
    title: string;
    subtitle: string;
    videoUrl: string;
    description: string;
  };
}

export function CoursePreviewSection({ data }: CoursePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getVideoId = (url: string) => {
    return url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = getVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`;
  };

  const getYouTubeThumbnail = (url: string, quality: 'max' | 'hq' = 'max') => {
    const videoId = getVideoId(url);
    const qualityStr = quality === 'max' ? 'maxresdefault' : 'hqdefault';
    return `https://img.youtube.com/vi/${videoId}/${qualityStr}.jpg`;
  };

  const handleThumbnailError = (e: SyntheticEvent<HTMLImageElement>) => {
    // Fallback to hqdefault if maxresdefault fails (404)
    const img = e.currentTarget;
    if (img.src.includes('maxresdefault')) {
      img.src = getYouTubeThumbnail(data.videoUrl, 'hq');
    }
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    trackVideoPlay('course_preview_demo');
  };

  return (
    <section id="course-preview" className="py-8 md:py-12 lg:py-14 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12 space-y-4"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="p-6 md:p-8 space-y-6">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
              {!isPlaying ? (
                <div 
                  className="absolute inset-0 cursor-pointer group"
                  onClick={handlePlayClick}
                  data-testid="button-preview-play"
                >
                  <img
                    src={getYouTubeThumbnail(data.videoUrl, 'max')}
                    alt="Video Preview"
                    className="w-full h-full object-cover"
                    onError={handleThumbnailError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src={getYouTubeEmbedUrl(data.videoUrl)}
                  title="Course Preview Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  data-testid="iframe-preview-video"
                />
              )}
            </div>

            <div className="text-center">
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                {data.description}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
