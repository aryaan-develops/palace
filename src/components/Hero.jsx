import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Typewriter from 'typewriter-effect';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            image: '/images/trinity_entrance.png',
            title: 'Welcome to Trinity',
            subtitle: 'Where Luxury Meets Nature'
        },
        {
            image: '/images/trinity_reception.jpg',
            title: 'Elegance Redefined',
            subtitle: 'Experience World-Class Hospitality'
        },
        {
            image: '/images/trinity_hall.png',
            title: 'Grandest Venues',
            subtitle: 'Perfect For Your Special Moments'
        },
        {
            image: '/images/trinity_exterior_night.png',
            title: 'Starlit Majesty',
            subtitle: 'Bokaro\'s Premier Luxury Destination'
        }
    ];

    const slideRefs = useRef([]);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current) {
            // Set initial state for slides
            gsap.set(slideRefs.current, { opacity: 0, scale: 1.1 });
            gsap.set(slideRefs.current[0], { opacity: 1, scale: 1 });
            isInitialized.current = true;
        }

        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % slides.length;
            handleSlideChange(nextSlide);
        }, 7000);

        return () => clearInterval(interval);
    }, [currentSlide, slides.length]);

    const handleSlideChange = (index) => {
        if (index === currentSlide) return;

        // Animate Current Slide OUT
        gsap.to(slideRefs.current[currentSlide], {
            opacity: 0,
            scale: 1.2,
            duration: 2.5,
            ease: 'power2.inOut'
        });

        // Animate Next Slide IN
        gsap.fromTo(slideRefs.current[index],
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' }
        );

        setCurrentSlide(index);
    };

    return (
        <section className="hero-section" style={{
            position: 'relative',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000'
        }}>
            {/* 1. Images Layer */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    ref={el => slideRefs.current[index] = el}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url("${slide.image}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 1,
                        filter: 'brightness(0.6) contrast(1.1)'
                    }}
                />
            ))}

            {/* 2. Overlay Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            {/* 3. Texture Layer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")',
                opacity: 0.15,
                zIndex: 3,
                pointerEvents: 'none'
            }} />

            {/* 4. Content Layer */}
            <div style={{
                zIndex: 4,
                textAlign: 'center',
                padding: '0 5%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: 'clamp(2rem, 8vw, 6rem)',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1,
                    textShadow: `
                        2px 2px 0px rgba(0,0,0,0.2),
                        4px 4px 0px rgba(0,0,0,0.1),
                        0px 10px 20px rgba(0,0,0,0.5),
                        0px 20px 40px rgba(0,0,0,0.3)
                    `,
                    minHeight: '1.2em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Typewriter
                        options={{
                            strings: [slides[currentSlide].title],
                            autoStart: true,
                            loop: false,
                            delay: 50,
                            deleteSpeed: 9999999,
                            cursor: '|'
                        }}
                        key={`title-${currentSlide}`}
                    />
                </div>

                <p style={{
                    fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                    color: '#fff',
                    letterSpacing: '0.5em',
                    marginTop: '25px',
                    textTransform: 'uppercase',
                    fontWeight: 300,
                    opacity: 0.8
                }}>
                    {slides[currentSlide].subtitle}
                </p>
            </div>

            {/* 5. Navigation Dots */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                gap: '12px',
                zIndex: 5
            }}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSlideChange(index)}
                        style={{
                            width: currentSlide === index ? '35px' : '10px',
                            height: '10px',
                            borderRadius: '5px',
                            background: currentSlide === index ? '#c5a367' : 'rgba(255,255,255,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    />
                ))}
            </div>

            {/* 6. Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '100px',
                zIndex: 5,
                opacity: 0.5
            }}>
                <div style={{
                    width: '2px',
                    height: '60px',
                    background: 'linear-gradient(to bottom, transparent, #c5a367, transparent)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div className="scroll-line" style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '-100%',
                        background: '#fff'
                    }} />
                </div>
            </div>

            <style>{`
                .scroll-line {
                    animation: scroll-line-anim 2s infinite cubic-bezier(0.7, 0, 0.3, 1);
                }
                @keyframes scroll-line-anim {
                    0% { top: -100%; }
                    100% { top: 100%; }
                }
                .Typewriter__cursor {
                    color: #fff;
                    font-weight: 300;
                }
            `}</style>
        </section>
    );
};

export default Hero;
