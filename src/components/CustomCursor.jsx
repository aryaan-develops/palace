import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15
            });

            createBubble(e.clientX, e.clientY);
        };

        const createBubble = (x, y) => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            document.body.appendChild(bubble);

            const size = Math.random() * 15 + 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;

            const destinationX = x + (Math.random() - 0.5) * 80;
            const destinationY = y + (Math.random() - 0.5) * 80;

            gsap.to(bubble, {
                x: destinationX - x,
                y: destinationY - y,
                opacity: 0,
                scale: 0.5,
                duration: Math.random() * 0.8 + 0.4,
                ease: "power1.out",
                onComplete: () => {
                    bubble.remove();
                }
            });
        };

        // Zoom Effect on Hover
        const handleMouseEnter = () => {
            gsap.to(follower, {
                scale: 2.8,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                duration: 0.4,
                ease: "power3.out"
            });
            gsap.to(cursor, {
                scale: 0.5,
                opacity: 0.5,
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                border: '1px solid var(--primary)',
                duration: 0.4,
                ease: "power3.out"
            });
            gsap.to(cursor, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
        };

        // Add listeners to links and buttons
        const attachHoverListeners = () => {
            const interactables = document.querySelectorAll('a, button, .nav-link-item');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        // Mutation Observer to handle dynamic content
        const observer = new MutationObserver(attachHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('mousemove', moveCursor);
        attachHoverListeners();

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor"></div>
            <div ref={followerRef} className="custom-cursor-follower" style={{
                // Add backdrop-filter for a subtle "zoom" magnification look
                backdropFilter: 'contrast(1.2) brightness(1.2)',
                WebkitBackdropFilter: 'contrast(1.2) brightness(1.2)'
            }}></div>
        </>
    );
};

export default CustomCursor;
