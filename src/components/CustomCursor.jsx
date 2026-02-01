import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Feather } from 'lucide-react';

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
                duration: 0.1
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor"></div>
            <div ref={followerRef} className="custom-cursor-follower">
                <Feather className="feather-cursor" color="#c5a367" />
            </div>
        </>
    );
};

export default CustomCursor;
