import React from 'react';
import { Waves, Utensils, ShieldCheck, HeartPulse, Dumbbell, BookOpen, Gamepad2, Flag, Target, Palmtree } from 'lucide-react';

const amenities = [
    { icon: <HeartPulse />, title: 'Spa & Salon', desc: 'Holistic wellness treatments.' },
    { icon: <Utensils />, title: 'Fine Dining', desc: 'World-class culinary journey.' },
    { icon: <Waves />, title: 'Swimming Pool', desc: 'Serene water escape.' },
    { icon: <Dumbbell />, title: 'Modern Gym', desc: 'Fully equipped fitness center.' },
    { icon: <BookOpen />, title: 'Library', desc: 'Quiet space for literature lovers.' },
    { icon: <Gamepad2 />, title: 'Indoor Games', desc: 'Entertainment for all ages.' },
    { icon: <Flag />, title: 'Mini Golf', desc: 'Fun-filled precision play.' },
    { icon: <Target />, title: 'Paintball', desc: 'Thrill and tactical adventure.' },
    { icon: <Palmtree />, title: 'Artificial Beach', desc: 'Tropical vibes on the hill top.' },
];

const Amenities = () => {
    return (
        <section id="services" className="amenities-section" style={{ background: '#fff', color: 'var(--text-dark)' }}>
            <h2 className="amenities-title text-center mb-40">Discover <span className="text-gold">Luxury Amenities</span></h2>
            <div className="amenities-grid">
                {amenities.map((item, index) => (
                    <div key={index} className="amenity-card">
                        <div className="text-gold mb-20" style={{ transform: 'scale(1.5)', display: 'inline-block' }}>
                            {item.icon}
                        </div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{item.title}</h3>
                        <p style={{ opacity: 0.8, fontSize: '1.6rem', fontFamily: "'Mrs Saint Delafield', cursive" }}>{item.desc}</p>
                    </div>
                ))}
            </div>

            <style>{`
        .amenities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2px;
            background: 'rgba(0,0,0,0.05)';
            border: 1px solid rgba(0,0,0,0.05);
        }
        .amenity-card {
            padding: 50px;
            text-align: center;
            background: #fff;
            transition: var(--transition);
        }
        .amenities-title {
            font-size: 3.5rem;
        }
        .amenity-card:hover {
          background: var(--sage-light) !important;
          z-index: 1;
        }

        @media (max-width: 768px) {
            .amenities-grid {
                grid-template-columns: 1fr;
            }
            .amenity-card {
                padding: 30px 20px;
            }
            .amenities-title {
                font-size: 2.5rem;
            }
        }
      `}</style>
        </section>
    );
};

export default Amenities;
