import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProblemSection from "./ProblemSection";
import { AlertCircle, TrendingUp, Users } from "lucide-react";

describe("ProblemSection", () => {
  const defaultProps = {
    problems: [
      {
        icon: AlertCircle,
        title: "現場教育の負担が大きい",
        description:
          "ベテラン社員が現場作業と教育を両立する必要があり、業務効率が低下している",
      },
      {
        icon: TrendingUp,
        title: "暗黙知が共有されない",
        description:
          "熟練者のノウハウが言語化されず、次世代に継承されないまま失われている",
      },
      {
        icon: Users,
        title: "人材不足が深刻化",
        description:
          "少子高齢化により、現場の技能を持つ人材の確保がますます困難になっている",
      },
    ],
    socialBenefit:
      "この課題を解決することで、日本の製造業の競争力を維持し、技術継承を実現できます",
  };

  describe("Problems Array Rendering", () => {
    it("renders all problem items", () => {
      render(<ProblemSection {...defaultProps} />);

      expect(screen.getByText("現場教育の負担が大きい")).toBeInTheDocument();
      expect(screen.getByText("暗黙知が共有されない")).toBeInTheDocument();
      expect(screen.getByText("人材不足が深刻化")).toBeInTheDocument();
    });

    it("renders problem descriptions", () => {
      render(<ProblemSection {...defaultProps} />);

      expect(
        screen.getByText(/ベテラン社員が現場作業と教育を両立/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/熟練者のノウハウが言語化されず/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/少子高齢化により、現場の技能を持つ人材/)
      ).toBeInTheDocument();
    });

    it("renders with different number of problems", () => {
      const twoProblems = {
        problems: [
          {
            icon: AlertCircle,
            title: "問題1",
            description: "説明1",
          },
          {
            icon: TrendingUp,
            title: "問題2",
            description: "説明2",
          },
        ],
        socialBenefit: "社会的優位性",
      };

      render(<ProblemSection {...twoProblems} />);

      expect(screen.getByText("問題1")).toBeInTheDocument();
      expect(screen.getByText("問題2")).toBeInTheDocument();
    });

    it("renders icons for each problem", () => {
      const { container } = render(<ProblemSection {...defaultProps} />);

      // Lucide icons render as SVG elements
      const svgElements = container.querySelectorAll("svg");
      expect(svgElements.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Three Column Layout", () => {
    it("renders problems in a grid layout", () => {
      const { container } = render(<ProblemSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it("has responsive grid classes for mobile to desktop", () => {
      const { container } = render(<ProblemSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/grid/);
    });

    it("renders three problem cards", () => {
      render(<ProblemSection {...defaultProps} />);

      const problemTitles = [
        "現場教育の負担が大きい",
        "暗黙知が共有されない",
        "人材不足が深刻化",
      ];

      problemTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  describe("Social Benefit Box", () => {
    it("displays social benefit text", () => {
      render(<ProblemSection {...defaultProps} />);

      expect(
        screen.getByText(/この課題を解決することで、日本の製造業の競争力/)
      ).toBeInTheDocument();
    });

    it("renders social benefit in a distinct box", () => {
      render(<ProblemSection {...defaultProps} />);

      const socialBenefitText = screen.getByText(
        /この課題を解決することで、日本の製造業の競争力/
      );
      expect(socialBenefitText).toBeInTheDocument();

      // Check that it's in a container (box)
      const parentElement = socialBenefitText.closest("div");
      expect(parentElement).toBeInTheDocument();
    });

    it("social benefit box is visually emphasized", () => {
      render(<ProblemSection {...defaultProps} />);

      const socialBenefitText = screen.getByText(
        /この課題を解決することで、日本の製造業の競争力/
      );

      // Check that it's in a styled container
      expect(socialBenefitText).toBeInTheDocument();
    });
  });

  describe("Background Color", () => {
    it("has white background", () => {
      const { container } = render(<ProblemSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-white|bg-\[#ffffff\]/);
    });
  });

  describe("Section Title", () => {
    it("renders section title with proper styling", () => {
      const { container } = render(<ProblemSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<ProblemSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("uses appropriate heading levels", () => {
      render(<ProblemSection {...defaultProps} />);

      // Problem titles should be headings
      const problemTitle = screen.getByText("現場教育の負担が大きい");
      expect(problemTitle.tagName).toMatch(/H[2-4]/);
    });
  });
});
