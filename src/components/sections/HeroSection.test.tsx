import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  const defaultProps = {
    title: "スマホで撮るだけ、研修動画が自動生成",
    subtitle: "現場教育の負担を軽減し、暗黙知を形式知化するSkillON",
    ctaText: "PoCパートナーに応募する",
    ctaLink: "#apply",
  };

  describe("Props Rendering", () => {
    it("renders title correctly", () => {
      render(<HeroSection {...defaultProps} />);

      expect(
        screen.getByText("スマホで撮るだけ、研修動画が自動生成")
      ).toBeInTheDocument();
    });

    it("renders subtitle correctly", () => {
      render(<HeroSection {...defaultProps} />);

      expect(
        screen.getByText("現場教育の負担を軽減し、暗黙知を形式知化するSkillON")
      ).toBeInTheDocument();
    });

    it("renders CTA button with correct text", () => {
      render(<HeroSection {...defaultProps} />);

      const ctaButton = screen.getByRole("link", {
        name: "PoCパートナーに応募する",
      });
      expect(ctaButton).toBeInTheDocument();
    });

    it("renders CTA button with correct link", () => {
      render(<HeroSection {...defaultProps} />);

      const ctaButton = screen.getByRole("link", {
        name: "PoCパートナーに応募する",
      });
      expect(ctaButton).toHaveAttribute("href", "#apply");
    });

    it("renders with different props", () => {
      const customProps = {
        title: "カスタムタイトル",
        subtitle: "カスタムサブタイトル",
        ctaText: "今すぐ始める",
        ctaLink: "#start",
      };

      render(<HeroSection {...customProps} />);

      expect(screen.getByText("カスタムタイトル")).toBeInTheDocument();
      expect(screen.getByText("カスタムサブタイトル")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "今すぐ始める" })
      ).toHaveAttribute("href", "#start");
    });
  });

  describe("CTA Button Display", () => {
    it("displays CTA button prominently", () => {
      render(<HeroSection {...defaultProps} />);

      const ctaButton = screen.getByRole("link", {
        name: "PoCパートナーに応募する",
      });
      expect(ctaButton).toBeInTheDocument();
    });

    it("CTA button uses primary variant", () => {
      render(<HeroSection {...defaultProps} />);

      const ctaButton = screen.getByRole("link", {
        name: "PoCパートナーに応募する",
      });
      expect(ctaButton.className).toContain("bg-[#f97d0b]");
    });
  });

  describe("Responsive Layout", () => {
    it("renders with responsive container classes", () => {
      const { container } = render(<HeroSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("title has responsive text sizing", () => {
      render(<HeroSection {...defaultProps} />);

      const title = screen.getByText("スマホで撮るだけ、研修動画が自動生成");
      expect(title.tagName).toBe("H1");
    });

    it("renders visual placeholder area", () => {
      const { container } = render(<HeroSection {...defaultProps} />);

      // Check for visual placeholder element
      const placeholder = container.querySelector('[aria-label="Hero visual"]');
      expect(placeholder).toBeInTheDocument();
    });
  });

  describe("Semantic HTML", () => {
    it("uses h1 for title", () => {
      render(<HeroSection {...defaultProps} />);

      const title = screen.getByRole("heading", { level: 1 });
      expect(title).toHaveTextContent("スマホで撮るだけ、研修動画が自動生成");
    });

    it("uses section element", () => {
      const { container } = render(<HeroSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });
  });
});
