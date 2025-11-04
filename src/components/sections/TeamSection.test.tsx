import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TeamSection from "./TeamSection";

describe("TeamSection", () => {
  const defaultProps = {
    members: [
      {
        name: "山田太郎",
        role: "CEO / 代表取締役",
        bio: [
          "東京大学工学部卒業",
          "大手製造業で10年間の現場経験",
          "AI技術を活用した教育システムの研究開発",
        ],
        imagePlaceholder: "/images/team/member1.jpg",
      },
      {
        name: "佐藤花子",
        role: "CTO / 技術責任者",
        bio: [
          "京都大学情報学研究科修了",
          "機械学習エンジニアとして5年の経験",
          "動画解析技術の専門家",
        ],
        imagePlaceholder: "/images/team/member2.jpg",
      },
      {
        name: "鈴木一郎",
        role: "COO / 事業責任者",
        bio: [
          "慶應義塾大学経済学部卒業",
          "コンサルティングファームで7年の経験",
          "製造業のDX推進プロジェクトを多数リード",
        ],
        imagePlaceholder: "/images/team/member3.jpg",
      },
      {
        name: "田中美咲",
        role: "デザイナー / UXリード",
        bio: [
          "多摩美術大学卒業",
          "UI/UXデザイナーとして8年の経験",
          "教育系アプリのデザインを多数手がける",
        ],
        imagePlaceholder: "/images/team/member4.jpg",
      },
    ],
  };

  describe("Members Array Rendering", () => {
    it("renders all member names", () => {
      render(<TeamSection {...defaultProps} />);

      expect(screen.getByText("山田太郎")).toBeInTheDocument();
      expect(screen.getByText("佐藤花子")).toBeInTheDocument();
      expect(screen.getByText("鈴木一郎")).toBeInTheDocument();
      expect(screen.getByText("田中美咲")).toBeInTheDocument();
    });

    it("renders all member roles", () => {
      render(<TeamSection {...defaultProps} />);

      expect(screen.getByText("CEO / 代表取締役")).toBeInTheDocument();
      expect(screen.getByText("CTO / 技術責任者")).toBeInTheDocument();
      expect(screen.getByText("COO / 事業責任者")).toBeInTheDocument();
      expect(screen.getByText("デザイナー / UXリード")).toBeInTheDocument();
    });

    it("renders all bio items for each member", () => {
      render(<TeamSection {...defaultProps} />);

      expect(screen.getByText("東京大学工学部卒業")).toBeInTheDocument();
      expect(
        screen.getByText("大手製造業で10年間の現場経験")
      ).toBeInTheDocument();
      expect(
        screen.getByText("AI技術を活用した教育システムの研究開発")
      ).toBeInTheDocument();

      expect(screen.getByText("京都大学情報学研究科修了")).toBeInTheDocument();
      expect(
        screen.getByText("機械学習エンジニアとして5年の経験")
      ).toBeInTheDocument();
      expect(screen.getByText("動画解析技術の専門家")).toBeInTheDocument();
    });

    it("renders profile image placeholders", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const images = container.querySelectorAll('img, [role="img"]');
      expect(images.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Four Member Cards Display", () => {
    it("displays exactly 4 member cards", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const cards = container.querySelectorAll('[data-testid*="member-card"]');
      expect(cards.length).toBe(4);
    });

    it("each card contains name, role, and bio", () => {
      render(<TeamSection {...defaultProps} />);

      const firstMember = defaultProps.members[0];
      expect(screen.getByText(firstMember.name)).toBeInTheDocument();
      expect(screen.getByText(firstMember.role)).toBeInTheDocument();
      firstMember.bio.forEach((bioItem) => {
        expect(screen.getByText(bioItem)).toBeInTheDocument();
      });
    });

    it("renders with different member data", () => {
      const customProps = {
        members: [
          {
            name: "カスタム名前1",
            role: "カスタム役職1",
            bio: ["経歴1", "経歴2"],
            imagePlaceholder: "/custom1.jpg",
          },
          {
            name: "カスタム名前2",
            role: "カスタム役職2",
            bio: ["経歴3"],
            imagePlaceholder: "/custom2.jpg",
          },
          {
            name: "カスタム名前3",
            role: "カスタム役職3",
            bio: ["経歴4"],
            imagePlaceholder: "/custom3.jpg",
          },
          {
            name: "カスタム名前4",
            role: "カスタム役職4",
            bio: ["経歴5"],
            imagePlaceholder: "/custom4.jpg",
          },
        ],
      };

      render(<TeamSection {...customProps} />);

      expect(screen.getByText("カスタム名前1")).toBeInTheDocument();
      expect(screen.getByText("カスタム役職2")).toBeInTheDocument();
      expect(screen.getByText("経歴3")).toBeInTheDocument();
    });
  });

  describe("2x2 Grid Layout", () => {
    it("renders members in a grid layout", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it("has 2x2 grid layout for desktop", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(
        /grid-cols-2|md:grid-cols-2|lg:grid-cols-2/
      );
    });

    it("has single column layout for mobile", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/grid-cols-1/);
    });

    it("has responsive grid classes", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/md:|lg:/);
    });
  });

  describe("Background Color", () => {
    it("has white background (#ffffff)", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-white|bg-\[#ffffff\]/);
    });
  });

  describe("Section Title", () => {
    it("displays section title", () => {
      render(<TeamSection {...defaultProps} />);

      expect(
        screen.getByText(/チーム紹介|私たちのチーム|メンバー/)
      ).toBeInTheDocument();
    });

    it("uses appropriate heading level", () => {
      render(<TeamSection {...defaultProps} />);

      const title = screen.getByText(/チーム紹介|私たちのチーム|メンバー/);
      expect(title.tagName).toMatch(/H[1-3]/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses section element", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("uses list elements for bio items", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const lists = container.querySelectorAll("ul, ol");
      expect(lists.length).toBeGreaterThan(0);
    });
  });

  describe("Responsive Design", () => {
    it("adapts layout for different screen sizes", () => {
      const { container } = render(<TeamSection {...defaultProps} />);

      const section = container.querySelector("section");
      expect(section?.className).toMatch(/md:|lg:/);
    });
  });

  describe("Card Structure", () => {
    it("each card has proper structure with image, name, role, and bio", () => {
      render(<TeamSection {...defaultProps} />);

      const firstMemberName = screen.getByText("山田太郎");
      const card = firstMemberName.closest('[data-testid*="member-card"]');

      expect(card).toBeInTheDocument();
    });
  });
});
