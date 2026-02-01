import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const panels = gsap.utils.toArray('.gallery-panel');

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (panels.length - 1),
                end: () => '+=' + containerRef.current.offsetWidth
            }
        });
    }, []);

    return (
        <div ref={containerRef} className="gallery-section-wrapper" style={{ overflow: 'hidden' }}>
            <div className="gallery-container" style={{ display: 'flex', width: '300%' }}>
                <div className="gallery-panel" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                    <img src="/images/lobby.png" alt="Lobby" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="panel-text" style={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: 2 }}>
                        <h2 style={{ fontSize: '4rem', color: '#fff', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>The Grand Lobby</h2>
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
                </div>
                <div className="gallery-panel" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                    <img src="/images/exterior.png" alt="Exterior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="panel-text" style={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: 2 }}>
                        <h2 style={{ fontSize: '4rem', color: '#fff', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>Night Views</h2>
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
                </div>
                <div className="gallery-panel" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
                    <img src="/images/suite.png" alt="Suite" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="panel-text" style={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: 2 }}>
                        <h2 style={{ fontSize: '4rem', color: '#fff', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>Royal Suites</h2>
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
