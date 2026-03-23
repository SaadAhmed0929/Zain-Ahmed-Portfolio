import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    // Use MotionValues to track mouse position directly without triggering React re-renders
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Create a smooth spring animation for the trailing circle
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only run on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            // Update MotionValues directly
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if element or any parent is clickable/interactive
            const isClickable = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                window.getComputedStyle(target).cursor === 'pointer';
            
            setIsHovering(!!isClickable);
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [isVisible, cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Main Dot - Instant tracking */}
            <motion.div 
                className="absolute top-0 left-0 w-2.5 h-2.5 bg-white rounded-full mix-blend-difference"
                style={{ 
                    x: cursorX, 
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%" 
                }}
                animate={{ 
                    scale: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.1 }} 
            />
            {/* Trailing Ring - Spring physics */}
            <motion.div 
                className="absolute top-0 left-0 w-8 h-8 border rounded-full border-blue-400"
                style={{ 
                    x: cursorXSpring, 
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{ 
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    borderColor: isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};
