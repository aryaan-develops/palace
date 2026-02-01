import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Accommodation from './components/Accommodation';
import Amenities from './components/Amenities';
import CustomCursor from './components/CustomCursor';
import Lenis from '@studio-freight/lenis';
import './index.css';


function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <Accommodation />
        <Amenities />
        <section id="contact" className="contact-section">
          <div className="contact-grid">
            <div className="contact-info-panel">
              <h2 className="mb-40" style={{ fontSize: '3rem' }}>Making Moments <br /><span className="text-gold">Memorable</span></h2>
              <p className="mb-20" style={{ fontSize: '1.2rem', fontWeight: '300', opacity: 0.9 }}>
                Welcome to Trinity Palace, a luxurious retreat where elegance meets nature. Nestled in lush landscapes, our resort offers opulent accommodations and rejuvenating experiences on the tranquil outskirts of Bokaro Steel City.
              </p>
              <p className="mb-40" style={{ opacity: 0.8, fontSize: '1.1rem' }}>Get in touch with us for special reservations, event planning, or luxury staycations in Bokaro Steel City.</p>

              <div className="contact-details">
                <div>
                  <h4 className="detail-title">Location</h4>
                  <p style={{ marginTop: '10px' }}>J58F+6WP, Trinity Palace, Narayanpur, Chas, Bokaro Steel City, Jharkhand 827013</p>
                </div>
                <div>
                  <h4 className="detail-title">Contact Info</h4>
                  <p style={{ marginTop: '10px' }}>+91-XXXX-XXX-XXX | +91-XXXX-XXX-XXX</p>
                  <p>contact@trinitypalace.in</p>
                </div>
              </div>
            </div>

            <div className="glass contact-form-panel">
              <h3 className="mb-20">Send us a Message</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input type="text" placeholder="Full Name" className="form-input" />
                <input type="email" placeholder="Email Address" className="form-input" />
                <textarea placeholder="Tell us about your stay plans..." rows="4" className="form-input"></textarea>
                <button type="button" className="btn-primary" style={{ background: '#fff', color: 'var(--sage)' }}>SEND INQUIRY</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="brand-logo">TRINITY <span className="text-gold">PALACE</span></h2>
            <p className="brand-desc">A premium hilltop resort experience blending luxury with the untamed beauty of nature.</p>
          </div>
          <div className="footer-links">
            <h4 style={{ marginBottom: '20px' }}>DISCOVER</h4>
            <div className="links-list">
              <a href="#" className="footer-link">Home</a>
              <a href="#about" className="footer-link">The Story</a>
              <a href="#accommodation" className="footer-link">Accommodation</a>
            </div>
          </div>
          <div className="footer-links">
            <h4 style={{ marginBottom: '20px' }}>LEGAL</h4>
            <div className="links-list">
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms & Conditions</a>
              <a href="#" className="footer-link">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright-bar">
        © 2026 TRINITY PALACE RESORT & SPA. ALL RIGHTS RESERVED.
      </div>

      <style>{`
        .contact-section {
          background: var(--sage);
          color: #fff;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          text-align: left;
        }
        .detail-title {
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.9rem;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .contact-form-panel {
          padding: 50px;
          border-radius: 0;
        }
        .form-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 0px;
          color: #fff;
          outline: none;
        }
        .form-input:focus {
          border-color: var(--primary);
        }

        .main-footer {
          padding: 100px 10%;
          background: #0a0d0a;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 50px;
        }
        .brand-logo {
          font-size: 1.5rem;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }
        .brand-desc {
          opacity: 0.5;
          max-width: 300px;
        }
        .links-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0.6;
        }
        .footer-link {
          color: #fff;
          text-decoration: none;
          transition: var(--transition);
        }
        .footer-link:hover {
          color: var(--primary);
          padding-left: 5px;
        }
        .copyright-bar {
          background: #0a0d0a;
          padding: 20px 10%;
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.05);
          opacity: 0.4;
          font-size: 0.8rem;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .main-footer {
            padding: 80px 5%;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 768px) {
          .contact-form-panel {
            padding: 30px 20px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
