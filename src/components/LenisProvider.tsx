"use client";

import { ReactLenis } from "lenis/react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        prevent: (node) => node.hasAttribute("data-lenis-prevent"),
      }}
    >
      {children}
    </ReactLenis>
  );
}