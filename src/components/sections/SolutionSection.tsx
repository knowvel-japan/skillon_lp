import AnimatedSection from "../shared/AnimatedSection";

interface SolutionSectionProps {
  concept: string;
  highlights: string[];
  imagePlaceholder: string;
  beforeVideoUrl?: string;
  afterVideoUrl?: string;
}

const SolutionSection = ({
  concept,
  highlights,
  imagePlaceholder,
  beforeVideoUrl,
  afterVideoUrl,
}: SolutionSectionProps) => {
  return (
    <section
      className="bg-[#edf8ff] py-8 sm:py-12 lg:py-16"
      aria-labelledby="solution-section-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-8 sm:mb-10">
            <h2
              id="solution-section-title"
              className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3791e2] mb-3"
            >
              その悩み、SkillONで解決できます！
            </h2>
          </div>
        </AnimatedSection>

        {/* Content */}
        <AnimatedSection animation="slideUp">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Highlights */}
            <div className="flex justify-center">
              <div className="highlights-container flex flex-col gap-4 items-start">
                <style>{`
                  @media (min-width: 420px) {
                    .highlights-container {
                      flex-direction: row;
                      justify-content: center;
                      align-items: flex-start;
                    }
                  }
                `}</style>
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 flex-1 min-w-0"
                  >
                    <div
                      className="flex-shrink-0 w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] bg-[#3791e2] rounded-full flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="text-white text-[8px] sm:text-[9px] font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Before/After Videos */}
        <AnimatedSection animation="fadeIn" delay={0.3}>
          <div className="mt-6 bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-sm sm:text-base font-bold text-[#3791e2]">
                スマホで撮影するだけで自動的に研修動画を生成
              </p>
            </div>

            <div className="before-after-container flex flex-col items-center gap-2">
              <style>{`
                @media (min-width: 420px) {
                  .before-after-container {
                    flex-direction: row;
                    align-items: center;
                  }
                }
              `}</style>

              {/* Before Video */}
              <div className="flex-1 min-w-0 w-full flex flex-col">
                <div className="text-center mb-2">
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                    撮影した動画
                  </span>
                </div>
                <div className="relative w-full aspect-video bg-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {beforeVideoUrl ? (
                    <iframe
                      className="w-full h-full"
                      src={beforeVideoUrl}
                      title="撮影した動画"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      撮影した動画
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="arrow-container flex items-center justify-center flex-shrink-0 my-2 sm:my-0 sm:mx-4">
                <style>{`
                  .arrow-container div {
                    transform: rotate(90deg);
                  }
                  @media (min-width: 420px) {
                    .arrow-container div {
                      transform: rotate(0deg);
                    }
                  }
                `}</style>
                <div className="text-[#f97d0b] text-2xl sm:text-xl font-bold">
                  ▶︎
                </div>
              </div>

              {/* After Video */}
              <div className="flex-1 min-w-0 w-full flex flex-col">
                <div className="text-center mb-2">
                  <span className="inline-block bg-[#3791e2] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    研修動画
                  </span>
                </div>
                <div className="relative w-full aspect-video bg-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {afterVideoUrl ? (
                    <iframe
                      className="w-full h-full"
                      src={afterVideoUrl}
                      title="研修動画"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      研修動画
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm sm:text-base text-gray-900">
                教材作成の時間を
                <span className="font-bold text-[#f97d0b]">90%削減</span>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default SolutionSection;
