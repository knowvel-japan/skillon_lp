import AnimatedSection from "../shared/AnimatedSection";
import CTAButton from "../shared/CTAButton";
import { Users, Briefcase, Calendar, CheckCircle } from "lucide-react";

interface PartnerInfo {
  target: string[];
  fields: string[];
  schedule: string;
  conditions: string[];
}

interface PartnerSectionProps {
  partnerInfo: PartnerInfo;
}

const PartnerSection = ({ partnerInfo }: PartnerSectionProps) => {
  const infoBoxes = [
    {
      id: "target",
      title: "募集対象",
      icon: Users,
      items: partnerInfo.target,
    },
    {
      id: "fields",
      title: "募集分野",
      icon: Briefcase,
      items: partnerInfo.fields,
    },
    {
      id: "schedule",
      title: "PoC時期・スケジュール",
      icon: Calendar,
      items: [partnerInfo.schedule],
    },
    {
      id: "conditions",
      title: "参加条件",
      icon: CheckCircle,
      items: partnerInfo.conditions,
    },
  ];

  return (
    <section
      className="bg-[#edf8ff] py-8 px-4 md:py-12 md:px-8"
      aria-labelledby="partner-section-title"
    >
      <div className="partner-container mx-auto">
        <style>{`
          .partner-container {
            max-width: 100%;
          }
          @media (min-width: 640px) {
            .partner-container {
              max-width: 640px;
            }
          }
        `}</style>
        <AnimatedSection animation="fadeIn">
          <h2
            id="partner-section-title"
            className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3791e2] text-center mb-8"
          >
            共創パートナー募集
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.2}>
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-md mb-8 sm:mb-12">
            <div className="space-y-3 sm:space-y-4">
              {infoBoxes.map((box, index) => {
                const Icon = box.icon;
                return (
                  <div
                    key={box.id}
                    data-testid={`info-box-${box.id}`}
                    className={
                      index !== infoBoxes.length - 1
                        ? "pb-3 sm:pb-4 border-b border-gray-200"
                        : ""
                    }
                  >
                    <div className="flex items-center mb-2 sm:mb-3">
                      <Icon
                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#3791e2] mr-2 sm:mr-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900">
                        {box.title}
                      </h3>
                    </div>
                    <ul className="space-y-0.5 ml-6 sm:ml-8" role="list">
                      {box.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-[10px] sm:text-xs lg:text-sm text-gray-700 flex items-start"
                        >
                          <span
                            className="text-[#f97d0b] mr-2 flex-shrink-0 leading-none mt-1"
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.8}>
          <div className="text-center">
            <CTAButton
              text="まずは担当者と話す"
              href="#cta"
              variant="primary"
              size="sm"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PartnerSection;
