import React, { useEffect, useState } from "react";
import { ParallaxProvider } from 'react-scroll-parallax';
import "./App.css";

import { ProjectItemComponent } from "./compnents/ProjectItemComponent/ProjectItemComponent";
import { works } from "./images/works";

const topSectionTitles = [
    'We do amazing',
    'things with amazing',
    'People',
];

function App() {
    const [canAnimateTitle, setAnimateTitle] = useState(false);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0 ,0);
        };

        const animateTitle = () => {
            setAnimateTitle(true);
        };

        window.addEventListener('beforeunload', scrollToTop);
        window.addEventListener('load', animateTitle);

        return () => {
            window.removeEventListener('beforeunload', scrollToTop);
            window.removeEventListener('load', animateTitle);
        }
    }, []);

    return (
        <ParallaxProvider>
            <div className="page">
                <div className="top-section-wrapper">
                    <header className="header">
                        <div className="header-logo">Logo</div>
                        <div className="header-link">Some link</div>
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
                                <ProjectItemComponent work={work} key={i} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </ParallaxProvider>
    );
}

export default App;
