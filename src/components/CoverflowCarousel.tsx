import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimation,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

type CoverflowImage = {
  src?: { src?: string; srcSet?: string };
  srcUrl?: string;
  alt?: string;
};

type Props = {
  images: CoverflowImage[];
  activeWidth: number;
  activeHeight: number;
  restWidth: number;
  restHeight: number;
  gap: number;
  radius: number;
  showArrows: boolean;
  arrowColor: string;
  arrowBackground: string;
  arrowSize: number;
  arrowPosition: number;
  autoplay: boolean;
  autoplayDirection: "leftToRight" | "rightToLeft";
  transition: {
    type?: string;
    duration?: number;
    delay?: number;
    ease?: number[] | string;
  };
  style?: React.CSSProperties;
  renderItem?: (item: CoverflowImage, index: number) => React.ReactNode;
};

const GRADIENTS = [
  "linear-gradient(160deg, rgba(245,199,106,0.12), rgba(245,199,106,0.03))",
  "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06))",
  "linear-gradient(160deg, rgba(245,199,106,0.10), rgba(212,169,74,0.04))",
  "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(245,199,106,0.05))",
  "linear-gradient(160deg, rgba(245,199,106,0.08), rgba(255,255,255,0.06))",
  "linear-gradient(160deg, rgba(212,169,74,0.10), rgba(245,199,106,0.04))",
  "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(245,199,106,0.06))",
  "linear-gradient(160deg, rgba(245,199,106,0.08), rgba(255,255,255,0.06))",
];

const RENDER_RANGE = 6;

function resolveItemSrc(item: CoverflowImage | undefined): string {
  const override = item?.srcUrl && item.srcUrl.trim();
  if (override) return override;
  if (!item?.src) return "";
  if (typeof item.src === "string") return item.src;
  return item.src.src ?? "";
}

type Sizing = { restWidth: number; restHeight: number; activeWidth: number; activeHeight: number };

function relOf(index: number, pos: number, count: number): number {
  let rel = (((index - pos) % count) + count) % count;
  if (rel > count / 2) rel -= count;
  return rel;
}

/* ================================================================
   MOBILE — Dedicated Framer Motion Touch Track Engine
   ================================================================ */
