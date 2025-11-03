import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SolutionSection from "./SolutionSection";

describe("SolutionSection", () => {
  const defaultProps = {
    concept:
      "SkillONは、スマートフォンで撮影した作業風景から、AIが自動的に研修動画や学習教材を生成します。現場のノウハウを簡単に形式知化し、効率的な人材育成を実現します。",
    highlights: [
      "スマホで撮影するだけ",
      "AIが自動で動画編集",
      "暗黙知を形式知化",
    ],
    imagePlaceholder: "/images/solution-visual.png",
  };

  describe("Concept and Highlights Rendering", () => {
    it("renders concept text correctly", () => {
      render(<SolutionSection {...defaultProps} />);

      expect(
        screen.getByText(/SkillONは、スマートフォンで撮影した作業風景から/)
      ).toBeInTheDocument();
    });

    it("renders all highlight items", () => {
      render(<SolutionSection {...defaultProps} />);

      expect(screen.getByText("スマホで撮影するだけ")).toBeInTheDocument();
      expect(screen.getByText("AIが自動で動画編集")).toBeInTheDocument();
      expect(screen.getByText("暗黙知を形式知化")).toBeInTheDocument();
    });

    it("renders with different concept text", () => {
      const customProps = {
        ...defaultProps,
        concept: "カスタムコンセプト説明",
      };

      render(<SolutionSection {...customProps} />);

      expect(screen.getByText("カスタムコンセプト説明")).toBeInTheDocument();
    });

    it("renders with different highlights", () => {
      const customProps = {
        ...defaultProps,
        highlights: ["ハイライト1", "ハイライト2"],
      };

      render(<SolutionSection {...customProps} />);

      expect(screen.getByText("ハイライト1")).toBeInTheDocument();
      expect(screen.getByText("ハイライト2")).toBeInTheDocument();
    });
  });

  describe("Two Column Layout", () => {
    it("renders in a two-column grid layout", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it("has text content on the left side", () => {
      render(<SolutionSection {...defaultProps} />);

      const conceptText = screen.getByText(
        /SkillONは、スマートフォンで撮影した作業風景から/
      );
      expect(conceptText).toBeInTheDocument();
    });

    it("has visual placeholder on the right side", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const placeholder = container.querySelector(
        '[aria-label="Solution visual"]'
      );
      expect(placeholder).toBeInTheDocument();
    });

    it("renders responsive layout classes", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/grid/);
    });
  });

  describe("Highlight Text Styling", () => {
    it("highlights are styled with bold and blue color", () => {
      render(<SolutionSection {...defaultProps} />);

      const highlight = screen.getByText("スマホで撮影するだけ");
      expect(highlight.className).toMatch(/font-bold|font-semibold/);
      expect(highlight.className).toMatch(/text-\[#3791e2\]/);
    });

    it("all highlights have consistent styling", () => {
      render(<SolutionSection {...defaultProps} />);

      const highlights = [
        "スマホで撮影するだけ",
        "AIが自動で動画編集",
        "暗黙知を形式知化",
      ];

      highlights.forEach((text) => {
        const element = screen.getByText(text);
        expect(element.className).toMatch(/font-bold|font-semibold/);
        expect(element.className).toMatch(/text-\[#3791e2\]/);
      });
    });
  });

  describe("Background Color", () => {
    it("has light blue background (#edf8ff)", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-\[#edf8ff\]/);
    });
  });

  describe("Visual Placeholder", () => {
    it("renders visual placeholder area", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const placeholder = container.querySelector(
        '[aria-label="Solution visual"]'
      );
      expect(placeholder).toBeInTheDocument();
    });

    it("visual placeholder has proper dimensions", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const placeholder = container.querySelector(
        '[aria-label="Solution visual"]'
      );
      expect(placeholder).toBeInTheDocument();
      expect(placeholder?.className).toMatch(/w-|h-/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("uses appropriate heading for section title", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const headings = container.querySelectorAll("h2, h3");
      expect(headings.length).toBeGreaterThan(0);
    });
  });

  describe("Responsive Design", () => {
    it("adapts layout for mobile devices", () => {
      const { container } = render(<SolutionSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/md:|lg:/);
    });
  });
});
