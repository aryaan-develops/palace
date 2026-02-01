import React, { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import gsap from 'gsap';

const Hero = () => {
    const heroRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        // Subtle Zoom (Ken Burns) Effect
        gsap.to(bgRef.current, {
            scale: 1.15,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: 'none'
        });
    }, []);

    return (
        <section ref={heroRef} className="hero-section" style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Animated Background Layer - No Filters/Gradients */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("/images/hero-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1
                }}
            />
        </section>
    );
};

export default Hero;
