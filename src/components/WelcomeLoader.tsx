import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VaporizeTextCycle from "./VaporizeTextCycle";

const SEEN_KEY = "theruins:welcome-seen";

export default function WelcomeLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {}
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      document.documentElement.style.overflow = "";
    }, 2400);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,199,106,0.10),transparent_60%)]" />
          <div className="relative h-32 w-full max-w-4xl px-4 sm:h-40 sm:max-w-5xl sm:px-6">
            <VaporizeTextCycle
              texts={["WE ARE THERUINS"]}
              font={{
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 56,
              }}
              color="rgb(245,199,106)"
              spread={10}
              density={6}
              alignment="center"
              tag="h1"
              appear={{
                mode: "particle",
                order: "left-to-right",
                transition: { type: "tween", duration: 0.8, ease: "easeOut" },
              }}
              disappear={{
                mode: "particle",
                order: "left-to-right",
                transition: { type: "tween", duration: 1, ease: "easeIn", delay: 0.5 },
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
