import React, { useEffect, useState, useRef } from "react";
import "./HomePage.css";
import logo from '../../images/logo.png';
import { commonIcons } from "../../images/icons";

import { SmoothScroll } from "../../helpers/helpers";
import { ProjectItemComponent } from "../../compnents/ProjectItemComponent/ProjectItemComponent";
import { works } from "../../images/works";

const topSectionTitles = [
    'Welcome to my',
    'Portfolio',
];

function HomePage({ history }) {
    const [canAnimateTitle, setAnimateTitle] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const initPage = () => {
            setAnimateTitle(true);
        };

        const initScroll = () => {
            const width = window.innerWidth;
            const scrollY = window.scrollY;

            if (width < 1300 && scrollY > 50) {
                headerRef.current.style.opacity = 0;
            } else {
                headerRef.current.style.opacity = 1;
            }
        };

        window.addEventListener('load', initPage);
        window.addEventListener('scroll', initScroll);

        return () => {
            window.removeEventListener('load', initPage);
            window.removeEventListener('scroll', initScroll);
        }
    }, []);

    return (
        <div className="page">
            <div className="top-section-wrapper">
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

                <section className="top-section">
                    {canAnimateTitle && (
                        <h1>
                            {topSectionTitles.map((title, index) => (
                                <span className="top-section-span-animate-wrapper" key={index}>
                                    <span className="top-section-span" style={{ animationDuration: `${(index * 0.3) + 0.6}s` }}>{title}</span>
                                </span>
                            ))}
                        </h1>
                    )}
                </section>
            </div>

            <div className="works">
                {works.map((column, index) => (
                    <div className="columns" key={index}>
                        {column.map((work, i) => (
                            <ProjectItemComponent
                                work={work}
                                history={history}
                                id={`${index}${i}`}
                                key={i}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
