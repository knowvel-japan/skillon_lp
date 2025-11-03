import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "../shared/AnimatedSection";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <section
      className="bg-[#edf8ff] py-8 px-4 md:py-12 md:px-8"
      aria-labelledby="faq-section-title"
    >
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2
            id="faq-section-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 text-[#3791e2]"
          >
            よくある質問
          </h2>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);

            return (
              <AnimatedSection
                key={index}
                animation="fadeIn"
                delay={index * 0.1}
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border-l-4 border-[#3791e2]">
                  <button
                    onClick={() => toggleItem(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left transition-colors hover:bg-gray-50 min-h-[44px] touch-manipulation"
                  >
                    <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-gradient-to-br from-[#edf8ff]/30 to-white"
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                      >
                        <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-2 text-sm sm:text-xs lg:text-sm text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
