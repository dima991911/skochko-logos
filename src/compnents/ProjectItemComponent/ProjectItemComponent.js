import React, { useEffect, useRef } from "react";
import './ProjectItemComponent.css';
import { Parallax } from "react-scroll-parallax";

export function ProjectItemComponent({ work, history, id }) {
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

    const navigateToProjectPresentation = () => {
        history.push('/projects/' + id);
    };

    return (
        <div className="column">
            <div
                className="bg-avatar-container"
                onClick={navigateToProjectPresentation}
            >
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