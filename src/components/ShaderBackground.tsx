import { useEffect, useState, lazy, Suspense } from "react";

const ShaderGradientCanvas = lazy(() =>
  import("@shadergradient/react").then((m) => ({ default: m.ShaderGradientCanvas })),
);
const ShaderGradient = lazy(() =>
  import("@shadergradient/react").then((m) => ({ default: m.ShaderGradient })),
);

export default function ShaderBackground({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  if (!mounted) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden contain-strict ${className}`}>
      <Suspense fallback={null}>
        <ShaderGradientCanvas
          style={{ width: "100%", height: "100%" }}
          pixelDensity={1}
          fov={45}
        >

          <ShaderGradient
            animate="on"
            type="waterPlane"
            color1="#F5C76A"
            color2="#111111"
            color3="#F5C76A"
            brightness={1.2}
            cAzimuthAngle={180}
            cDistance={3.6}
            cPolarAngle={90}
            cameraZoom={1}
            envPreset="city"
            grain="off"
            lightType="3d"
            positionX={-1.4}
            positionY={0}
            positionZ={0}
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            uAmplitude={5.8}
            uDensity={0.1}
            uFrequency={5.5}
            uSpeed={0.15}
            uStrength={1.3}
            uTime={0}
          />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  );
}
