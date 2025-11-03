import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FeaturesSection from "./FeaturesSection";
import { Video, Zap, BookOpen, Clock } from "lucide-react";

describe("FeaturesSection", () => {
  const defaultProps = {
    features: [
      {
        icon: Video,
        title: "自動動画生成",
        description: "撮影した映像から研修動画を自動生成します",
      },
      {
        icon: Zap,
        title: "高速処理",
        description: "AIによる高速な動画編集と字幕生成",
      },
      {
        icon: BookOpen,
        title: "教材作成",
        description: "動画から学習教材を自動的に作成",
      },
      {
        icon: Clock,
        title: "時間短縮",
        description: "教育準備時間を90%削減",
      },
    ],
    beforeAfterVideoPlaceholder: "/videos/before-after.mp4",
    differentiators: ["スマホだけで完結", "専門知識不要", "低コストで導入可能"],
  };

  describe("Features Array Rendering", () => {
    it("renders all feature items", () => {
      render(<FeaturesSection {...defaultProps} />);

      expect(screen.getByText("自動動画生成")).toBeInTheDocument();
      expect(screen.getByText("高速処理")).toBeInTheDocument();
      expect(screen.getByText("教材作成")).toBeInTheDocument();
      expect(screen.getByText("時間短縮")).toBeInTheDocument();
    });

    it("renders feature descriptions", () => {
      render(<FeaturesSection {...defaultProps} />);

      expect(
        screen.getByText("撮影した映像から研修動画を自動生成します")
      ).toBeInTheDocument();
      expect(
        screen.getByText("AIによる高速な動画編集と字幕生成")
      ).toBeInTheDocument();
      expect(
        screen.getByText("動画から学習教材を自動的に作成")
      ).toBeInTheDocument();
      expect(screen.getByText("教育準備時間を90%削減")).toBeInTheDocument();
    });

    it("renders with different number of features", () => {
      const threeFeatures = {
        ...defaultProps,
        features: [
          {
            icon: Video,
            title: "機能1",
            description: "説明1",
          },
          {
            icon: Zap,
            title: "機能2",
            description: "説明2",
          },
          {
            icon: BookOpen,
            title: "機能3",
            description: "説明3",
          },
        ],
      };

      render(<FeaturesSection {...threeFeatures} />);

      expect(screen.getByText("機能1")).toBeInTheDocument();
      expect(screen.getByText("機能2")).toBeInTheDocument();
      expect(screen.getByText("機能3")).toBeInTheDocument();
    });

    it("renders icons for each feature", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const svgElements = container.querySelectorAll("svg");
      expect(svgElements.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Feature Cards Grid Layout", () => {
    it("renders features in a grid layout", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it("has responsive grid classes", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/grid/);
    });

    it("renders feature cards with proper structure", () => {
      render(<FeaturesSection {...defaultProps} />);

      const featureTitles = [
        "自動動画生成",
        "高速処理",
        "教材作成",
        "時間短縮",
      ];

      featureTitles.forEach((title) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });

  describe("Before/After Video Placeholder", () => {
    it("displays before/after video placeholder", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const videoPlaceholder = container.querySelector(
        '[aria-label="Before/After video"]'
      );
      expect(videoPlaceholder).toBeInTheDocument();
    });

    it("video placeholder has proper dimensions", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const videoPlaceholder = container.querySelector(
        '[aria-label="Before/After video"]'
      );
      expect(videoPlaceholder).toBeInTheDocument();
      expect(videoPlaceholder?.className).toMatch(/w-|h-/);
    });
  });

  describe("Differentiators Section", () => {
    it("displays all differentiators", () => {
      render(<FeaturesSection {...defaultProps} />);

      expect(screen.getByText("スマホだけで完結")).toBeInTheDocument();
      expect(screen.getByText("専門知識不要")).toBeInTheDocument();
      expect(screen.getByText("低コストで導入可能")).toBeInTheDocument();
    });

    it("renders differentiators section with heading", () => {
      render(<FeaturesSection {...defaultProps} />);

      expect(screen.getByText(/他社との違い/)).toBeInTheDocument();
    });

    it("renders with different differentiators", () => {
      const customProps = {
        ...defaultProps,
        differentiators: ["違い1", "違い2"],
      };

      render(<FeaturesSection {...customProps} />);

      expect(screen.getByText("違い1")).toBeInTheDocument();
      expect(screen.getByText("違い2")).toBeInTheDocument();
    });
  });

  describe("Background Color", () => {
    it("has white background", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-white|bg-\[#ffffff\]/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("uses appropriate heading levels", () => {
      render(<FeaturesSection {...defaultProps} />);

      const featureTitle = screen.getByText("自動動画生成");
      expect(featureTitle.tagName).toMatch(/H[2-4]/);
    });
  });

  describe("Responsive Design", () => {
    it("adapts grid layout for different screen sizes", () => {
      const { container } = render(<FeaturesSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/md:|lg:/);
    });
  });
});
