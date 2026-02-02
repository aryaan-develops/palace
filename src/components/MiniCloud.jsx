import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, X, Sparkles } from 'lucide-react';
import './MiniCloud.css';

const DIALOGS = [
    "I can show you real luxury...",
    "Feeling royal today?",
    "Need a escape to nature?",
    "Trinity Palace awaits you!",
    "Looking for the perfect stay?",
    "Let's find your sanctuary.",
    "Breathtaking views ahead!",
    "Luxury is in the details."
];

const MiniCloud = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [position, setPosition] = useState({
        x: window.innerWidth - (window.innerWidth < 768 ? 100 : 150),
        y: window.innerHeight - (window.innerWidth < 768 ? 100 : 150)
    });
    const [isDragging, setIsDragging] = useState(false);
    const [currentDialog, setCurrentDialog] = useState(DIALOGS[0]);
    const [showDialog, setShowDialog] = useState(false);
    const [isTeleporting, setIsTeleporting] = useState(false);

    const dragStartPos = useRef({ x: 0, y: 0 });
    const cloudRef = useRef(null);
    const dialogInterval = useRef(null);
    const teleportInterval = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Periodically show random dialogs
        dialogInterval.current = setInterval(() => {
            if (!isOpen && !isDragging) {
                setCurrentDialog(DIALOGS[Math.floor(Math.random() * DIALOGS.length)]);
                setShowDialog(true);
                setTimeout(() => setShowDialog(false), 4000);
            }
        }, 8000);

        // Random Teleport / Jump Movement Loop
        teleportInterval.current = setInterval(() => {
            if (!isOpen && !isDragging) {
                performTeleport();
            }
        }, 12000);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearInterval(dialogInterval.current);
            clearInterval(teleportInterval.current);
        };
    }, [isOpen, isDragging]);

    const performTeleport = () => {
        setIsTeleporting(true);
        setTimeout(() => {
            const padding = 100;
            const newX = Math.random() * (window.innerWidth - padding * 2) + padding;
            const newY = Math.random() * (window.innerHeight - padding * 2) + padding;
            setPosition({ x: newX, y: newY });

            // Randomly trigger a dialog when teleporting
            setCurrentDialog(DIALOGS[Math.floor(Math.random() * DIALOGS.length)]);
            setShowDialog(true);
            setTimeout(() => setShowDialog(false), 3000);

            setTimeout(() => setIsTeleporting(false), 500);
        }, 500);
    };

    const toggleMenu = (e) => {
        if (isDragging) return;
        e.stopPropagation();
        setIsOpen(!isOpen);
        setShowDialog(false);
    };

    const handleMouseDown = (e) => {
        setIsDragging(false);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };

        const handleMouseMove = (mmE) => {
            setIsDragging(true);
            const newX = mmE.clientX - dragStartPos.current.x;
            const newY = mmE.clientY - dragStartPos.current.y;
            setPosition({ x: newX, y: newY });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setTimeout(() => setIsDragging(false), 50);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (e) => {
        setIsDragging(false);
        const touch = e.touches[0];
        dragStartPos.current = {
            x: touch.clientX - position.x,
            y: touch.clientY - position.y
        };

        const handleTouchMove = (tmE) => {
            setIsDragging(true);
            const touch = tmE.touches[0];
            const newX = touch.clientX - dragStartPos.current.x;
            const newY = touch.clientY - dragStartPos.current.y;
            setPosition({ x: newX, y: newY });
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            setTimeout(() => setIsDragging(false), 50);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    return (
        <div
            className={`mini-cloud-wrapper ${isOpen ? 'active' : ''} ${isDragging ? 'dragging' : ''} ${isTeleporting ? 'teleporting' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            {/* Dialog Bubble */}
            <div className={`cloud-dialog ${showDialog ? 'visible' : ''}`}>
                <Sparkles size={12} className="sparkle-icon" />
                {currentDialog}
            </div>

            {/* The Cloud it self */}
            <div
                className="cloud-container"
                onClick={toggleMenu}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                ref={cloudRef}
            >
                <div className="cloud-body">
                    <div className="puff puff-1"></div>
                    <div className="puff puff-2"></div>
                    <div className="puff puff-3"></div>
                    <div className="puff puff-4"></div>
                    <div className="cloud-face">
                        <div className="eye"></div>
                        <div className="eye"></div>
                    </div>
                </div>
            </div>

            {/* The Menu */}
            <div className={`cloud-menu ${isOpen ? 'show' : ''} ${position.x > window.innerWidth / 2 ? 'align-right' : 'align-left'}`}>
                <div className="menu-header">
                    <span>Royal Concierge</span>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>
                        <X size={16} />
                    </button>
                </div>
                <div className="menu-options">
                    <a href="https://maps.app.goo.gl/9mS1m3N9m8bM6vR9A" target="_blank" rel="noopener noreferrer" className="menu-item">
                        <div className="icon-box"><MapPin size={20} /></div>
                        <div className="item-text">
                            <strong>View Map</strong>
                            <span>Find our location</span>
                        </div>
                    </a>
                    <a href="#booking" className="menu-item">
                        <div className="icon-box"><Calendar size={20} /></div>
                        <div className="item-text">
                            <strong>Book Now</strong>
                            <span>Reserve your stay</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MiniCloud;
