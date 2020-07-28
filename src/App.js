import React, {useRef, useEffect, useState} from "react";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import "./App.css";

import beard from './images/works/01_beardstyle_800x900.jpg';
import prospervideo from './images/works/02_prospervideo_800x900.jpg';
import ditchingdisponsable from './images/works/03_ditchingdisponsable_800x900.jpg';
import emilyjrealty from './images/works/04_emilyjrealty_800x900.jpg';
import igp from './images/works/05_igp_800x900.jpg';
import lemontnoir from './images/works/06_lemontnoir_800x900.jpg';
import sakseide from './images/works/07_sakseide_800x900.jpg';
import mainevent from './images/works/08_mainevent_800x900.jpg';
import aaronanthony from './images/works/09_aaronanthony_800x900.jpg';
import britishloghomes from './images/works/10_britishloghomes_800x900.jpg';
import starsandbones from './images/works/11_starsandbones_800x900.jpg';
import archx from './images/works/12_archx_800x900.jpg';

const works = [
    [
        { avatarUrl: beard, name: 'BEARD STYLE', description: 'Helping men grow and groom awesome beards' },
        { avatarUrl: prospervideo, name: 'PROSPER.VIDEO', description: 'Mobile-first video production studio' },
    ],
    [
        { avatarUrl: ditchingdisponsable, name: 'DITCHING DISPONSABLES', description: 'You make a difference' },
        { avatarUrl: emilyjrealty, name: 'EMILY J', description: 'Real estate company' },
    ],
    [
        { avatarUrl: igp, name: 'INSTANT GLOBAL PAYMENTS', description: 'Send money to any country with world-class exchange rates' },
        { avatarUrl: lemontnoir, name: 'LE MONTNOIR', description: 'Fine furniture' },
    ],
    [
        { avatarUrl: sakseide, name: 'SAKSEIDE CONSULTING', description: 'Change management, organizational psychology' },
        { avatarUrl: mainevent, name: 'MAIN EVENT CATERING', description: 'Voted Anchorage, “Alaska’s Best Caterer”' },
    ],
    [
        { avatarUrl: aaronanthony, name: 'AARON ANTHONY', description: '' },
        { avatarUrl: britishloghomes, name: 'BRITISH LOG HOMES', description: 'The home of handcrafted log cabins in the UK' },
    ],
    [
        { avatarUrl: starsandbones, name: 'STARS&BONES', description: 'Audiovisual production company' },
        { avatarUrl: archx, name: 'ARCH X', description: 'Residential architectural design' },
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
