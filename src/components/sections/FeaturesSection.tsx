import { motion } from "framer-motion";
import AnimatedSection from "../shared/AnimatedSection";
import { staggerContainer, slideUp } from "../../lib/animations";

interface Feature {
  iconSrc: string;
  title: string;
  description: string;
}

interface ComparisonRow {
  feature: string;
  trainingCompany: string;
  existingLMS: string;
  skillON: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  beforeAfterVideoPlaceholder?: string;
  comparisonData: ComparisonRow[];
}

const FeaturesSection = ({
  features,
  comparisonData,
}: FeaturesSectionProps) => {
  return (
    <section
      className="bg-white py-8 sm:py-12 lg:py-16"
      aria-labelledby="features-section-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-8 sm:mb-10">
            <h2
              id="features-section-title"
              className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3791e2] mb-3"
            >
              SkillONの主な特徴
            </h2>
          </div>
        </AnimatedSection>

        {/* Feature Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="features-container flex flex-col items-stretch gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
        >
          <style>{`
            @media (min-width: 420px) {
              .features-container {
                flex-direction: row;
              }
              .feature-card-content {
                flex-direction: column;
                align-items: center;
                gap: 0;
              }
            }
          `}</style>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={slideUp}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              style={{
                willChange: "transform",
              }}
              className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 flex-1 min-w-0"
            >
              <div className="feature-card-content flex flex-row items-start gap-3 flex-1">
                {/* Icon */}
                <div
                  className="w-16 h-16 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center sm:mb-1"
                  aria-hidden="true"
                >
                  <img
                    src={feature.iconSrc}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 feature-text-content">
                  <style>{`
                    .feature-text-content h3 {
                      font-size: 0.875rem;
                      text-align: left;
                    }
                    .feature-text-content p {
                      font-size: 0.75rem;
                      text-align: left;
                    }
                    @media (min-width: 420px) {
                      .feature-text-content {
                        width: 100%;
                      }
                      .feature-text-content h3 {
                        font-size: 0.6875rem;
                        text-align: center;
                        margin-bottom: 0.5rem;
                      }
                      .feature-text-content p {
                        font-size: 0.5625rem;
                      }
                    }
                  `}</style>
                  {/* Title */}
                  <h3 className="font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table Section */}
        <AnimatedSection animation="slideUp" delay={0.4}>
          <div className="bg-[#edf8ff] rounded-2xl p-3 sm:p-6 lg:p-8">
            <h3 className="text-[13px] sm:text-lg lg:text-xl font-bold text-[#3791e2] text-center mb-4 sm:mb-6">
              他社との違い
            </h3>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle px-3 sm:px-0">
                <table className="min-w-full bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden text-[7px] sm:text-[9px] lg:text-[10px]">
                  <thead>
                    <tr className="bg-[#3791e2] text-white">
                      <th className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 text-center font-semibold whitespace-nowrap">
                        項目
                      </th>
                      <th className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 text-center font-semibold whitespace-nowrap">
                        研修動画
                        <br className="sm:hidden" />
                        制作会社
                      </th>
                      <th className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 text-center font-semibold whitespace-nowrap">
                        既存LMS
                      </th>
                      <th className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 text-center font-semibold bg-[#f97d0b] whitespace-nowrap">
                        SkillON
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 font-semibold text-gray-900 text-center border-b border-gray-200 whitespace-nowrap">
                          {row.feature}
                        </td>
                        <td className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 text-gray-700 text-center border-b border-gray-200">
                          {row.trainingCompany}
                        </td>
                        <td className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 text-gray-700 text-center border-b border-gray-200">
                          {row.existingLMS}
                        </td>
                        <td className="py-2 px-1.5 sm:py-3 sm:px-3 lg:px-4 text-gray-900 font-semibold text-center border-b border-gray-200 bg-[#fff5e6]">
                          {row.skillON}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturesSection;
