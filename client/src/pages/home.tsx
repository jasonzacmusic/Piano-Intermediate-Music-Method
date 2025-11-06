import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useABTest } from "@/hooks/use-ab-test";
import { AB_TESTS, trackABTestConversion } from "@/lib/ab-testing";
import { trackEnrollmentFormReturn } from "@/lib/analytics";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { USPSection } from "@/components/sections/usp-section";
import { StudentPhotosSection } from "@/components/sections/student-photos-section";
import { SyllabusSection } from "@/components/sections/syllabus-section";
import { CourseStructureSection } from "@/components/sections/course-structure-section";
import { CoursePreviewSection } from "@/components/sections/course-preview-section";
import { ClassFlowchartSection } from "@/components/sections/class-flowchart-section";
import { FreeTutorialsSection } from "@/components/sections/free-tutorials-section";
import { WhoIsForSection } from "@/components/sections/who-is-for-section";
import { TeacherSection } from "@/components/sections/teacher-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FeesSection } from "@/components/sections/fees-section";
import { FAQSection } from "@/components/sections/faq-section";
import { SEOSection } from "@/components/sections/seo-section";
import { Footer } from "@/components/sections/footer";
import { StructuredData } from "@/components/structured-data";
import { CourseBuilderFormModal } from "@/components/course-builder-form";
import landingData from "../../../content/landing.json";

export default function Home() {
  const [userRegion, setUserRegion] = useState<"domestic" | "europe" | "international" | null>(null);
  const [isCourseBuilderOpen, setIsCourseBuilderOpen] = useState(false);

  // A/B Testing
  const heroHeadlineTest = useABTest(AB_TESTS.HERO_HEADLINE);
  const primaryCTATest = useABTest(AB_TESTS.PRIMARY_CTA);

  const { data: geoData } = useQuery<{ country: string; region: "domestic" | "europe" | "international" }>({
    queryKey: ["/api/geo"],
  });

  useEffect(() => {
    // Check for test override first (for team testing)
    const testRegion = localStorage.getItem('test_region');
    if (testRegion === 'domestic' || testRegion === 'europe' || testRegion === 'international') {
      setUserRegion(testRegion as "domestic" | "europe" | "international");
      return;
    }
    
    // Use actual geo-detection
    if (geoData?.region) {
      setUserRegion(geoData.region);
    } else {
      // Default to international while loading
      setUserRegion("international");
    }
  }, [geoData]);

  // Track when user returns to page (potential form completion)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackEnrollmentFormReturn();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Create dynamic hero data based on A/B test variants
  const heroData = {
    ...landingData.hero,
    headline: (heroHeadlineTest.variant as any).headline || landingData.hero.headline,
    subheadline: (heroHeadlineTest.variant as any).subheadline || landingData.hero.subheadline,
    buttons: {
      ...landingData.hero.buttons,
      primary: {
        ...landingData.hero.buttons.primary,
        text: (primaryCTATest.variant as any).name || landingData.hero.buttons.primary.text,
      },
    },
  };

  // Track conversion when user clicks enrollment
  const handleEnrollmentClick = () => {
    trackABTestConversion(AB_TESTS.HERO_HEADLINE.testId, heroHeadlineTest.variantId, 'enrollment_click');
    trackABTestConversion(AB_TESTS.PRIMARY_CTA.testId, primaryCTATest.variantId, 'enrollment_click');
  };

  const handleBuildCourseClick = () => {
    setIsCourseBuilderOpen(true);
    handleEnrollmentClick();
  };

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <StructuredData />
      <Header />
      
      <HeroSection 
        data={heroData} 
        onBuildCourseClick={handleBuildCourseClick}
      />
      
      <CourseBuilderFormModal 
        isOpen={isCourseBuilderOpen}
        onClose={() => setIsCourseBuilderOpen(false)}
      />
      
      <CoursePreviewSection data={landingData.coursePreview} />
      
      <ClassFlowchartSection />
      
      <FreeTutorialsSection />
      
      <USPSection data={landingData.usps} />
      
      <StudentPhotosSection />
      
      <SyllabusSection data={landingData.syllabus} />
      
      <CourseStructureSection data={landingData.structure} />
      
      <WhoIsForSection data={landingData.whoIsFor} />
      
      <TeacherSection />
      
      <TestimonialsSection data={landingData.testimonials} />
      
      <FeesSection 
        userRegion={userRegion || "international"}
      />
      
      <FAQSection data={landingData.faq} />
      
      <SEOSection />
      
      <Footer data={landingData.footer} />
    </div>
  );
}
