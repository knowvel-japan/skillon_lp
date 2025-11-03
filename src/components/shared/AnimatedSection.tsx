import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeIn, slideUp, slideLeft, slideRight } from "../../lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight";
  delay?: number;
  className?: string;
}

/**
 * AnimatedSection component
 * Wraps content with scroll-triggered animations using Intersection Observer
 * Respects prefers-reduced-motion user preference
 */
const AnimatedSection = ({
  children,
  animation = "fadeIn",
  delay = 0,
  className = "",
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Map animation prop to animation variant
  const animationVariants: Record<string, Variants> = {
    fadeIn,
    slideUp,
    slideLeft,
    slideRight,
  };

  const selectedVariant = animationVariants[animation] || fadeIn;

  // Add delay to the animation if specified
  const variantWithDelay: Variants = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...(selectedVariant.visible as any).transition,
        delay,
      },
    },
  };

  useEffect(() => {
    // If user prefers reduced motion, show content immediately without animation
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    // Create Intersection Observer to detect when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve after animation is triggered (animate only once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element enters viewport
      }
    );

    observer.observe(currentRef);

    // Cleanup observer on unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [prefersReducedMotion]);

  // If user prefers reduced motion, render without animation
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variantWithDelay}
      className={className}
      style={{
        willChange: isVisible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
