import React, { useEffect } from "react";
import './ProjectItemComponent.css';

import ParallaxPreviewComponent from "../ParallaxPreviewComponent/ParallaxPreviewComponent";

export function ProjectItemComponent({ work, history, id }) {
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0 ,0);
        };

        window.addEventListener('beforeunload', scrollToTop);

        return () => {
            window.removeEventListener("beforeunload", scrollToTop);
        }
    }, []);

    const navigateToProjectPresentation = () => {
        history.push('/projects/' + id);
    };

    return (
        <div className="column">
            <ParallaxPreviewComponent imgUrl={work.avatarUrl} onClick={navigateToProjectPresentation} />

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