import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import AnimatedSection from "../shared/AnimatedSection";
import { staggerContainer, slideUp } from "../../lib/animations";

interface ProblemItem {
  icon: LucideIcon;
  iconPath?: string;
  title: string;
  description: string;
}

interface ProblemSectionProps {
  problems: ProblemItem[];
  socialBenefit: string;
}

const ProblemSection = ({ problems, socialBenefit }: ProblemSectionProps) => {
  return (
    <section
      className="bg-white py-8 sm:py-12 lg:py-16"
      aria-labelledby="problem-section-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-8 sm:mb-10">
            <h2
              id="problem-section-title"
              className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3791e2] mb-3"
            >
              こんなお悩みありませんか？
            </h2>
          </div>
        </AnimatedSection>

        {/* Problems Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="problems-container flex flex-col items-stretch gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
        >
          <style>{`
            @media (min-width: 420px) {
              .problems-container {
                flex-direction: row;
              }
              .problem-card-content {
                flex-direction: column;
                align-items: center;
                gap: 0;
              }
            }
          `}</style>
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 flex-1 min-w-0"
              >
                <div className="problem-card-content flex flex-row items-start gap-3 flex-1">
                  <div
                    className="w-16 h-16 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center sm:mb-1"
                    aria-hidden="true"
                  >
                    {problem.iconPath ? (
                      <img
                        src={problem.iconPath}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#3791e2]" />
                    )}
                  </div>
                  <div className="flex-1 problem-text-content">
                    <style>{`
                      .problem-text-content h3 {
                        font-size: 0.875rem;
                        text-align: left;
                      }
                      .problem-text-content p {
                        font-size: 0.75rem;
                        text-align: left;
                      }
                      @media (min-width: 420px) {
                        .problem-text-content {
                          width: 100%;
                        }
                        .problem-text-content h3 {
                          font-size: 0.6875rem;
                          text-align: center;
                          margin-bottom: 0.5rem;
                        }
                        .problem-text-content p {
                          font-size: 0.5625rem;
                        }
                      }
                    `}</style>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {problem.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Social Benefit Box */}
        <AnimatedSection animation="slideUp" delay={0.4}>
          <div className="bg-gradient-to-br from-[#edf8ff] to-[#3791e2]/5 border-2 border-[#3791e2]/20 rounded-2xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0" aria-hidden="true">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-[#3791e2]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-[9px] text-gray-700 leading-relaxed">
                  {socialBenefit}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ProblemSection;
