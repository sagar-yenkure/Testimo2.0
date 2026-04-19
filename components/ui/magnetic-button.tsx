"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export function MagneticButton({ children, className = "", intensity = 0.3 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        
        // Calculate distance from center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        setPosition({ x: middleX * intensity, y: middleY * intensity });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            className={`cursor-pointer ${className}`}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
