"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

type CardPeelProps = {
  children: React.ReactNode
  className?: string
  peelAmount?: number
  peelDirection?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

const ORIGIN_MAP = {
  "bottom-right": "100% 100%",
  "bottom-left": "0% 100%",
  "top-right": "100% 0%",
  "top-left": "0% 0%",
}

export default function CardPeel({
  children,
  className = "",
  peelAmount = 8,
  peelDirection = "bottom-right",
}: CardPeelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const amount = pressed ? peelAmount * 1.6 : hovered ? peelAmount : 0
  const origin = ORIGIN_MAP[peelDirection]

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`relative ${className}`}
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{
          rotateX: amount * 0.4,
          rotateY: -amount * 0.4,
          z: pressed ? 16 : hovered ? 8 : 0,
          scale: pressed ? 0.98 : hovered ? 1.01 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
        style={{
          transformOrigin: origin,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full"
      >
        {children}

        {/* Peel shadow — appears under the lifted corner */}
        <motion.div
          animate={{ opacity: hovered || pressed ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            boxShadow: `
              ${ pressed ? -6 : hovered ? -3 : 0 }px
              ${ pressed ? 6 : hovered ? 3 : 0 }px
              ${ pressed ? 20 : hovered ? 12 : 0 }px
              rgba(0,0,0,${ pressed ? 0.35 : hovered ? 0.2 : 0 })
            `,
          }}
        />
      </motion.div>
    </div>
  )
}
