import { useEffect, useState } from "react";

import HeroSlider from "../../components/website/hero/HeroSlider";
//import AboutSection from "../../components/website/about/AboutSection";
import WhyChooseSection from "../../components/website/whyChoose/WhyChooseSection";
import LocationAdvantagesSection from "../../components/website/location/LocationAdvantagesSection";
import AmenitySection from "../../components/website/amenity/AmenitySection";
import LifestyleSection from "../../components/website/lifestyle/LifestyleSection";
import VillaSection from "../../components/website/villa/VillaSection";
import GallerySection from "../../components/website/gallery/GallerySection";
import EventSection from "../../components/website/event/EventSection";
import TestimonialSection from "../../components/website/testimonial/TestimonialSection";
import FAQSection from "../../components/website/faq/FAQSection";
//import ContactSection from "../../components/website/contact/ContactSection";

import WelcomeSection from "../../components/website/about/WelcomeSection";
import MissionVisionSection from "../../components/website/about/MissionVisionSection";

import { getAbout } from "../../services/websiteAboutService";
import CTASection from "../../components/website/home/CTASection";
import BrochureSection from "../../components/website/brochure/BrochureSection";

export default function Home() {
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const res = await getAbout();
      if (res.success) {
        setAbout(res.about);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* HERO */}
      <HeroSlider />
       {/* WELCOME SECTION */}
      <WelcomeSection data={about} />
      <BrochureSection />
       {/* WHY CHOOSE */}
      <WhyChooseSection limit={3} />

       {/* VILLAS */}
      <VillaSection
  limit={3}
  showViewAll
/>
      
      {/* AMENITIES */}
      <AmenitySection  limit={3} showViewAll/>

      {/* LOCATION ADVANTAGES */}
      <LocationAdvantagesSection />

      {/* LIFESTYLE */}
      <LifestyleSection limit={3} showViewAll/>

      {/* MISSION & VISION */}
      <MissionVisionSection data={about} />
      
      {/* ABOUT PREVIEW */}
      {/*<AboutSection />*/}

      {/* GALLERY */}
      <GallerySection limit={3} showViewAll/>
      
      {/* EVENTS */}
      <EventSection
  limit={3}
  showViewAll
/>

      {/* TESTIMONIALS */}
      <TestimonialSection
  limit={3}
  showViewAll
/>

      {/* FAQ */}
      <FAQSection
  limit={5}
  showViewAll
/>

     <CTASection />

      {/* CONTACT */}
      {/*<ContactSection />*/}
    </>
  );
}