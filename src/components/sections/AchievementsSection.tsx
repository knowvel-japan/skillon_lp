import AnimatedSection from "../shared/AnimatedSection";
import { Award } from "lucide-react";

interface Achievement {
  programName: string;
  year: string;
  description: string;
  logoPlaceholder: string;
  link?: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection = ({ achievements }: AchievementsSectionProps) => {
  return (
    <section
      className="bg-[#edf8ff] py-8 px-4 md:py-12 md:px-8"
      aria-labelledby="achievements-section-title"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2
            id="achievements-section-title"
            className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3791e2] text-center mb-8"
          >
            実績・採択プログラム
          </h2>
        </AnimatedSection>

        <div className="flex flex-col items-center gap-6">
          {achievements.map((achievement, index) => (
            <AnimatedSection
              key={achievement.programName}
              animation="fadeIn"
              delay={index * 0.15}
            >
              <div
                data-testid={`achievement-card-${index}`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col max-w-md"
              >
                {/* Logo/Badge Placeholder */}
                {achievement.link ? (
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-20 sm:h-24 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors"
                    aria-label={`${achievement.programName}のウェブサイトを開く`}
                  >
                    <img
                      src={achievement.logoPlaceholder}
                      alt={achievement.programName}
                      loading="lazy"
                      className="w-full h-full object-contain p-2"
                    />
                  </a>
                ) : (
                  <div
                    className="w-full h-20 sm:h-24 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                    role="img"
                    aria-label={`${achievement.programName}のロゴ`}
                  >
                    <img
                      src={achievement.logoPlaceholder}
                      alt={achievement.programName}
                      loading="lazy"
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          const svg = parent.querySelector("svg");
                          if (svg) {
                            (svg as SVGElement).style.display = "block";
                          }
                        }
                      }}
                    />
                    <Award className="w-10 h-10 text-[#f97d0b]" />
                  </div>
                )}

                {/* Year Badge */}
                <div className="flex justify-center mb-2">
                  <span className="inline-block bg-[#3791e2] text-white text-[10px] sm:text-xs font-semibold px-3 py-0.5 rounded-full">
                    {achievement.year}
                  </span>
                </div>

                {/* Program Name */}
                <p className="text-[11px] sm:text-xs lg:text-sm font-bold text-gray-900 text-center">
                  {achievement.programName}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
