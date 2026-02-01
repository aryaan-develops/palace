import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';

const BookingBar = () => {
    return (
        <div className="booking-bar-wrapper" style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translate(-50%, 50%)',
            width: '90%',
            maxWidth: '1200px',
            zIndex: 10
        }}>
            <div style={{
                background: '#fff',
                padding: '30px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                borderRadius: '0px'
            }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Calendar className="text-gold" size={24} />
                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Check In</label>
                        <input type="text" placeholder="Select Date" style={{ border: 'none', fontSize: '0.9rem', fontWeight: '600', width: '100%' }} />
                    </div>
                </div>

                <div style={{ width: '1px', height: '40px', background: '#eee' }}></div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Calendar className="text-gold" size={24} />
                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Check Out</label>
                        <input type="text" placeholder="Select Date" style={{ border: 'none', fontSize: '0.9rem', fontWeight: '600', width: '100%' }} />
                    </div>
                </div>

                <div style={{ width: '1px', height: '40px', background: '#eee' }}></div>

                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Users className="text-gold" size={24} />
                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Guests</label>
                        <select style={{ border: 'none', fontSize: '0.9rem', fontWeight: '600', background: 'transparent', width: '100%' }}>
                            <option>1 Adult, 0 Children</option>
                            <option>2 Adults, 0 Children</option>
                            <option>2 Adults, 1 Child</option>
                        </select>
                    </div>
                </div>

                <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '0.9rem', borderRadius: '0', background: 'var(--sage)', color: '#fff' }}>
                    BOOK NOW
                </button>
            </div>
        </div>
    );
};

export default BookingBar;
