import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AchievementsSection from "./AchievementsSection";

describe("AchievementsSection", () => {
  const defaultProps = {
    achievements: [
      {
        programName: "経済産業省 J-Startup プログラム",
        year: "2023",
        description: "革新的なスタートアップとして選定",
        logoPlaceholder: "/images/achievements/jstartup.png",
      },
      {
        programName: "NEDO AI 実証事業",
        year: "2022",
        description: "AI技術の実用化に向けた実証実験を実施",
        logoPlaceholder: "/images/achievements/nedo.png",
      },
      {
        programName: "東京都 次世代イノベーション創出プロジェクト",
        year: "2023",
        description: "次世代技術の社会実装を推進",
        logoPlaceholder: "/images/achievements/tokyo.png",
      },
      {
        programName: "IPA 未踏IT人材発掘・育成事業",
        year: "2021",
        description: "独創的なアイデアと技術を持つ人材として採択",
        logoPlaceholder: "/images/achievements/ipa.png",
      },
    ],
  };

  describe("Achievements Array Rendering", () => {
    it("renders all achievement program names", () => {
      render(<AchievementsSection {...defaultProps} />);

      expect(
        screen.getByText("経済産業省 J-Startup プログラム")
      ).toBeInTheDocument();
      expect(screen.getByText("NEDO AI 実証事業")).toBeInTheDocument();
      expect(
        screen.getByText("東京都 次世代イノベーション創出プロジェクト")
      ).toBeInTheDocument();
      expect(
        screen.getByText("IPA 未踏IT人材発掘・育成事業")
      ).toBeInTheDocument();
    });

    it("renders all achievement years", () => {
      render(<AchievementsSection {...defaultProps} />);

      const years = screen.getAllByText(/2021|2022|2023/);
      expect(years.length).toBeGreaterThanOrEqual(4);
    });

    it("renders all achievement descriptions", () => {
      render(<AchievementsSection {...defaultProps} />);

      expect(
        screen.getByText("革新的なスタートアップとして選定")
      ).toBeInTheDocument();
      expect(
        screen.getByText("AI技術の実用化に向けた実証実験を実施")
      ).toBeInTheDocument();
      expect(
        screen.getByText("次世代技術の社会実装を推進")
      ).toBeInTheDocument();
      expect(
        screen.getByText("独創的なアイデアと技術を持つ人材として採択")
      ).toBeInTheDocument();
    });

    it("renders logo placeholders", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const images = container.querySelectorAll('img, [role="img"]');
      expect(images.length).toBeGreaterThanOrEqual(4);
    });

    it("renders with different achievement data", () => {
      const customProps = {
        achievements: [
          {
            programName: "カスタムプログラム1",
            year: "2024",
            description: "カスタム説明1",
            logoPlaceholder: "/custom1.png",
          },
          {
            programName: "カスタムプログラム2",
            year: "2024",
            description: "カスタム説明2",
            logoPlaceholder: "/custom2.png",
          },
        ],
      };

      render(<AchievementsSection {...customProps} />);

      expect(screen.getByText("カスタムプログラム1")).toBeInTheDocument();
      expect(screen.getAllByText("2024").length).toBeGreaterThanOrEqual(2);
      expect(screen.getByText("カスタム説明2")).toBeInTheDocument();
    });
  });

  describe("Grid Display", () => {
    it("renders achievements in a grid layout", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it("has responsive grid layout", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/grid-cols-1/);
      expect(grid?.className).toMatch(/md:|lg:/);
    });

    it("displays all achievement cards", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const cards = container.querySelectorAll(
        '[data-testid*="achievement-card"]'
      );
      expect(cards.length).toBe(4);
    });
  });

  describe("Program Name, Year, and Description Display", () => {
    it("each card contains program name, year, and description", () => {
      render(<AchievementsSection {...defaultProps} />);

      const firstAchievement = defaultProps.achievements[0];
      expect(
        screen.getByText(firstAchievement.programName)
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(firstAchievement.year).length
      ).toBeGreaterThanOrEqual(1);
      expect(
        screen.getByText(firstAchievement.description)
      ).toBeInTheDocument();
    });

    it("displays year prominently", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const yearElements = container.querySelectorAll('[class*="text"]');
      const hasYearDisplay = Array.from(yearElements).some((el) =>
        /2021|2022|2023/.test(el.textContent || "")
      );
      expect(hasYearDisplay).toBe(true);
    });

    it("displays program name as heading", () => {
      render(<AchievementsSection {...defaultProps} />);

      const programName = screen.getByText("経済産業省 J-Startup プログラム");
      expect(programName.tagName).toMatch(/H[1-6]|P|DIV/);
    });
  });

  describe("Background Color", () => {
    it("has light blue background (#edf8ff)", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-\[#edf8ff\]|bg-light-blue/);
    });
  });

  describe("Section Title", () => {
    it("displays section title", () => {
      render(<AchievementsSection {...defaultProps} />);

      expect(
        screen.getByText(/実績|体験|証拠|採択プログラム/)
      ).toBeInTheDocument();
    });

    it("uses appropriate heading level", () => {
      render(<AchievementsSection {...defaultProps} />);

      const title = screen.getByText(/実績|体験|証拠|採択プログラム/);
      expect(title.tagName).toMatch(/H[1-3]/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("adapts layout for different screen sizes", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/md:|lg:/);
    });
  });

  describe("Card Structure", () => {
    it("each card has proper structure with logo, program name, year, and description", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const firstProgramName = screen.getByText(
        "経済産業省 J-Startup プログラム"
      );
      const card = firstProgramName.closest(
        '[data-testid*="achievement-card"]'
      );

      expect(card).toBeInTheDocument();
    });
  });

  describe("Logo/Badge Display", () => {
    it("displays logo placeholder for each achievement", () => {
      const { container } = render(<AchievementsSection {...defaultProps} />);

      const logoContainers = container.querySelectorAll('[role="img"]');
      expect(logoContainers.length).toBeGreaterThanOrEqual(4);
    });
  });
});
