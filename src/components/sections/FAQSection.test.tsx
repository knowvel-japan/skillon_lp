import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQSection from "./FAQSection";

describe("FAQSection", () => {
  const defaultProps = {
    faqs: [
      {
        question: "PoC参加に費用はかかりますか？",
        answer:
          "PoC期間中は無償でご利用いただけます。正式導入時の費用については、個別にご相談させていただきます。",
      },
      {
        question: "どのような業種が対象ですか？",
        answer:
          "製造業、建設業、医療・介護、小売業など、現場での技能伝承や教育が必要な全ての業種が対象です。",
      },
      {
        question: "導入までにどのくらいの期間が必要ですか？",
        answer:
          "PoC開始まで約2週間、実証期間は3ヶ月を予定しています。お客様の状況に応じて柔軟に対応いたします。",
      },
      {
        question: "既存の研修システムとの連携は可能ですか？",
        answer:
          "はい、API連携により既存のLMSやeラーニングシステムとの統合が可能です。",
      },
      {
        question: "セキュリティ対策はどうなっていますか？",
        answer:
          "データは全て暗号化され、ISO27001準拠のセキュアな環境で管理されます。お客様のデータは厳重に保護されます。",
      },
    ],
  };

  describe("FAQs Array Rendering", () => {
    it("renders all FAQ questions", () => {
      render(<FAQSection {...defaultProps} />);

      expect(
        screen.getByText("PoC参加に費用はかかりますか？")
      ).toBeInTheDocument();
      expect(
        screen.getByText("どのような業種が対象ですか？")
      ).toBeInTheDocument();
      expect(
        screen.getByText("導入までにどのくらいの期間が必要ですか？")
      ).toBeInTheDocument();
      expect(
        screen.getByText("既存の研修システムとの連携は可能ですか？")
      ).toBeInTheDocument();
      expect(
        screen.getByText("セキュリティ対策はどうなっていますか？")
      ).toBeInTheDocument();
    });

    it("renders correct number of FAQ items", () => {
      render(<FAQSection {...defaultProps} />);

      const questions = defaultProps.faqs.map((faq) => faq.question);
      questions.forEach((question) => {
        expect(screen.getByText(question)).toBeInTheDocument();
      });
    });

    it("renders with different FAQ data", () => {
      const customProps = {
        faqs: [
          {
            question: "カスタム質問1",
            answer: "カスタム回答1",
          },
          {
            question: "カスタム質問2",
            answer: "カスタム回答2",
          },
        ],
      };

      render(<FAQSection {...customProps} />);

      expect(screen.getByText("カスタム質問1")).toBeInTheDocument();
      expect(screen.getByText("カスタム質問2")).toBeInTheDocument();
    });
  });

  describe("Accordion Component Behavior", () => {
    it("answers are initially hidden", () => {
      render(<FAQSection {...defaultProps} />);

      const firstAnswer =
        screen.queryByText(/PoC期間中は無償でご利用いただけます/);
      expect(firstAnswer).not.toBeInTheDocument();
    });

    it("clicking a question reveals the answer", async () => {
      const user = userEvent.setup();
      render(<FAQSection {...defaultProps} />);

      const firstQuestion = screen.getByText("PoC参加に費用はかかりますか？");
      await user.click(firstQuestion);

      const firstAnswer =
        screen.getByText(/PoC期間中は無償でご利用いただけます/);
      expect(firstAnswer).toBeInTheDocument();
    });

    it("clicking an open question hides the answer", async () => {
      const user = userEvent.setup();
      render(<FAQSection {...defaultProps} />);

      const firstQuestion = screen.getByText("PoC参加に費用はかかりますか？");

      // Open
      await user.click(firstQuestion);
      const firstAnswer =
        screen.getByText(/PoC期間中は無償でご利用いただけます/);
      expect(firstAnswer).toBeInTheDocument();

      // Close
      await user.click(firstQuestion);
      await waitFor(() => {
        const closedAnswer =
          screen.queryByText(/PoC期間中は無償でご利用いただけます/);
        expect(closedAnswer).not.toBeInTheDocument();
      });
    });

    it("multiple items can be opened independently", async () => {
      const user = userEvent.setup();
      render(<FAQSection {...defaultProps} />);

      const firstQuestion = screen.getByText("PoC参加に費用はかかりますか？");
      const secondQuestion = screen.getByText("どのような業種が対象ですか？");

      await user.click(firstQuestion);
      await user.click(secondQuestion);

      const firstAnswer =
        screen.getByText(/PoC期間中は無償でご利用いただけます/);
      const secondAnswer = screen.getByText(/製造業、建設業、医療・介護/);

      expect(firstAnswer).toBeInTheDocument();
      expect(secondAnswer).toBeInTheDocument();
    });
  });

  describe("Question and Answer Display", () => {
    it("displays all questions correctly", () => {
      render(<FAQSection {...defaultProps} />);

      defaultProps.faqs.forEach((faq) => {
        expect(screen.getByText(faq.question)).toBeInTheDocument();
      });
    });

    it("displays answers when accordion is opened", async () => {
      const user = userEvent.setup();
      render(<FAQSection {...defaultProps} />);

      for (const faq of defaultProps.faqs) {
        const question = screen.getByText(faq.question);
        await user.click(question);

        const answerRegex = new RegExp(faq.answer.substring(0, 20));
        expect(screen.getByText(answerRegex)).toBeInTheDocument();

        // Close it for next iteration
        await user.click(question);
      }
    });

    it("questions are styled as clickable elements", () => {
      const { container } = render(<FAQSection {...defaultProps} />);

      const firstQuestion = screen.getByText("PoC参加に費用はかかりますか？");
      const button = firstQuestion.closest("button");

      expect(button).toBeInTheDocument();
    });
  });

  describe("Background Color", () => {
    it("has light blue background (#edf8ff)", () => {
      const { container } = render(<FAQSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-\[#edf8ff\]|bg-light-blue/);
    });
  });

  describe("Section Title", () => {
    it("displays section title", () => {
      render(<FAQSection {...defaultProps} />);

      expect(screen.getByText(/よくある質問|FAQ/)).toBeInTheDocument();
    });

    it("uses appropriate heading level", () => {
      render(<FAQSection {...defaultProps} />);

      const title = screen.getByText(/よくある質問|FAQ/);
      expect(title.tagName).toMatch(/H[1-3]/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<FAQSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("uses button elements for questions", () => {
      render(<FAQSection {...defaultProps} />);

      const firstQuestion = screen.getByText("PoC参加に費用はかかりますか？");
      const button = firstQuestion.closest("button");

      expect(button).toBeInTheDocument();
      expect(button?.tagName).toBe("BUTTON");
    });
  });

  describe("Responsive Design", () => {
    it("has responsive layout classes", () => {
      const { container } = render(<FAQSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/md:|lg:|px-|py-/);
    });

    it("FAQ items are readable on mobile", () => {
      const { container } = render(<FAQSection {...defaultProps} />);

      const faqContainer = container.querySelector('[class*="max-w"]');
      expect(faqContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("questions are keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<FAQSection {...defaultProps} />);

      const firstQuestion = screen.getByText("PoC参加に費用はかかりますか？");
      const button = firstQuestion.closest("button");

      expect(button).toBeInTheDocument();
      button?.focus();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      const firstAnswer =
        screen.getByText(/PoC期間中は無償でご利用いただけます/);
      expect(firstAnswer).toBeInTheDocument();
    });

    it("has proper ARIA attributes for accordion", () => {
      render(<FAQSection {...defaultProps} />);

      const firstQuestion = screen.getByText("PoC参加に費用はかかりますか？");
      const button = firstQuestion.closest("button");

      expect(button).toHaveAttribute("aria-expanded");
    });
  });

  describe("Animation", () => {
    it("has animation classes for accordion open/close", () => {
      const { container } = render(<FAQSection {...defaultProps} />);

      const animatedElements = container.querySelectorAll(
        '[class*="transition"], [class*="animate"]'
      );
      expect(animatedElements.length).toBeGreaterThan(0);
    });
  });

  describe("Custom Props", () => {
    it("handles empty FAQ array gracefully", () => {
      const emptyProps = {
        faqs: [],
      };

      const { container } = render(<FAQSection {...emptyProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("handles single FAQ item", () => {
      const singleProps = {
        faqs: [
          {
            question: "単一の質問",
            answer: "単一の回答",
          },
        ],
      };

      render(<FAQSection {...singleProps} />);

      expect(screen.getByText("単一の質問")).toBeInTheDocument();
    });

    it("handles many FAQ items (8+)", () => {
      const manyProps = {
        faqs: Array.from({ length: 10 }, (_, i) => ({
          question: `質問 ${i + 1}`,
          answer: `回答 ${i + 1}`,
        })),
      };

      render(<FAQSection {...manyProps} />);

      expect(screen.getByText("質問 1")).toBeInTheDocument();
      expect(screen.getByText("質問 10")).toBeInTheDocument();
    });
  });
});
