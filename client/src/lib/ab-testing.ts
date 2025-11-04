// A/B Testing utility with localStorage persistence

export interface ABTestVariant {
  id: string;
  name: string;
  weight?: number; // Optional weight for distribution (default: equal)
  headline?: string; // Optional headline for hero variants
  subheadline?: string; // Optional subheadline for hero variants
}

export interface ABTest {
  testId: string;
  variants: ABTestVariant[];
}

// Get or assign a variant for a specific test
export const getABTestVariant = (test: ABTest): string => {
  const storageKey = `ab_test_${test.testId}`;
  
  // Check if user already has an assigned variant
  const existingVariant = localStorage.getItem(storageKey);
  if (existingVariant && test.variants.some(v => v.id === existingVariant)) {
    return existingVariant;
  }

  // Assign a new variant based on weights
  const totalWeight = test.variants.reduce((sum, v) => sum + (v.weight || 1), 0);
  const random = Math.random() * totalWeight;
  
  let cumulativeWeight = 0;
  for (const variant of test.variants) {
    cumulativeWeight += variant.weight || 1;
    if (random <= cumulativeWeight) {
      localStorage.setItem(storageKey, variant.id);
      return variant.id;
    }
  }

  // Fallback to first variant
  const fallbackId = test.variants[0].id;
  localStorage.setItem(storageKey, fallbackId);
  return fallbackId;
};

// Track A/B test exposure
export const trackABTestExposure = (testId: string, variantId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_exposure', {
      event_category: 'experiment',
      test_id: testId,
      variant_id: variantId,
    });
  }
};

// Track A/B test conversion
export const trackABTestConversion = (testId: string, variantId: string, conversionType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      event_category: 'experiment',
      test_id: testId,
      variant_id: variantId,
      conversion_type: conversionType,
    });
  }
};

// Define A/B tests
export const AB_TESTS = {
  HERO_HEADLINE: {
    testId: 'hero_headline_test',
    variants: [
      {
        id: 'method_focused',
        name: 'Method Focused',
        headline: 'Learn Piano Through Ear Training, Song Analysis & Practical Theory Classes',
        subheadline: 'Intermediate & Advanced Program: Deep Listening, Chord Logic & Rhythm Theory Build Complete Musicians, Not Just Players.',
      },
      {
        id: 'classroom_types',
        name: 'Classroom Types',
        headline: 'Intermediate Course: Music Factory Transcription, 3D Piano Gym & Theory Sessions',
        subheadline: 'Four Specialized Classrooms for Advanced Students: Modular Piano Lessons, Music Gym Drills, Theory & Ear Training, Live Song Analysis.',
      },
      {
        id: 'four_classrooms',
        name: 'Four Classrooms',
        headline: 'Learn Through Four Classrooms: Modular Piano, Theory & Ear Training, Music Gym, Music Factory',
        subheadline: 'Advanced Piano Training Built on Transcription Work, Rhythm Theory & Musical Understanding for Pianists Ready to Become Musicians.',
      },
    ],
  },
  PRIMARY_CTA: {
    testId: 'primary_cta_test',
    variants: [
      { id: 'enrol_now', name: 'Enrol Now' },
      { id: 'start_learning', name: 'Start Learning' },
      { id: 'join_course', name: 'Join the Course' },
      { id: 'reserve_spot', name: 'Reserve Your Spot' },
    ],
  },
};
