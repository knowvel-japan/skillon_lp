import type { Variants } from "framer-motion";

/**
 * Fade in animation
 * Element fades in from transparent to opaque
 * Uses only opacity for optimal performance
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Slide up animation
 * Element slides up from below while fading in
 * Uses transform (translateY) and opacity for GPU acceleration
 */
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Slide left animation
 * Element slides in from the right while fading in
 * Uses transform (translateX) and opacity for GPU acceleration
 */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Slide right animation
 * Element slides in from the left while fading in
 * Uses transform (translateX) and opacity for GPU acceleration
 */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Stagger container animation
 * Container that staggers the animation of its children
 * Children will animate sequentially with a 0.2s delay between each
 * Optimized for performance with limited stagger count
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Reduced from 0.2s for faster perceived performance
      ease: "easeOut",
    },
  },
};
