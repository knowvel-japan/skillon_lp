import AnimatedSection from "../shared/AnimatedSection";

interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  imagePlaceholder: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

const TeamSection = ({ members }: TeamSectionProps) => {
  return (
    <section
      className="bg-white py-8 px-4 md:py-12 md:px-8"
      aria-labelledby="team-section-title"
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn">
          <h2
            id="team-section-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3791e2] text-center mb-8"
          >
            私たちのチーム
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.2}>
          <div className="bg-gradient-to-br from-[#edf8ff] to-[#3791e2]/5 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {members.map((member, index) => (
                <div
                  key={member.name}
                  data-testid={`member-card-${index}`}
                  className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border-t-4 border-[#3791e2]"
                >
                  {/* Name & Role Header */}
                  <div className="mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 text-center mb-0 whitespace-nowrap overflow-hidden text-ellipsis">
                      {member.name}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-[#f97d0b] font-semibold text-center whitespace-nowrap">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="space-y-0.5 flex-1">
                    {member.bio.map((bioItem, bioIndex) => (
                      <p
                        key={bioIndex}
                        className="text-gray-700 text-base sm:text-lg lg:text-xl leading-tight"
                      >
                        {bioItem}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TeamSection;
