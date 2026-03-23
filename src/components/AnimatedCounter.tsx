import React, { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

export const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix/prefix
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match ? match[1] : "";
  const targetNumber = match ? parseInt(match[2], 10) : parseInt(value, 10) || 0;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetNumber, {
        duration: 2,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + Math.round(val) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};
