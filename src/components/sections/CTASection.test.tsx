import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CTASection from "./CTASection";

describe("CTASection", () => {
  const defaultProps = {
    primaryCTA: {
      text: "応募する",
      link: "#apply",
    },
    secondaryCTA: {
      text: "担当者と話す",
      link: "#contact",
    },
    formType: "link" as const,
  };

  describe("Two CTA Buttons Display", () => {
    it("displays primary CTA button", () => {
      render(<CTASection {...defaultProps} />);

      const primaryButton = screen.getByText("応募する");
      expect(primaryButton).toBeInTheDocument();
    });

    it("displays secondary CTA button", () => {
      render(<CTASection {...defaultProps} />);

      const secondaryButton = screen.getByText("担当者と話す");
      expect(secondaryButton).toBeInTheDocument();
    });

    it("primary CTA button has correct link", () => {
      render(<CTASection {...defaultProps} />);

      const primaryButton = screen.getByText("応募する");
      expect(primaryButton.closest("a")).toHaveAttribute("href", "#apply");
    });

    it("secondary CTA button has correct link", () => {
      render(<CTASection {...defaultProps} />);

      const secondaryButton = screen.getByText("担当者と話す");
      expect(secondaryButton.closest("a")).toHaveAttribute("href", "#contact");
    });

    it("primary CTA button has primary styling with orange background", () => {
      render(<CTASection {...defaultProps} />);

      const primaryButton = screen.getByText("応募する");
      const link = primaryButton.closest("a");
      expect(link?.className).toMatch(/bg-\[#f97d0b\]/);
    });

    it("secondary CTA button has secondary styling", () => {
      render(<CTASection {...defaultProps} />);

      const secondaryButton = screen.getByText("担当者と話す");
      const link = secondaryButton.closest("a");
      expect(link?.className).toMatch(/border|outline/);
    });
  });

  describe("Application Barrier Reduction Text", () => {
    it("displays barrier reduction text", () => {
      render(<CTASection {...defaultProps} />);

      expect(screen.getByText(/3分で完了/)).toBeInTheDocument();
    });

    it("displays encouraging message", () => {
      render(<CTASection {...defaultProps} />);

      const encouragingText =
        screen.getAllByText(/お気軽にお問い合わせください/);
      expect(encouragingText.length).toBeGreaterThan(0);
    });
  });

  describe("Form or Link Display", () => {
    it("displays form link when formType is link", () => {
      render(<CTASection {...defaultProps} />);

      const formLink = screen.getByText(/応募する/);
      expect(formLink).toBeInTheDocument();
    });

    it("displays inline form when formType is inline", () => {
      const propsWithInlineForm = {
        ...defaultProps,
        formType: "inline" as const,
      };

      render(<CTASection {...propsWithInlineForm} />);

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
    });

    it("inline form has email input", () => {
      const propsWithInlineForm = {
        ...defaultProps,
        formType: "inline" as const,
      };

      render(<CTASection {...propsWithInlineForm} />);

      const emailInput = screen.getByLabelText(/メール|email/i);
      expect(emailInput).toBeInTheDocument();
    });

    it("inline form has submit button", () => {
      const propsWithInlineForm = {
        ...defaultProps,
        formType: "inline" as const,
      };

      render(<CTASection {...propsWithInlineForm} />);

      const submitButton = screen.getByRole("button", { name: /送信|応募/ });
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("Background Color", () => {
    it("has white background (#ffffff)", () => {
      const { container } = render(<CTASection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-white|bg-\[#ffffff\]/);
    });
  });

  describe("Pulse Effect", () => {
    it("primary button has animation classes", () => {
      render(<CTASection {...defaultProps} />);

      const primaryButton = screen.getByText("応募する");
      const link = primaryButton.closest("a");
      expect(link?.className).toMatch(/animate|pulse|transition/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<CTASection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("uses appropriate heading for section title", () => {
      render(<CTASection {...defaultProps} />);

      const heading = screen.getByText("今すぐ参加しませんか？");
      expect(heading.tagName).toMatch(/H[1-3]/);
    });
  });

  describe("Responsive Design", () => {
    it("has responsive layout classes", () => {
      const { container } = render(<CTASection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/md:|lg:/);
    });

    it("buttons are touch-friendly on mobile", () => {
      render(<CTASection {...defaultProps} />);

      const primaryButton = screen.getByText("応募する");
      const link = primaryButton.closest("a");
      expect(link?.className).toMatch(/px-|py-|p-/);
    });
  });

  describe("Custom Props", () => {
    it("renders with custom primary CTA text", () => {
      const customProps = {
        ...defaultProps,
        primaryCTA: {
          text: "カスタム応募",
          link: "#custom",
        },
      };

      render(<CTASection {...customProps} />);

      expect(screen.getByText("カスタム応募")).toBeInTheDocument();
    });

    it("renders with custom secondary CTA text", () => {
      const customProps = {
        ...defaultProps,
        secondaryCTA: {
          text: "カスタム問い合わせ",
          link: "#custom-contact",
        },
      };

      render(<CTASection {...customProps} />);

      expect(screen.getByText("カスタム問い合わせ")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("CTA buttons are keyboard accessible", () => {
      render(<CTASection {...defaultProps} />);

      const primaryButton = screen.getByText("応募する");
      const link = primaryButton.closest("a");
      expect(link).toHaveAttribute("href");
    });

    it("has proper ARIA labels if needed", () => {
      const propsWithInlineForm = {
        ...defaultProps,
        formType: "inline" as const,
      };

      render(<CTASection {...propsWithInlineForm} />);

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
    });
  });
});
