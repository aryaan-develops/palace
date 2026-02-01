import React from 'react';
import { ChevronRight } from 'lucide-react';

const accommodations = [
    {
        title: 'Spa Suite',
        subtitle: 'Suite Rooms',
        desc: 'Indulge in our Spa Suite Rooms, where luxury meets tranquility. Enjoy private spa treatments and soothing ambiance.',
        image: '/images/suite.png'
    },
    {
        title: 'The Palash Villas',
        subtitle: 'Deluxe Villa',
        desc: 'Our deluxe cottage rooms truly exhibit that grandiose welcome to our guests with expertly styled appointments.',
        image: '/images/living.png'
    },
    {
        title: 'The Pool Villas',
        subtitle: 'Private Pool',
        desc: 'Modern elegance meets natural beauty. Each villa features a private pool, spacious living areas, and personalized service.',
        image: '/images/lounge.png'
    }
];

const Accommodation = () => {
    return (
        <section id="accommodation" className="accommodation-section" style={{ background: 'var(--bg-light)', color: 'var(--text-dark)' }}>
            <div className="section-header mb-40">
                <h2 className="acc-title">Suites & <span style={{ color: 'var(--primary)' }}>Villas</span></h2>
                <p style={{ fontSize: '1.2rem', opacity: 0.6, maxWidth: '600px' }}>
                    Expertly styled and purposefully appointed, taking its cues from the tropical beauty of this paradise.
                </p>
            </div>

            <div className="accommodation-grid">
                {accommodations.map((item, index) => (
                    <div key={index} className="accommodation-card" style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '0px', /* Minimalist flat style */
                        background: '#fff',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                        transition: 'var(--transition)'
                    }}>
                        <div className="image-box acc-image-box">
                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)' }} className="acc-img" />
                        </div>
                        <div className="info-box" style={{ padding: '30px' }}>
                            <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>{item.subtitle}</span>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{item.title}</h3>
                            <p style={{ opacity: 0.7, marginBottom: '25px', fontSize: '0.95rem' }}>{item.desc}</p>
                            <a href="#booking" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                color: 'var(--text-dark)',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}>
                                BOOK NOW <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .accommodation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 40px;
        }
        .acc-image-box {
            height: 400px;
            overflow: hidden;
        }
        .acc-title {
            font-size: 3.5rem;
            margin-bottom: 10px;
        }
        .accommodation-card:hover .acc-img {
          transform: scale(1.1);
        }
        .accommodation-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
            .accommodation-grid {
                grid-template-columns: 1fr;
                gap: 30px;
            }
            .acc-image-box {
                height: 250px;
            }
            .acc-title {
                font-size: 2.5rem;
            }
        }
      `}</style>
        </section>
    );
};

export default Accommodation;
