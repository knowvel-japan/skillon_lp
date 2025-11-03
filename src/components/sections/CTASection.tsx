import { useState } from "react";
import AnimatedSection from "../shared/AnimatedSection";
import { Mail, User, Building, MessageSquare } from "lucide-react";

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = encodeURIComponent(
      `【お問合せ】${formData.company} - ${formData.name}様より`
    );
    const body = encodeURIComponent(
      `お名前: ${formData.name}\n` +
        `会社名: ${formData.company}\n` +
        `メールアドレス: ${formData.email}\n\n` +
        `お問合せ内容:\n${formData.message}`
    );

    window.location.href = `mailto:1209ukotaro@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="cta"
      className="bg-white py-8 px-4 md:py-12 md:px-8"
      aria-labelledby="cta-section-title"
    >
      <div className="cta-container mx-auto">
        <style>{`
          .cta-container {
            max-width: 100%;
          }
          @media (min-width: 640px) {
            .cta-container {
              max-width: 640px;
            }
          }
        `}</style>
        <AnimatedSection animation="fadeIn">
          <h2
            id="cta-section-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3791e2] text-center mb-8"
          >
            お問合せ
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[#edf8ff]/30 to-white rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-[#3791e2]/20"
            role="form"
            aria-label="お問合せフォーム"
          >
            <div className="space-y-3 sm:space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-sm lg:text-base font-semibold text-gray-700 mb-1.5"
                >
                  お名前 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-8 sm:pl-10 pr-3 py-2 text-sm sm:text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3791e2] focus:border-transparent transition-all"
                    placeholder="山田 太郎"
                    required
                  />
                </div>
              </div>

              {/* Company Field */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm sm:text-sm lg:text-base font-semibold text-gray-700 mb-1.5"
                >
                  会社名 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-8 sm:pl-10 pr-3 py-2 text-sm sm:text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3791e2] focus:border-transparent transition-all"
                    placeholder="株式会社〇〇"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-sm lg:text-base font-semibold text-gray-700 mb-1.5"
                >
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-8 sm:pl-10 pr-3 py-2 text-sm sm:text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3791e2] focus:border-transparent transition-all"
                    placeholder="example@company.com"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-sm lg:text-base font-semibold text-gray-700 mb-1.5"
                >
                  お問合せ内容 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-2.5 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full pl-8 sm:pl-10 pr-3 py-2 text-[9px] sm:text-[10px] lg:text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3791e2] focus:border-transparent transition-all resize-none"
                    placeholder="お問合せ内容をご記入ください"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#f97d0b] text-white text-sm sm:text-base lg:text-lg font-semibold py-1.5 sm:py-2 px-6 sm:px-8 lg:px-10 rounded-lg hover:bg-[#e06d00] transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg min-h-[36px] touch-manipulation"
                  aria-label="お問合せを送信"
                >
                  送信する
                </button>
              </div>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
