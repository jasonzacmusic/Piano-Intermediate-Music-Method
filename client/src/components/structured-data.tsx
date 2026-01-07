import { useEffect } from "react";

export function StructuredData() {
  useEffect(() => {
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Intermediate Piano Course - Advanced Music Training with Jason Zachariah",
      "description": "Master advanced piano techniques with Jason Zachariah at Nathaniel School of Music. This intermediate course covers Music Factory (transcription & analysis), Music Gym (3D skill exercises), advanced voicings, quartal harmony, voice leading, modular learning pathways, and graded certification for serious musicians.",
      "keywords": "intermediate piano course, advanced piano lessons bangalore, music factory transcription, music gym exercises, quartal harmony piano, voice leading piano, graded certification, jason zachariah piano, online piano classes, advanced musicianship",
      "educationalLevel": "Intermediate to Advanced",
      "teaches": [
        "Advanced piano voicings & techniques",
        "Music Factory - Transcription & Analysis",
        "Music Gym - 3D Skill Exercises",
        "Quartal harmony & modern voicings",
        "Voice leading & chord movement",
        "World music patterns & rhythms",
        "Modular learning pathways",
        "Graded certification preparation"
      ],
      "provider": {
        "@type": "MusicSchool",
        "name": "Nathaniel School of Music",
        "alternateName": "NSM Bangalore",
        "description": "Best music school in Bangalore offering advanced piano lessons, online piano courses, and comprehensive music education for intermediate to advanced musicians",
        "url": "https://piano-course.nathanielschool.com",
        "logo": "https://piano-course.nathanielschool.com/images/NSM LOGO White_1760966677704.png",
        "image": "https://piano-course.nathanielschool.com/images/060A0073_1760966749362.JPG",
        "address": [
          {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "IN",
            "streetAddress": "Langford Town"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "IN",
            "streetAddress": "Sahakar Nagar"
          }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-77604-56847",
          "contactType": "Enrollment",
          "email": "music@nathanielschool.com",
          "availableLanguage": ["English", "Hindi", "Kannada"]
        },
        "sameAs": [
          "https://youtube.com/jasonzac",
          "https://instagram.com/jasonzac"
        ],
        "priceRange": "₹₹₹"
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": ["online", "onsite", "blended"],
        "duration": "P6M",
        "inLanguage": "en",
        "instructor": {
          "@type": "Person",
          "name": "Jason Zachariah",
          "alternateName": "Jason Zac",
          "description": "Professional piano instructor with 115k+ YouTube subscribers, specializing in advanced musicianship, Music Factory transcription, and Music Gym exercises",
          "jobTitle": "Piano Instructor & Music Educator",
          "sameAs": [
            "https://youtube.com/jasonzac",
            "https://instagram.com/jasonzac"
          ]
        },
        "courseWorkload": "PT2H",
        "location": [
          {
            "@type": "VirtualLocation",
            "name": "Online Piano Classes",
            "description": "Learn advanced piano techniques from home via Zoom"
          },
          {
            "@type": "Place",
            "name": "Nathaniel School of Music - Langford Town",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "addressCountry": "IN"
            }
          }
        ]
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "32 Hours Package",
          "price": "20000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "eligibleRegion": {
            "@type": "Place",
            "name": "India"
          },
          "validFrom": "2024-01-01"
        },
        {
          "@type": "Offer",
          "name": "32 Hours Package",
          "price": "420",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "eligibleRegion": {
            "@type": "Place",
            "name": "International"
          },
          "validFrom": "2024-01-01"
        },
        {
          "@type": "Offer",
          "name": "65 Hours Package",
          "price": "35000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "eligibleRegion": {
            "@type": "Place",
            "name": "India"
          },
          "validFrom": "2024-01-01"
        },
        {
          "@type": "Offer",
          "name": "65 Hours Package",
          "price": "700",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "eligibleRegion": {
            "@type": "Place",
            "name": "International"
          },
          "validFrom": "2024-01-01"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150",
        "bestRating": "5"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Intermediate Piano Course at Nathaniel School of Music?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Intermediate Piano Course is an advanced 6-month program taught by Jason Zachariah. It covers Music Factory (transcription & analysis), Music Gym (3D skill exercises), quartal harmony, voice leading, modular learning pathways, and graded certification for musicians ready to take their skills to the next level."
          }
        },
        {
          "@type": "Question",
          "name": "What is Music Factory and Music Gym in the intermediate course?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Music Factory focuses on transcription and analysis of professional recordings, teaching you to decode what great musicians play. Music Gym provides 3D skill exercises that build technique, coordination, and musicality through structured practice routines designed for intermediate to advanced players."
          }
        },
        {
          "@type": "Question",
          "name": "Can I take the intermediate piano course online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! The Intermediate Piano Course is available in three modes: fully online via Zoom, offline at our Bangalore locations (Langford Town & Sahakar Nagar), or a hybrid combination. Online students receive the same comprehensive curriculum including Music Factory, Music Gym, and graded certification."
          }
        },
        {
          "@type": "Question",
          "name": "Who is Jason Zachariah and what makes him qualified to teach?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jason Zachariah is a Bangalore-based multi-instrumentalist with 115k+ YouTube subscribers and 15k+ Instagram followers. With over two decades of experience as a performer, educator, and producer, he has released three albums blending Indian Classical and Celtic Folk influences. His teaching approach emphasizes becoming a musician first, with piano as a natural extension of complete musicianship."
          }
        }
      ]
    };

    const courseScript = document.createElement("script");
    courseScript.type = "application/ld+json";
    courseScript.text = JSON.stringify(courseSchema);
    document.head.appendChild(courseScript);

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      document.head.removeChild(courseScript);
      document.head.removeChild(faqScript);
    };
  }, []);

  return null;
}
