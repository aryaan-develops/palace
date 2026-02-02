import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef(null);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);

        const showNavbar = () => {
            setIsVisible(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            // Hide after 3 seconds of no movement
            timeoutRef.current = setTimeout(() => {
                if (!isMenuOpen) {
                    setIsVisible(false);
                }
            }, 3000);
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            showNavbar();
        };

        const handleMouseMove = () => {
            showNavbar();
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Initial show
        showNavbar();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen && typeof gsap !== 'undefined') {
            setIsVisible(true); // Keep visible when menu is open
            // Kill any existing animations to prevent overlap
            gsap.killTweensOf('.mobile-nav-link');
            gsap.killTweensOf('.mobile-cta');

            gsap.fromTo('.mobile-nav-link',
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
            );
            gsap.fromTo('.mobile-cta',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'elastic.out(1, 0.75)' }
            );
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'HOME', href: '#' },
        { name: 'THE STORY', href: '#about' },
        { name: 'ACCOMMODATION', href: '#accommodation' },
        { name: 'DINING', href: '#dining' },
        { name: 'WELLNESS', href: '#wellness' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                padding: scrolled ? '8px 5%' : '14px 5%',
                // Glassy Background
                background: scrolled
                    ? 'rgba(0, 0, 0, 0.6)'
                    : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1000,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // Auto-hide logic
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? 'all' : 'none'
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/images/logo_clean.png"
                        alt="Trinity Palace"
                        style={{
                            height: scrolled ? '40px' : '55px',
                            transition: 'height 0.4s ease',
                            mixBlendMode: 'screen'
                        }}
                    />
                </div>

                {/* Desktop Links */}
                <div className="desktop-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <div className="nav-links" style={{ display: 'flex', gap: '30px' }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="nav-link-item"
                                style={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    textDecoration: 'none',
                                    fontWeight: '700', // Bold
                                    fontSize: '0.7rem',
                                    letterSpacing: '2px',
                                    position: 'relative',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)', // Glassy depth
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <a href="#booking" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.75rem', letterSpacing: '1px' }}>BOOK A STAY</a>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer', zIndex: 1001, color: '#fff' }}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100dvh',
                background: '#0a0a0a',
                zIndex: 999,
                transition: 'transform 0.7s cubic-bezier(0.85, 0, 0.15, 1)',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                visibility: isMenuOpen ? 'visible' : 'hidden',
                pointerEvents: isMenuOpen ? 'all' : 'none'
            }}>
                {/* Dedicated Scroll Container */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    WebkitOverflowScrolling: 'touch',
                    padding: '60px 0 100px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative'
                }}>
                    {/* Golden Floral Accent Background */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `
                            radial-gradient(circle at 50% 10%, rgba(197, 163, 103, 0.12) 0%, transparent 60%),
                            radial-gradient(circle at 50% 90%, rgba(197, 163, 103, 0.12) 0%, transparent 60%),
                            url("https://www.transparenttextures.com/patterns/black-linen.png")
                        `,
                        zIndex: -1,
                        pointerEvents: 'none'
                    }} />

                    {/* Cinematic Particles */}
                    <div className="bokeh-layer">
                        <div className="bokeh-particle bp1" />
                        <div className="bokeh-particle bp2" />
                        <div className="bokeh-particle bp3" />
                    </div>

                    {/* Close Button */}
                    <div
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '25px',
                            right: '25px',
                            cursor: 'pointer',
                            color: '#c5a367',
                            zIndex: 1010,
                            padding: '10px'
                        }}
                    >
                        <X size={32} />
                    </div>

                    <div className="floral-ornament top" style={{ marginTop: '40px', marginBottom: '20px' }} />
                    <img src="/images/logo_clean.png" alt="Logo" style={{ height: '45px', mixBlendMode: 'screen', marginBottom: '30px', opacity: 0.9 }} />

                    <div className="mobile-links-wrapper" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        alignItems: 'center',
                        zIndex: 1001,
                        width: '100%'
                    }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="mobile-nav-link"
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    color: '#ffffff',
                                    textDecoration: 'none',
                                    fontWeight: '400',
                                    fontSize: 'clamp(3rem, 15vw, 4.8rem)',
                                    fontFamily: "'Rouge Script', cursive",
                                    opacity: 0,
                                    position: 'relative',
                                    textAlign: 'center',
                                    padding: '10px 30px',
                                    lineHeight: '1.2',
                                    textShadow: '2px 2px 15px rgba(0,0,0,1), 0 0 25px rgba(197, 163, 103, 0.3)',
                                    WebkitTextStroke: '0.2px rgba(255,255,255,0.05)',
                                    width: '100%',
                                    display: 'block'
                                }}
                            >
                                {link.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                <div className="gold-separator" />
                            </a>
                        ))}
                    </div>

                    <div className="floral-ornament bottom" style={{ marginTop: '30px', marginBottom: '50px' }} />

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1001, paddingBottom: '40px' }}>
                        <a
                            href="#booking"
                            onClick={() => setIsMenuOpen(false)}
                            className="mobile-cta"
                            style={{
                                padding: '16px 50px',
                                fontSize: '1rem',
                                letterSpacing: '4px',
                                opacity: 0,
                                background: 'linear-gradient(to right, #c5a367, #e8d5b5, #c5a367)',
                                backgroundSize: '200% auto',
                                animation: 'shine 3s linear infinite',
                                color: '#000',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '800',
                                boxShadow: '0 15px 35px rgba(197, 163, 103, 0.4)',
                                textTransform: 'uppercase'
                            }}
                        >
                            BOOK A STAY
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .floral-ornament {
                    width: 120px;
                    height: 40px;
                    background-image: url("https://www.transparenttextures.com/patterns/vintage-flora.png");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    opacity: 0.4;
                    filter: invert(70%) sepia(50%) saturate(500%) hue-rotate(5deg);
                }
                .floral-ornament.top { transform: rotate(180deg); }

                /* Menu Background Effects */
                .bokeh-layer {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    pointer-events: none;
                    z-index: 1000;
                }
                .bokeh-particle {
                    position: absolute;
                    background: radial-gradient(circle, rgba(197, 163, 103, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    filter: blur(20px);
                    opacity: 0.2;
                    animation: float 20s infinite alternate ease-in-out;
                }
                .bp1 { width: 300px; height: 300px; top: -50px; left: -50px; }
                .bp2 { width: 400px; height: 400px; bottom: -100px; right: -50px; animation-duration: 30s; delay: -5s; }
                .bp3 { width: 250px; height: 250px; top: 40%; left: 30%; animation-duration: 35s; delay: -10s; }

                @keyframes float {
                    0% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    100% { transform: translate(100px, 100px) scale(1.1) rotate(10deg); }
                }

                @keyframes shine {
                    to { background-position: 200% center; }
                }

                .mobile-nav-link .gold-separator {
                    position: absolute;
                    bottom: -1px;
                    left: 50%;
                    width: 40px;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(197, 163, 103, 0.5), transparent);
                    transform: translateX(-50%);
                    opacity: 0.3;
                    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .mobile-nav-link:hover .gold-separator {
                    width: 200px;
                    opacity: 1;
                }

                .nav-link-item::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--primary);
                    transition: width 0.3s ease;
                }
                .nav-link-item:hover { color: #fff !important; }
                .nav-link-item:hover::after { width: 100%; }

                @media (max-width: 1024px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
                @media (min-width: 1025px) {
                    .mobile-toggle { display: none !important; }
                }
            `}</style>
        </>
    );
};

export default Navbar;
