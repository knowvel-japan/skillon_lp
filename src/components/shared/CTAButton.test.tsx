import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CTAButton from "./CTAButton";

describe("CTAButton", () => {
  describe("Rendering", () => {
    it("renders primary variant with correct styles", () => {
      render(<CTAButton text="応募する" href="#apply" variant="primary" />);

      const button = screen.getByRole("link", { name: "応募する" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "#apply");
    });

    it("renders secondary variant with correct styles", () => {
      render(
        <CTAButton text="詳細を見る" href="#details" variant="secondary" />
      );

      const button = screen.getByRole("link", { name: "詳細を見る" });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("href", "#details");
    });

    it("renders with default variant when not specified", () => {
      render(<CTAButton text="クリック" href="#" />);

      const button = screen.getByRole("link", { name: "クリック" });
      expect(button).toBeInTheDocument();
    });

    it("renders different sizes correctly", () => {
      const { rerender } = render(
        <CTAButton text="Small" href="#" size="sm" />
      );
      expect(screen.getByRole("link")).toBeInTheDocument();

      rerender(<CTAButton text="Medium" href="#" size="md" />);
      expect(screen.getByRole("link")).toBeInTheDocument();

      rerender(<CTAButton text="Large" href="#" size="lg" />);
      expect(screen.getByRole("link")).toBeInTheDocument();
    });
  });

  describe("Hover Effects", () => {
    it("applies hover styles on primary variant", async () => {
      const user = userEvent.setup();
      render(<CTAButton text="応募する" href="#apply" variant="primary" />);

      const button = screen.getByRole("link", { name: "応募する" });

      await user.hover(button);
      expect(button).toBeInTheDocument();
    });

    it("applies hover styles on secondary variant", async () => {
      const user = userEvent.setup();
      render(
        <CTAButton text="詳細を見る" href="#details" variant="secondary" />
      );

      const button = screen.getByRole("link", { name: "詳細を見る" });

      await user.hover(button);
      expect(button).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("is keyboard navigable", async () => {
      const user = userEvent.setup();
      render(<CTAButton text="応募する" href="#apply" variant="primary" />);

      const button = screen.getByRole("link", { name: "応募する" });

      await user.tab();
      expect(button).toHaveFocus();
    });

    it("has proper link semantics", () => {
      render(<CTAButton text="応募する" href="#apply" variant="primary" />);

      const button = screen.getByRole("link");
      expect(button).toHaveAttribute("href", "#apply");
    });

    it("has focus ring for keyboard navigation", () => {
      render(<CTAButton text="応募する" href="#apply" variant="primary" />);

      const button = screen.getByRole("link", { name: "応募する" });
      expect(button.className).toContain("focus:ring");
    });
  });
});