function MobileAnimatedCarousel({
  images,
  radius,
  renderItem,
  activeIdx,
  onSelect,
  isDraggingRef,
}: {
  images: CoverflowImage[];
  radius: number;
  renderItem?: (item: CoverflowImage, index: number) => React.ReactNode;
  activeIdx: number;
  onSelect: (index: number) => void;
  isDraggingRef: React.MutableRefObject<boolean>;
}) {
  const count = images.length;
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(375);

  useEffect(() => {
    const updateWidth = () => {
      const winW = typeof window !== "undefined" ? window.innerWidth : 375;
      if (containerRef.current) {
        const rectW = containerRef.current.getBoundingClientRect().width;
        setContainerWidth(rectW > 0 ? Math.min(winW, rectW) : winW);
      } else {
        setContainerWidth(winW);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const cardWidth = Math.min(containerWidth - 48, 390);
  const gap = 14;
  const step = cardWidth + gap;
  const leftPadding = Math.max(0, (containerWidth - cardWidth) / 2);
  const targetX = leftPadding - activeIdx * step;
  const minX = leftPadding - (count - 1) * step;
  const maxX = leftPadding;

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: targetX,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: prefersReducedMotion ? 600 : 320,
        damping: prefersReducedMotion ? 50 : 28,
        mass: 0.8,
      },
    });
  }, [activeIdx, targetX, prefersReducedMotion, controls]);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let nextIdx = activeIdx;
    if (offset < -40 || velocity < -350) {
      nextIdx = Math.min(activeIdx + 1, count - 1);
    } else if (offset > 40 || velocity > 350) {
      nextIdx = Math.max(activeIdx - 1, 0);
    }

    if (nextIdx !== activeIdx) {
      onSelect(nextIdx);
    } else {
      controls.start({
        x: targetX,
        transition: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
      });
    }
  };

  const CARD_RADIUS = Math.min(16, radius * 2);

  return (
    <div
      className="hf-carousel-mobile overflow-hidden py-2"
      style={{ position: "relative", width: "100%", touchAction: "pan-y" }}
    >
      <div ref={containerRef} className="relative w-full overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: minX, right: maxX }}
          dragElastic={0.15}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{
            display: "flex",
            gap: `${gap}px`,
            cursor: "grab",
            willChange: "transform",
            touchAction: "pan-y",
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {images.map((img, i) => {
            const src = resolveItemSrc(img);
            const isActive = i === activeIdx;
            const isNeighbor = Math.abs(i - activeIdx) === 1;

            return (
              <motion.div
                key={i}
                onClick={() => {
                  if (!isDraggingRef.current) onSelect(i);
                }}
                animate={{
                  scale: isActive ? 1 : isNeighbor ? 0.94 : 0.88,
                  opacity: isActive ? 1 : isNeighbor ? 0.7 : 0.35,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  width: `${cardWidth}px`,
                  borderRadius: `${CARD_RADIUS}px`,
                  background: isActive
                    ? "linear-gradient(160deg, rgba(245,199,106,0.14), rgba(245,199,106,0.04)), #0e0d0a"
                    : "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)), #0c0c0c",
                  border: isActive
                    ? "1px solid rgba(245,199,106,0.35)"
                    : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: isActive
                    ? "0 18px 45px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(245,199,106,0.2)"
                    : "0 10px 25px rgba(0,0,0,0.4)",
                  zIndex: isActive ? 20 : isNeighbor ? 10 : 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  WebkitTapHighlightColor: "transparent",
                  userSelect: "none",
                  transformOrigin: "center center",
                }}
              >
                {renderItem && img ? (
                  renderItem(img, i)
                ) : src ? (
                  <img
                    src={src}
                    alt={img?.alt || ""}
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Animated Pill Pagination */}
      {count > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            paddingTop: 16,
            paddingBottom: 4,
          }}
        >
          {images.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Go to slide ${i + 1}`}
              animate={{
                width: i === activeIdx ? 24 : 6,
                opacity: i === activeIdx ? 1 : 0.35,
                backgroundColor: i === activeIdx ? "#F5C76A" : "rgba(255,255,255,0.5)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                height: 5,
                borderRadius: 3,
                border: "none",
                padding: 0,
                cursor: "pointer",
                boxShadow: i === activeIdx ? "0 0 10px rgba(245,199,106,0.6)" : "none",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   DESKTOP CARD — Cinematic 3D Coverflow
   ================================================================ */
function DesktopCard({
  item,
  index,
  pos,
  count,
  R,
  sizing,
  gap,
  radius,
  gradient,
  onSelect,
  renderItem,
}: {
  item: CoverflowImage | undefined;
  index: number;
  pos: MotionValue<number>;
  count: number;
  R: number;
  sizing: Sizing;
  gap: number;
  radius: number;
  gradient: string;
  onSelect: ((index: number) => void) | undefined;
  renderItem?: (item: CoverflowImage, index: number) => React.ReactNode;
}) {
  const src = resolveItemSrc(item);
  const baseWidth = sizing.activeWidth;
  const baseHeight = sizing.activeHeight;

  const x = useTransform(pos, (p: number) => {
    const rel = relOf(index, p, count);
    const sign = rel < 0 ? -1 : 1;
    const ar = Math.abs(rel);
    if (ar < 0.001) return 0;
    const neighborScale = 0.76;
    const activeOverlap = baseWidth / 2 + (baseWidth * neighborScale) / 2 + gap;
    const pitch = baseWidth * neighborScale + gap;
    const mag = ar <= 1 ? ar * activeOverlap : activeOverlap + (ar - 1) * pitch;
    return sign * mag;
  });

  const scale = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    if (ar <= 0.001) return 1;
    if (ar <= 1) return 1 - 0.24 * ar;
    if (ar <= 2) return 0.76 - 0.16 * (ar - 1);
    return Math.max(0.45, 0.6 - 0.1 * (ar - 2));
  });

  const opacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    if (ar <= 0.5) return 1;
    if (ar <= 1.5) return 0.95 - 0.25 * (ar - 0.5);
    if (ar <= R + 0.5) return Math.max(0.15, 0.7 - 0.35 * (ar - 1.5));
    return 0;
  });

  const rotateY = useTransform(pos, (p: number) => {
    const rel = relOf(index, p, count);
    if (Math.abs(rel) < 0.1) return 0;
    return rel < 0 ? 8 : -8;
  });

  const zIndex = useTransform(pos, (p: number) =>
    Math.round(1000 - Math.abs(relOf(index, p, count)) * 100),
  );

  const CARD_RADIUS =
    (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(baseWidth, baseHeight) / 2);

  const boxShadow = useTransform(pos, (p: number) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? "0 25px 70px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(245,199,106,0.25)"
      : "0 12px 35px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
  );

  return (
    <motion.div
      onClick={onSelect ? () => onSelect(index) : undefined}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x,
        zIndex,
        opacity,
        scale,
        rotateY,
        transformPerspective: 1000,
        cursor: onSelect ? "pointer" : "default",
      }}
    >
      <motion.div
        style={{
          x: "-50%",
          y: "-50%",
          width: baseWidth,
          height: baseHeight,
          borderRadius: CARD_RADIUS,
          overflow: "hidden",
          background: gradient,
          boxShadow,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderItem && item ? (
          renderItem(item, index)
        ) : src ? (
          <img
            src={src}
            alt={item?.alt || ""}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}

/* ================================================================
   DESKTOP ARROW
   ================================================================ */
function DesktopArrow({
  side,
  onClick,
  color,
  size,
  position,
}: {
  side: "left" | "right";
  onClick: () => void;
  color: string;
  size: number;
  position: number;
}) {
  const isLeft = side === "left";
  const p = Math.max(0, Math.min(100, position));
  const inset = `calc((50% - ${size}px) * ${(100 - p) / 100})`;
  return (
    <button
      type="button"
      aria-label={isLeft ? "Previous" : "Next"}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: "absolute",
        top: "50%",
        [isLeft ? "left" : "right"]: inset,
        transform: "translateY(-50%)",
        width: size,
        height: size,
        minWidth: 44,
        minHeight: 44,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.06)",
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
        zIndex: 2000,
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg
        width={size * 0.4}
        height={size * 0.4}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pointerEvents: "none" }}
      >
        {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

/* ================================================================
   MAIN EXPORT — Single unified activeIndex & navigation pipeline
   ================================================================ */
const DEFAULTS = {
  activeWidth: 600,
  activeHeight: 400,
  restWidth: 200,
  restHeight: 270,
  gap: 30,
  radius: 2,
  showArrows: true,
  arrowColor: "#000000",
  arrowBackground: "#FFFFFF",
  arrowSize: 56,
  arrowPosition: 95,
  autoplay: false,
  autoplayDirection: "rightToLeft" as const,
  transition: { type: "tween", duration: 0.3, delay: 1, ease: "easeInOut" },
};

export default function CoverflowCarousel(props: Props) {
  const p = { ...DEFAULTS, ...props };
  const {
    images: rawImages,
    activeWidth,
    activeHeight,
    restWidth,
    restHeight,
    gap,
    radius,
    showArrows,
    arrowColor,
    arrowBackground,
    arrowSize,
    arrowPosition,
    autoplay,
    autoplayDirection,
    transition: transitionProp,
    style,
    renderItem,
  } = p;

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const images = useMemo(
    () => (Array.isArray(rawImages) && rawImages.length > 0 ? rawImages : []),
    [rawImages],
  );
  const count = Math.max(1, images.length);
  const moveDur = typeof transitionProp?.duration === "number" ? transitionProp.duration : 0.5;
  const dwell = typeof transitionProp?.delay === "number" ? Math.max(0, transitionProp.delay) : 1.2;

  const sizing: Sizing = useMemo(
    () => ({ restWidth, restHeight, activeWidth, activeHeight }),
    [restWidth, restHeight, activeWidth, activeHeight],
  );
  const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2) - 1));
  const pos = useMotionValue(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const controls = animate(pos, activeIdx, {
      type: prefersReducedMotion ? "tween" : "spring",
      duration: prefersReducedMotion ? 0.01 : moveDur,
      stiffness: 300,
      damping: 30,
    });
    return () => controls.stop();
  }, [activeIdx, moveDur, prefersReducedMotion, pos]);

  // Unified navigation pipeline for all triggers (buttons, dots, keyboard, swipe, autoplay)
  const goToIndex = useCallback(
    (idx: number) => {
      const target = ((idx % count) + count) % count;
      setActiveIdx(target);
    },
    [count],
  );

  const goNext = useCallback(() => {
    goToIndex(activeIdx + 1);
  }, [activeIdx, goToIndex]);
  const goPrev = useCallback(() => {
    goToIndex(activeIdx - 1);
  }, [activeIdx, goToIndex]);

  // Unified Autoplay pipeline (runs on both Desktop and Mobile)
  useEffect(() => {
    if (!autoplay || count <= 1) return;
    const step = autoplayDirection === "leftToRight" ? -1 : 1;
    const intervalTime = Math.max(2500, (dwell + moveDur) * 1000);

    const timer = setInterval(() => {
      if (isHoveredRef.current || isDraggingRef.current) return;
      setActiveIdx((prev) => (((prev + step) % count) + count) % count);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDirection, count, dwell, moveDur]);

  useEffect(() => {
    if (isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (!isHoveredRef.current) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, isMobile]);

  if (!mounted) {
    return (
      <div
        style={{ ...style, position: "relative", width: "100%", height: 260, overflow: "hidden" }}
      />
    );
  }

  if (isMobile) {
    return (
      <MobileAnimatedCarousel
        images={images}
        radius={radius}
        renderItem={renderItem}
        activeIdx={activeIdx}
        onSelect={goToIndex}
        isDraggingRef={isDraggingRef}
      />
    );
  }

  return (
    <div
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Content carousel"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      onFocus={() => {
        isHoveredRef.current = true;
      }}
      onBlur={() => {
        isHoveredRef.current = false;
      }}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 240,
        overflow: "hidden",
        userSelect: "none",
        touchAction: "pan-y",
        outline: "none",
        isolation: "isolate",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          isolation: "isolate",
          zIndex: 0,
        }}
      >
        {images.map((img, i) => (
          <DesktopCard
            key={i}
            item={img}
            index={i}
            pos={pos}
            count={count}
            R={R}
            sizing={sizing}
            gap={gap}
            radius={radius}
            gradient={GRADIENTS[i % GRADIENTS.length]}
            onSelect={goToIndex}
            renderItem={renderItem}
          />
        ))}
      </div>
      {showArrows && count > 1 && (
        <>
          <DesktopArrow
            side="left"
            onClick={goPrev}
            color={arrowColor}
            size={arrowSize}
            position={arrowPosition}
          />
          <DesktopArrow
            side="right"
            onClick={goNext}
            color={arrowColor}
            size={arrowSize}
            position={arrowPosition}
          />
        </>
      )}
    </div>
  );
}
