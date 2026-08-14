import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
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
  showArrows?: boolean;
  arrowColor?: string;
  arrowBackground?: string;
  arrowSize?: number;
  arrowPosition?: number;
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

// OPAQUE GLASS GRADIENTS
const GRADIENTS = [
  "linear-gradient(160deg, rgba(245,199,106,0.14), rgba(245,199,106,0.04))",
  "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  "linear-gradient(160deg, rgba(245,199,106,0.12), rgba(212,169,74,0.03))",
  "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(245,199,106,0.04))",
  "linear-gradient(160deg, rgba(245,199,106,0.10), rgba(255,255,255,0.03))",
  "linear-gradient(160deg, rgba(212,169,74,0.12), rgba(245,199,106,0.03))",
  "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(245,199,106,0.05))",
  "linear-gradient(160deg, rgba(245,199,106,0.10), rgba(255,255,255,0.03))",
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
   MOBILE — Framer Motion 3D Drag & Real-Time Spring Coverflow Engine
   ================================================================ */
function MobileCard({
  img,
  index,
  activeIdx,
  cardWidth,
  step,
  centerOffset,
  xTrack,
  CARD_RADIUS,
  onSelect,
  isDraggingRef,
  renderItem,
}: {
  img: CoverflowImage;
  index: number;
  activeIdx: number;
  cardWidth: number;
  step: number;
  centerOffset: number;
  xTrack: MotionValue<number>;
  CARD_RADIUS: number;
  onSelect: (index: number) => void;
  isDraggingRef: React.MutableRefObject<boolean>;
  renderItem?: (item: CoverflowImage, index: number) => React.ReactNode;
}) {
  const src = resolveItemSrc(img);

  // Dynamic relative slide distance driven directly by real-time drag track position
  const rel = useTransform(xTrack, (currentX: number) => {
    const targetCardX = centerOffset - index * step;
    return (currentX - targetCardX) / step;
  });

  const scale = useTransform(rel, (r: number) => {
    const ar = Math.abs(r);
    if (ar <= 0.001) return 1.0;
    if (ar <= 1) return 1.0 - 0.06 * ar;
    return Math.max(0.85, 0.94 - 0.06 * (ar - 1));
  });

  const rotateY = useTransform(rel, (r: number) => {
    if (Math.abs(r) < 0.001) return 0;
    const sign = r < 0 ? 6 : -6;
    return sign * Math.min(1, Math.abs(r));
  });

  const opacity = useTransform(rel, (r: number) => {
    const ar = Math.abs(r);
    if (ar <= 0.2) return 1.0;
    if (ar <= 1.0) return 1.0 - 0.25 * (ar - 0.2);
    return Math.max(0.35, 0.75 - 0.35 * (ar - 1.0));
  });

  const zIndex = useTransform(rel, (r: number) => Math.round(100 - Math.abs(r) * 20));

  const isActive = index === activeIdx;

  return (
    <motion.div
      onClick={() => {
        if (!isDraggingRef.current) onSelect(index);
      }}
      style={{
        scale,
        rotateY,
        opacity,
        zIndex,
        flex: `0 0 ${cardWidth}px`,
        width: `${cardWidth}px`,
        minHeight: "220px",
        borderRadius: `${CARD_RADIUS}px`,
        backgroundColor: "var(--surface-2, #141414)",
        backgroundImage: isActive
          ? "linear-gradient(160deg, rgba(245,199,106,0.16), rgba(245,199,106,0.05))"
          : "linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
        border: isActive
          ? "1px solid rgba(245,199,106,0.4)"
          : "1px solid var(--border-strong, rgba(255,255,255,0.12))",
        boxShadow: isActive
          ? "0 14px 35px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(245,199,106,0.2)"
          : "0 8px 20px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {renderItem && img ? (
        renderItem(img, index)
      ) : src ? (
        <img
          src={src}
          alt={img?.alt || ""}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}
    </motion.div>
  );
}

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
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(375);

  useEffect(() => {
    if (!viewportRef.current) return;
    const updateWidth = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.getBoundingClientRect().width;
        if (w > 0) setViewportWidth(w);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(() => updateWidth());
    ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const cardWidth = Math.min(viewportWidth - 48, 340);
  const gap = 16;
  const step = cardWidth + gap;

  const centerOffset = (viewportWidth - cardWidth) / 2;
  const targetX = centerOffset - activeIdx * step;
  const minX = centerOffset - (count - 1) * step;
  const maxX = centerOffset;

  const xTrack = useMotionValue(targetX);

  useEffect(() => {
    // Skip programmatic animation when drag is in progress —
    // onDragEnd already handles the snap animation
    if (isDraggingRef.current) return;
    const controls = animate(xTrack, targetX, {
      type: prefersReducedMotion ? "tween" : "spring",
      stiffness: 320,
      damping: 28,
      mass: 0.8,
    });
    return () => controls.stop();
  }, [targetX, prefersReducedMotion, xTrack]);

  const CARD_RADIUS = Math.min(16, radius * 2);

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let nextIdx = activeIdx;
    if (offset < -50 || velocity < -400) {
      nextIdx = Math.min(activeIdx + 1, count - 1);
    } else if (offset > 50 || velocity > 400) {
      nextIdx = Math.max(activeIdx - 1, 0);
    }

    const nextTargetX = centerOffset - nextIdx * step;
    animate(xTrack, nextTargetX, {
      type: prefersReducedMotion ? "tween" : "spring",
      stiffness: 320,
      damping: 28,
      mass: 0.8,
    });

    onSelect(nextIdx);

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 150);
  };

  return (
    <div
      className="mobile-carousel-container py-2"
      style={{ position: "relative", width: "100%", touchAction: "pan-y" }}
    >
      <div
        ref={viewportRef}
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          touchAction: "pan-y",
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: minX, right: maxX }}
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            x: xTrack,
            display: "flex",
            gap: `${gap}px`,
            width: "max-content",
            cursor: "grab",
            touchAction: "pan-y",
            transformStyle: "preserve-3d",
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          {images.map((img, i) => (
            <MobileCard
              key={i}
              img={img}
              index={i}
              activeIdx={activeIdx}
              cardWidth={cardWidth}
              step={step}
              centerOffset={centerOffset}
              xTrack={xTrack}
              CARD_RADIUS={CARD_RADIUS}
              onSelect={onSelect}
              isDraggingRef={isDraggingRef}
              renderItem={renderItem}
            />
          ))}
        </motion.div>
      </div>

      {/* ANIMATED PILL PAGINATION */}
      {count > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            paddingTop: 16,
            paddingBottom: 6,
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                background: "transparent",
                border: "none",
                padding: "10px 4px",
                margin: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 32,
                minHeight: 44,
                touchAction: "manipulation",
              }}
            >
              <motion.span
                animate={{
                  width: i === activeIdx ? 24 : 6,
                  opacity: i === activeIdx ? 1 : 0.35,
                  backgroundColor: i === activeIdx ? "#F5C76A" : "rgba(255,255,255,0.45)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  height: 5,
                  borderRadius: 3,
                  display: "block",
                  boxShadow: i === activeIdx ? "0 0 10px rgba(245,199,106,0.6)" : "none",
                }}
              />
            </button>
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
  activeIdx,
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
  activeIdx: number;
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

  const restScale = useMemo(() => {
    if (sizing.restWidth > 0 && sizing.activeWidth > 0) {
      return sizing.restWidth / sizing.activeWidth;
    }
    return 0.85;
  }, [sizing.restWidth, sizing.activeWidth]);

  const x = useTransform(pos, (p: number) => {
    const rel = relOf(index, p, count);
    const sign = rel < 0 ? -1 : 1;
    const ar = Math.abs(rel);
    if (ar < 0.001) return 0;
    const activeVisualWidth = sizing.activeWidth;
    const sideVisualWidth = sizing.restWidth;
    const controlledOverlap = Math.min(activeVisualWidth, sideVisualWidth) * 0.12;
    const firstStep = activeVisualWidth / 2 + sideVisualWidth / 2 - controlledOverlap + gap;
    const pitch = sideVisualWidth + gap - controlledOverlap;
    const mag = ar <= 1 ? ar * firstStep : firstStep + (ar - 1) * pitch;
    return sign * mag;
  });

  const z = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    if (ar <= 0.001) return 0;
    if (ar <= 1) return -120 * ar;
    return -120 - 80 * (ar - 1);
  });

  const scale = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    if (ar <= 0.001) return 1.0;
    if (ar <= 1) return 1.0 - (1.0 - restScale) * ar;
    if (ar <= 2) return restScale - 0.08 * (ar - 1);
    return Math.max(0.6, restScale - 0.08 - 0.04 * (ar - 2));
  });

  const contentOpacity = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    if (ar <= 0.3) return 1;
    if (ar <= 1.2) return 1 - 0.35 * (ar - 0.3);
    if (ar <= R + 0.5) return Math.max(0.15, 0.685 - 0.35 * (ar - 1.2));
    return 0;
  });

  const visibility = useTransform(pos, (p: number) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar > R + 0.5 ? "hidden" : "visible";
  });

  // Classic 3D Coverflow rotation: side cards angle inward toward active center card
  const rotateY = useTransform(pos, (p: number) => {
    const rel = relOf(index, p, count);
    if (Math.abs(rel) < 0.05) return 0;
    const sign = rel < 0 ? -1 : 1;
    const ar = Math.min(2, Math.abs(rel));
    return sign * (14 * Math.min(1, ar));
  });

  const zIndex = useTransform(pos, (p: number) => {
    const rel = relOf(index, p, count);
    const relTarget = relOf(index, activeIdx, count);
    const baseZ = 1000 - Math.abs(rel) * 100;
    const targetBias = Math.max(0, 1 - Math.abs(relTarget)) * 50;
    return Math.round(baseZ + targetBias);
  });

  const CARD_RADIUS =
    (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(baseWidth, baseHeight) / 2);

  const boxShadow = useTransform(pos, (p: number) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? "0 25px 70px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(245,199,106,0.25)"
      : "0 12px 35px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
  );

  const borderColor = useTransform(pos, (p: number) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? "rgba(245,199,106,0.35)"
      : "var(--border, rgba(255,255,255,0.08))",
  );

  const xPosition = useTransform(x, (v: number) => `calc(-50% + ${v}px)`);

  return (
    <motion.div
      onClick={onSelect ? () => onSelect(index) : undefined}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: baseWidth,
        height: baseHeight,
        x: xPosition,
        y: "-50%",
        z,
        zIndex,
        scale,
        rotateY,
        visibility,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        willChange: "transform",
        backfaceVisibility: "hidden",
        cursor: onSelect ? "pointer" : "default",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: CARD_RADIUS,
          overflow: "hidden",
          backgroundColor: "var(--surface-2, #141414)",
          backgroundImage: gradient,
          boxShadow,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor,
          display: "flex",
          flexDirection: "column",
          isolation: "isolate",
          backfaceVisibility: "hidden",
        }}
      >
        <motion.div
          style={{
            opacity: contentOpacity,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
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
    </motion.div>
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
  showArrows: false,
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
      stiffness: 260,
      damping: 26,
      mass: 0.8,
    });
    return () => controls.stop();
  }, [activeIdx, moveDur, prefersReducedMotion, pos]);

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
        height: sizing.activeHeight + 60,
        minHeight: sizing.activeHeight + 60,
        overflow: "visible",
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
          perspective: 1200,
          transformStyle: "preserve-3d",
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
            activeIdx={activeIdx}
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
    </div>
  );
}
