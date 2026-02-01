import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Spaces = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(imageRef.current,
            { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                duration: 1.5,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="spaces-section" style={{ minHeight: '80vh', background: 'var(--bg-dark)' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 className="mb-40" style={{ fontSize: '3.5rem', textAlign: 'center' }}>Royal <span className="text-gold">Sanctuaries</span></h2>
                <div ref={imageRef} className="glass" style={{
                    width: '100%',
                    maxWidth: '1000px',
                    height: '600px',
                    overflow: 'hidden',
                    padding: '15px'
                }}>
                    <img
                        src="/images/living.png"
                        alt="Royal Sanctuary"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
                    />
                </div>
                <p className="mt-40" style={{ maxWidth: '800px', textAlign: 'center', fontSize: '1.2rem', opacity: 0.8, marginTop: '40px' }}>
                    Immerse yourself in spaces designed for the ultimate relaxation. Every corner of Trinity Palace is a masterpiece of comfort and design.
                </p>
            </div>
        </section>
    );
};

export default Spaces;
