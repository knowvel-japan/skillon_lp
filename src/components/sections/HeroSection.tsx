import AnimatedSection from "../shared/AnimatedSection";
import CTAButton from "../shared/CTAButton";

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
}: HeroSectionProps) => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/herogazo.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <AnimatedSection
          animation="slideUp"
          className="text-center max-w-4xl mx-auto"
        >
          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg"
          >
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 leading-relaxed drop-shadow-lg">
            {subtitle}
          </p>
          <div className="flex justify-center">
            <CTAButton
              text={ctaText}
              href={ctaLink}
              variant="primary"
              size="lg"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;
