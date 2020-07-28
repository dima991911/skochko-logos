import React, { useRef, useEffect } from "react";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import "./App.css";

import jannata from './images/works/jannata2.jpg';
import apprentice from './images/works/apprentice-search.jpg';
import bodyshop from './images/works/bodyshop.jpg';
import clorova from './images/works/clorova.jpg';
import prodotti from './images/works/prodotti.jpg';
import raia from './images/works/raia.jpg';
import relationshift from './images/works/relationshift.jpg';
import vold from './images/works/vold.jpg';

const works = [
    [
        { avatarUrl: jannata, name: 'Jonnata', description: 'Revolutionizing the Nightlife Experience.' },
        { avatarUrl: bodyshop, name: 'Bodyshop', description: 'Revolutionizing the Nightlife Experience.' },
    ],
    [
        { avatarUrl: clorova, name: 'Clorova', description: 'Revolutionizing the Nightlife Experience.' },
        { avatarUrl: apprentice, name: 'Apprentice', description: 'Revolutionizing the Nightlife Experience.' },
    ],
    [
        { avatarUrl: prodotti, name: 'Prodotti', description: 'Revolutionizing the Nightlife Experience.' },
        { avatarUrl: raia, name: 'Raia', description: 'Revolutionizing the Nightlife Experience.' },
    ],
    [
        { avatarUrl: relationshift, name: 'Relationshift', description: 'Revolutionizing the Nightlife Experience.' },
        { avatarUrl: vold, name: 'Vold', description: 'Revolutionizing the Nightlife Experience.' },
    ],
];

const topSectionTitles = [
    'We do amazing',
    'things with amazing',
    'People',
];

function WorkComponent({ work }) {
    const parallaxEl = useRef(null);

    useEffect(() => {
        const parallaxScroll = () => {
            const { current } = parallaxEl;
            const { y } = current.getBoundingClientRect();
            current.style.opacity =  1 - (y / window.innerHeight);
        };

        const scrollToTop = () => {
            window.scrollTo(0 ,0);
        };

        window.addEventListener("scroll", parallaxScroll);
        window.addEventListener('beforeunload', scrollToTop);

        return () => {
            window.removeEventListener("scroll", parallaxScroll);
            window.removeEventListener("beforeunload", scrollToTop);
        }
    }, []);

    return (
        <div className="column">
            <div className="bg-avatar-container">
                <Parallax
                    className="custom-class"
                    y={['-200px', '200px']}
                    tagOuter="figure"
                >
                    <div className="bg-avatar" ref={parallaxEl} style={{ backgroundImage: `url('${work.avatarUrl}')` }} />
                </Parallax>
            </div>
            <div className="work-name-container">
                <span className="work-name-title">{work.name}</span>
                <span className="work-name-line" />
            </div>
            <p className="work-description">
                {work.description}
            </p>
        </div>
    )
}

function App() {

    // useEffect(() => {
    //     const smoothScroll = (e) => {
    //         window.scrollBy({
    //             top: e.deltaY,
    //             left: 0,
    //             behavior: 'smooth'
    //         });
    //     };
    //
    //     document.body.addEventListener('wheel', smoothScroll);
    //
    //     return () => document.body.removeEventListener('wheel', smoothScroll);
    // }, []);

    return (
        <ParallaxProvider>
            <div className="page">
                <div className="top-section-wrapper">
                    <header className="header">
                        <div className="header-wrapper">
                            <div className="header-logo">Logo</div>
                            <div className="header-link">Some link</div>
                        </div>
                    </header>

                    <section className="top-section">
                        <h1>
                            {topSectionTitles.map((title, index) => (
                                <span className="top-section-span-animate-wrapper" key={index}>
                                <span className="top-section-span" style={{ animationDuration: `${(index * 0.4) + 0.7}s` }}>{title}</span>
                            </span>
                            ))}
                        </h1>
                    </section>
                </div>

                <div className="works">
                    {works.map((column, index) => (
                        <div className="columns" key={index}>
                            {column.map((work, i) => (
                                <WorkComponent work={work} key={i} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </ParallaxProvider>
    );
}

export default App;
