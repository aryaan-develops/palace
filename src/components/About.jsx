import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(imageRef.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1
                }
            }
        );

        gsap.fromTo(textRef.current,
            { x: 100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} id="about" className="about-section" style={{
            background: 'var(--sage)',
            color: '#fff',
        }}>
            <div className="about-container">
                <div className="about-image-wrapper">
                    <div ref={imageRef} className="about-image-inner">
                        <img
                            src="/images/lobby.png"
                            alt="The Story"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
                <div ref={textRef} className="about-text">
                    <span style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '15px' }}>THE STORY</span>
                    <h2 className="mb-20 title-responsive">Unmatched <br />Hilltop Hospitality</h2>
                    <p className="mb-20" style={{ fontSize: '2.4rem', fontWeight: '400', opacity: 0.9, fontFamily: "'Mrs Saint Delafield', cursive", lineHeight: 1.2 }}>
                        Welcome to Trinity Palace, a luxurious sanctuary where modern elegance meets the serenity of nature. Located in the heart of Narayanpur, Chas, our resort is designed to offer a royal escape within Bokaro Steel City.
                    </p>
                    <p className="mb-40" style={{ fontSize: '2.1rem', fontWeight: '400', opacity: 0.8, fontFamily: "'Mrs Saint Delafield', cursive", lineHeight: 1.2 }}>
                        From our grand architectural frontage to our meticulously designed interior spaces, every detail at Trinity Palace is crafted to ensure your stay is as memorable as it is comfortable.
                    </p>
                    <a href="#accommodation" className="btn-primary" style={{ background: '#fff', color: 'var(--sage)' }}>DISCOVER LUXURY</a>
                </div>
            </div>

            <style>{`
                .about-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                }
                .about-image-inner {
                    height: 600px; 
                    overflow: hidden; 
                    border-radius: 0; 
                    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
                }
                .title-responsive {
                    font-size: 4.5rem;
                    line-height: 1;
                }

                @media (max-width: 1024px) {
                    .about-container {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                    .about-image-inner {
                        height: 400px;
                        clip-path: none;
                    }
                    .title-responsive {
                        font-size: 3rem;
                    }
                }
                @media (max-width: 480px) {
                    .title-responsive {
                        font-size: 2.2rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default About;
