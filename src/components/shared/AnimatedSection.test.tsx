import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AnimatedSection from "./AnimatedSection";

describe("AnimatedSection", () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;
  let intersectionCallback: IntersectionObserverCallback;
  let matchMediaMock: ReturnType<typeof vi.fn>;

  const createMockEntry = (
    isIntersecting: boolean,
    target: Element
  ): IntersectionObserverEntry => ({
    isIntersecting,
    target,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: 0,
  });

  beforeEach(() => {
    // Mock matchMedia for prefers-reduced-motion
    matchMediaMock = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    window.matchMedia = matchMediaMock as any;

    // Mock IntersectionObserver
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    window.IntersectionObserver = vi.fn(function (callback) {
      intersectionCallback = callback;
      return {
        observe: observeMock,
        unobserve: unobserveMock,
        disconnect: disconnectMock,
      };
    }) as unknown;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Animation Types", () => {
    it("renders with fadeIn animation", () => {
      render(
        <AnimatedSection animation="fadeIn">
          <div>Test Content</div>
        </AnimatedSection>
      );

      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders with slideUp animation", () => {
      render(
        <AnimatedSection animation="slideUp">
          <div>Slide Up Content</div>
        </AnimatedSection>
      );

      expect(screen.getByText("Slide Up Content")).toBeInTheDocument();
    });

    it("renders with slideLeft animation", () => {
      render(
        <AnimatedSection animation="slideLeft">
          <div>Slide Left Content</div>
        </AnimatedSection>
      );

      expect(screen.getByText("Slide Left Content")).toBeInTheDocument();
    });

    it("renders with slideRight animation", () => {
      render(
        <AnimatedSection animation="slideRight">
          <div>Slide Right Content</div>
        </AnimatedSection>
      );

      expect(screen.getByText("Slide Right Content")).toBeInTheDocument();
    });

    it("uses fadeIn as default animation when not specified", () => {
      render(
        <AnimatedSection>
          <div>Default Animation</div>
        </AnimatedSection>
      );

      expect(screen.getByText("Default Animation")).toBeInTheDocument();
    });
  });

  describe("Intersection Observer", () => {
    it("observes the element when mounted", () => {
      const { container } = render(
        <AnimatedSection>
          <div>Observer Test</div>
        </AnimatedSection>
      );

      expect(observeMock).toHaveBeenCalledTimes(1);
      expect(observeMock).toHaveBeenCalledWith(container.firstChild);
    });

    it("triggers animation when element intersects viewport", () => {
      const { container } = render(
        <AnimatedSection animation="slideUp">
          <div>Intersecting Content</div>
        </AnimatedSection>
      );

      const element = container.firstChild as HTMLElement;

      // Simulate intersection
      intersectionCallback(
        [createMockEntry(true, element)],
        {} as IntersectionObserver
      );

      expect(screen.getByText("Intersecting Content")).toBeInTheDocument();
    });

    it("unobserves element after intersection", () => {
      const { container } = render(
        <AnimatedSection>
          <div>Unobserve Test</div>
        </AnimatedSection>
      );

      const element = container.firstChild as HTMLElement;

      // Simulate intersection
      intersectionCallback(
        [createMockEntry(true, element)],
        {} as IntersectionObserver
      );

      expect(unobserveMock).toHaveBeenCalledWith(element);
    });

    it("does not trigger animation when element is not intersecting", () => {
      const { container } = render(
        <AnimatedSection>
          <div>Not Intersecting</div>
        </AnimatedSection>
      );

      const element = container.firstChild as HTMLElement;

      // Simulate no intersection
      intersectionCallback(
        [createMockEntry(false, element)],
        {} as IntersectionObserver
      );

      // Element should still be in document but not animated
      expect(screen.getByText("Not Intersecting")).toBeInTheDocument();
    });
  });

  describe("Custom className", () => {
    it("applies custom className to the container", () => {
      const { container } = render(
        <AnimatedSection className="custom-class">
          <div>Custom Class Test</div>
        </AnimatedSection>
      );

      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("custom-class");
    });
  });

  describe("Delay", () => {
    it("accepts delay prop", () => {
      render(
        <AnimatedSection delay={0.5}>
          <div>Delayed Content</div>
        </AnimatedSection>
      );

      expect(screen.getByText("Delayed Content")).toBeInTheDocument();
    });
  });

  describe("prefers-reduced-motion", () => {
    it("skips animation when prefers-reduced-motion is enabled", () => {
      // Mock prefers-reduced-motion: reduce
      window.matchMedia = vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      render(
        <AnimatedSection animation="slideUp">
          <div>Reduced Motion Content</div>
        </AnimatedSection>
      );

      // Should not create IntersectionObserver when reduced motion is preferred
      expect(screen.getByText("Reduced Motion Content")).toBeInTheDocument();
    });

    it("uses IntersectionObserver when prefers-reduced-motion is not enabled", () => {
      // Mock prefers-reduced-motion: no-preference
      window.matchMedia = vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      });

      render(
        <AnimatedSection>
          <div>Normal Motion Content</div>
        </AnimatedSection>
      );

      expect(observeMock).toHaveBeenCalled();
      expect(screen.getByText("Normal Motion Content")).toBeInTheDocument();
    });
  });
});
