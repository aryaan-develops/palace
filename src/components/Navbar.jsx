import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        const handleScroll = () => {
            // Updated threshold to 50px for a cleaner landing
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen && typeof gsap !== 'undefined') {
            gsap.fromTo('.mobile-nav-link',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
            );
            gsap.fromTo('.mobile-cta',
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, delay: 0.8, ease: 'back.out(1.7)' }
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
                padding: scrolled ? '15px 5%' : '25px 5%',
                background: 'rgba(10, 13, 10, 0.98)',
                backdropFilter: 'blur(15px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                zIndex: 1000,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // Hides at top, slides down on scroll
                transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
                opacity: scrolled ? 1 : 0,
                pointerEvents: scrolled ? 'all' : 'none'
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/images/logo_clean.png"
                        alt="Trinity Palace"
                        style={{
                            height: scrolled ? '50px' : '70px',
                            transition: 'height 0.4s ease',
                            mixBlendMode: 'screen'
                        }}
                    />
                </div>

                {/* Desktop Links */}
                <div className="desktop-nav" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <div className="nav-links" style={{ display: 'flex', gap: '25px' }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    fontWeight: '400',
                                    fontSize: '0.75rem',
                                    letterSpacing: '2px'
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
                height: '100vh',
                background: '#0a0d0a',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '30px',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            }}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="mobile-nav-link"
                        onClick={() => setIsMenuOpen(false)}
                        style={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1.5rem',
                            letterSpacing: '3px',
                            opacity: 0 // Initial state for GSAP
                        }}
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="#booking"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary mobile-cta"
                    style={{
                        padding: '15px 40px',
                        fontSize: '1rem',
                        letterSpacing: '2px',
                        marginTop: '20px',
                        opacity: 0 // Initial state for GSAP
                    }}
                >
                    BOOK A STAY
                </a>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                    }
                }
                @media (min-width: 1025px) {
                    .mobile-toggle {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
};
export default Navbar;
