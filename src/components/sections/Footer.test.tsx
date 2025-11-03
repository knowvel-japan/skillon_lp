import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  const defaultProps = {
    companyInfo: {
      name: "KNOWVEL",
      description: "現場教育の負担軽減と暗黙知の形式知化を支援します",
    },
    links: [
      { title: "サービス", url: "#services" },
      { title: "会社概要", url: "#about" },
      { title: "お問い合わせ", url: "#contact" },
      { title: "プライバシーポリシー", url: "#privacy" },
    ],
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/knowvel" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/knowvel" },
      { platform: "Facebook", url: "https://facebook.com/knowvel" },
    ],
  };

  describe("Company Info Rendering", () => {
    it("displays company name", () => {
      render(<Footer {...defaultProps} />);

      expect(screen.getByText("KNOWVEL")).toBeInTheDocument();
    });

    it("displays company description", () => {
      render(<Footer {...defaultProps} />);

      expect(
        screen.getByText("現場教育の負担軽減と暗黙知の形式知化を支援します")
      ).toBeInTheDocument();
    });
  });

  describe("Links Rendering", () => {
    it("displays all navigation links", () => {
      render(<Footer {...defaultProps} />);

      expect(screen.getByText("サービス")).toBeInTheDocument();
      expect(screen.getByText("会社概要")).toBeInTheDocument();
      expect(screen.getByText("お問い合わせ")).toBeInTheDocument();
      expect(screen.getByText("プライバシーポリシー")).toBeInTheDocument();
    });

    it("links have correct href attributes", () => {
      render(<Footer {...defaultProps} />);

      const serviceLink = screen.getByText("サービス");
      expect(serviceLink.closest("a")).toHaveAttribute("href", "#services");

      const aboutLink = screen.getByText("会社概要");
      expect(aboutLink.closest("a")).toHaveAttribute("href", "#about");
    });
  });

  describe("Social Links Rendering", () => {
    it("displays all social media links", () => {
      render(<Footer {...defaultProps} />);

      const twitterLink = screen.getByLabelText(/Twitter/i);
      expect(twitterLink).toBeInTheDocument();

      const linkedinLink = screen.getByLabelText(/LinkedIn/i);
      expect(linkedinLink).toBeInTheDocument();

      const facebookLink = screen.getByLabelText(/Facebook/i);
      expect(facebookLink).toBeInTheDocument();
    });

    it("social links have correct href attributes", () => {
      render(<Footer {...defaultProps} />);

      const twitterLink = screen.getByLabelText(/Twitter/i);
      expect(twitterLink).toHaveAttribute(
        "href",
        "https://twitter.com/knowvel"
      );

      const linkedinLink = screen.getByLabelText(/LinkedIn/i);
      expect(linkedinLink).toHaveAttribute(
        "href",
        "https://linkedin.com/company/knowvel"
      );
    });

    it("social links open in new tab", () => {
      render(<Footer {...defaultProps} />);

      const twitterLink = screen.getByLabelText(/Twitter/i);
      expect(twitterLink).toHaveAttribute("target", "_blank");
      expect(twitterLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Three Column Layout", () => {
    it("has grid layout classes", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const footerContent = container.querySelector(".grid");
      expect(footerContent).toBeInTheDocument();
    });

    it("has three columns on desktop", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const footerContent = container.querySelector(".grid");
      expect(footerContent?.className).toMatch(
        /grid-cols-3|md:grid-cols-3|lg:grid-cols-3/
      );
    });
  });

  describe("Copyright Display", () => {
    it("displays copyright text", () => {
      render(<Footer {...defaultProps} />);

      const currentYear = new Date().getFullYear();
      const copyrightText = screen.getByText(
        new RegExp(`© ${currentYear} KNOWVEL`, "i")
      );
      expect(copyrightText).toBeInTheDocument();
    });

    it("copyright includes company name", () => {
      render(<Footer {...defaultProps} />);

      const currentYear = new Date().getFullYear();
      const copyrightText = screen.getByText(
        new RegExp(`© ${currentYear} KNOWVEL`, "i")
      );
      expect(copyrightText.textContent).toContain("KNOWVEL");
    });
  });

  describe("Background Color", () => {
    it("has dark gray background (#1a1a1a)", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const footer = container.querySelector("footer");
      expect(footer?.className).toMatch(/bg-\[#1a1a1a\]|bg-gray-900/);
    });

    it("has light text color for contrast", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const footer = container.querySelector("footer");
      expect(footer?.className).toMatch(/text-white|text-gray/);
    });
  });

  describe("Responsive Layout", () => {
    it("has responsive grid classes", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const footerContent = container.querySelector(".grid");
      expect(footerContent?.className).toMatch(/grid-cols-1|md:|lg:/);
    });

    it("stacks columns on mobile", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const footerContent = container.querySelector(".grid");
      expect(footerContent?.className).toMatch(/grid-cols-1/);
    });
  });

  describe("Semantic HTML", () => {
    it("uses footer element", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });

    it("uses nav element for links", () => {
      const { container } = render(<Footer {...defaultProps} />);

      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("links are keyboard accessible", () => {
      render(<Footer {...defaultProps} />);

      const serviceLink = screen.getByText("サービス");
      expect(serviceLink.closest("a")).toHaveAttribute("href");
    });

    it("social links have aria-labels", () => {
      render(<Footer {...defaultProps} />);

      const twitterLink = screen.getByLabelText(/Twitter/i);
      expect(twitterLink).toHaveAttribute("aria-label");
    });
  });

  describe("Custom Props", () => {
    it("renders with custom company name", () => {
      const customProps = {
        ...defaultProps,
        companyInfo: {
          name: "カスタム会社",
          description: "カスタム説明",
        },
      };

      render(<Footer {...customProps} />);

      expect(screen.getByText("カスタム会社")).toBeInTheDocument();
    });

    it("renders with custom links", () => {
      const customProps = {
        ...defaultProps,
        links: [{ title: "カスタムリンク", url: "#custom" }],
      };

      render(<Footer {...customProps} />);

      expect(screen.getByText("カスタムリンク")).toBeInTheDocument();
    });
  });
});
