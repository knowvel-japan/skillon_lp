import { motion } from "framer-motion";

interface CTAButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

const CTAButton = ({
  text,
  href,
  variant = "primary",
  size = "md",
}: CTAButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 touch-manipulation";

  const variantClasses = {
    primary: "bg-[#f97d0b] text-white hover:bg-[#e06d00] focus:ring-[#f97d0b]",
    secondary:
      "border-2 border-[#f97d0b] text-[#f97d0b] hover:bg-[#f97d0b] hover:text-white focus:ring-[#f97d0b]",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-4 py-2 text-[12px]",
    lg: "px-4 py-2 text-[12px]",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <motion.a
      href={href}
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.a>
  );
};

export default CTAButton;
