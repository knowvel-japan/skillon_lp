import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PartnerSection from "./PartnerSection";

describe("PartnerSection", () => {
  const defaultProps = {
    partnerInfo: {
      target: [
        "製造業の現場教育担当者",
        "技術継承に課題を持つ企業",
        "DX推進を検討中の企業",
      ],
      fields: [
        "製造業（組立、加工、検査など）",
        "建設業",
        "医療・介護",
        "物流・倉庫",
      ],
      schedule: "2025年1月〜3月（3ヶ月間のPoC実施）",
      conditions: [
        "スマートフォンでの撮影が可能な環境",
        "月1回のフィードバックミーティングへの参加",
        "PoC終了後のアンケート・インタビューへの協力",
      ],
    },
  };

  describe("PartnerInfo Rendering", () => {
    it("renders all target items", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(screen.getByText("製造業の現場教育担当者")).toBeInTheDocument();
      expect(screen.getByText("技術継承に課題を持つ企業")).toBeInTheDocument();
      expect(screen.getByText("DX推進を検討中の企業")).toBeInTheDocument();
    });

    it("renders all field items", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(
        screen.getByText("製造業（組立、加工、検査など）")
      ).toBeInTheDocument();
      expect(screen.getByText("建設業")).toBeInTheDocument();
      expect(screen.getByText("医療・介護")).toBeInTheDocument();
      expect(screen.getByText("物流・倉庫")).toBeInTheDocument();
    });

    it("renders schedule information", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(
        screen.getByText("2025年1月〜3月（3ヶ月間のPoC実施）")
      ).toBeInTheDocument();
    });

    it("renders all condition items", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(
        screen.getByText("スマートフォンでの撮影が可能な環境")
      ).toBeInTheDocument();
      expect(
        screen.getByText("月1回のフィードバックミーティングへの参加")
      ).toBeInTheDocument();
      expect(
        screen.getByText("PoC終了後のアンケート・インタビューへの協力")
      ).toBeInTheDocument();
    });
  });

  describe("Four Information Boxes Display", () => {
    it("displays recruitment target box", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(screen.getByText(/募集対象/)).toBeInTheDocument();
    });

    it("displays recruitment fields box", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(screen.getByText(/募集分野/)).toBeInTheDocument();
    });

    it("displays PoC schedule box", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(screen.getByText(/PoC時期・スケジュール/)).toBeInTheDocument();
    });

    it("displays participation conditions box", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(screen.getByText(/参加条件/)).toBeInTheDocument();
    });

    it("renders all four information boxes", () => {
      const { container } = render(<PartnerSection {...defaultProps} />);

      const boxes = container.querySelectorAll('[data-testid*="info-box"]');
      expect(boxes.length).toBe(4);
    });
  });

  describe("CTA Button Display", () => {
    it("displays CTA button", () => {
      render(<PartnerSection {...defaultProps} />);

      const ctaButton = screen.getByText(/詳細を見る|応募する/);
      expect(ctaButton).toBeInTheDocument();
    });

    it("CTA button has correct link", () => {
      render(<PartnerSection {...defaultProps} />);

      const ctaButton = screen.getByText(/詳細を見る|応募する/);
      expect(ctaButton.closest("a")).toHaveAttribute("href");
    });

    it("CTA button has primary styling", () => {
      render(<PartnerSection {...defaultProps} />);

      const ctaButton = screen.getByText(/詳細を見る|応募する/);
      const link = ctaButton.closest("a");
      expect(link?.className).toMatch(/bg-\[#f97d0b\]/);
    });
  });

  describe("Background Color", () => {
    it("has light blue background (#edf8ff)", () => {
      const { container } = render(<PartnerSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-\[#edf8ff\]/);
    });
  });

  describe("Section Title Styling", () => {
    it("displays section title", () => {
      render(<PartnerSection {...defaultProps} />);

      expect(screen.getByText(/共創パートナー募集/)).toBeInTheDocument();
    });

    it("section title has bold and blue styling", () => {
      render(<PartnerSection {...defaultProps} />);

      const title = screen.getByText(/共創パートナー募集/);
      expect(title.className).toMatch(/font-bold|font-semibold/);
      expect(title.className).toMatch(/text-\[#3791e2\]/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<PartnerSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("uses appropriate heading levels", () => {
      render(<PartnerSection {...defaultProps} />);

      const title = screen.getByText(/共創パートナー募集/);
      expect(title.tagName).toMatch(/H[1-3]/);
    });
  });

  describe("Responsive Design", () => {
    it("has responsive layout classes", () => {
      const { container } = render(<PartnerSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/md:|lg:/);
    });
  });

  describe("Custom Props", () => {
    it("renders with different target items", () => {
      const customProps = {
        partnerInfo: {
          target: ["カスタム対象1", "カスタム対象2"],
          fields: ["分野1"],
          schedule: "カスタムスケジュール",
          conditions: ["条件1"],
        },
      };

      render(<PartnerSection {...customProps} />);

      expect(screen.getByText("カスタム対象1")).toBeInTheDocument();
      expect(screen.getByText("カスタム対象2")).toBeInTheDocument();
    });

    it("renders with different schedule", () => {
      const customProps = {
        partnerInfo: {
          target: ["対象1"],
          fields: ["分野1"],
          schedule: "2025年4月〜6月",
          conditions: ["条件1"],
        },
      };

      render(<PartnerSection {...customProps} />);

      expect(screen.getByText("2025年4月〜6月")).toBeInTheDocument();
    });
  });
});
