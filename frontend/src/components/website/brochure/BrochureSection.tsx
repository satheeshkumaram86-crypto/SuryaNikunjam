import BenefitSection from "./BenefitSection";
import BrochureHero from "./BrochureHero";
import ChallengeSection from "./ChallengeSection";
import ContactSection from "./ContactSection";
import FeatureSection from "./FeatureSection";
import GalleryShowcase from "./GalleryShowcase";
import IntroductionSection from "./IntroductionSection";
import SolutionSection from "./SolutionSection";
import VisionSection from "./VisionSection";


export default function BrochureSection() {
  return (
    <>
      <BrochureHero />
      <IntroductionSection />
      <ChallengeSection />
      <SolutionSection />
      <FeatureSection />
      <BenefitSection />
      <GalleryShowcase />
      <VisionSection />
      <ContactSection />
    </>
  );
}