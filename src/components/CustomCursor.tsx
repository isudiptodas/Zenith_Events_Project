"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const pathname = usePathname();

  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  });

  const y = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  });

  useEffect(() => {
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    // Always start small whenever page changes
    setHovering(false);

    const selectors = "a, span, h2, h3, h4, h5, h6";

    const elements = document.querySelectorAll(selectors);

    const handleEnter = () => setHovering(true);
    const handleLeave = () => setHovering(false);

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    // If user clicks a link while hovering, immediately shrink
    const handleMouseDown = () => setHovering(false);

    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });

      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [pathname]);

  return (
    <motion.div
      className="fixed left-0 top-0 z-99999 pointer-events-none rounded-full bg-white mix-blend-difference"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 80 : 16,
        height: hovering ? 80 : 16,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    />
  );
}