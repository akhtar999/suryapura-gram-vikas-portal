"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion, type MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 } as any,
  animate: { "--x": "-100%", scale: 1 } as any,
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  [key: string]: any;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  const Component = (href ? motion.a : motion.button) as React.ElementType;

  return (
    <Component
      {...animationProps}
      href={href}
      {...props}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--primary)_10%,transparent)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_10%,transparent)]",
        className
      )}
    >
      <span
        className="relative flex items-center justify-center gap-2 size-full text-inherit tracking-wide"
        style={{
          maskImage:
            "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg,var(--primary) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),var(--primary) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMaskComposite: "xor",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,color-mix(in_oklab,var(--primary)_10%,transparent)_calc(var(--x)+20%),color-mix(in_oklab,var(--primary)_50%,transparent)_calc(var(--x)+25%),color-mix(in_oklab,var(--primary)_10%,transparent)_calc(var(--x)+100%))] p-px"
      ></span>
    </Component>
  );
};

export default ShinyButton;
