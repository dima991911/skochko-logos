import React, {useEffect, useRef} from 'react';
import './HeaderComponent.css';

import logo from "../../images/logo.png";
import { commonIcons } from "../../images/icons";

export default function HeaderComponent() {
    const headerRef = useRef(null);

    useEffect(() => {
        const initScroll = () => {
            const width = window.innerWidth;
            const scrollY = window.scrollY;

            if (width < 1300 && scrollY > 50) {
                headerRef.current.style.opacity = 0;
            } else {
                headerRef.current.style.opacity = 1;
            }
        };

        window.addEventListener('scroll', initScroll);

        return () => {
            window.removeEventListener('scroll', initScroll);
        }
    }, []);

    return (
        <header className="header" ref={headerRef}>
            <div className="header-logo">
                <img src={logo} alt="Logo" />
            </div>

            <div className="header-links">
                <a
                    className="header-link-item"
                    href="https://dribbble.com/skochko_design"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img src={commonIcons.dribble} alt="dribble" />
                </a>
                <a
                    className="header-link-item"
                    href="mailto:info@skochko.net"
                    title="info@skochko.net"
                >
                    <img src={commonIcons.email} alt="email" />
                </a>
            </div>
        </header>
    )
}
