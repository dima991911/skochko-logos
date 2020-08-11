import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import './ProjectItemComponent.css';

import { config } from "../../config";
import { commonIcons } from "../../images/icons";

import ParallaxPreviewComponent from "../ParallaxPreviewComponent/ParallaxPreviewComponent";

function ProjectItemComponent({ work, history, id, isAuth, removeProject }) {
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

    const handleRemoveProject = () => {
        removeProject();
    };

    return (
        <div className="column">
            {
                isAuth &&
                    <div className="remove-project" onClick={handleRemoveProject}>
                        <img src={commonIcons.remove} alt="remove" />
                    </div>
            }

            <ParallaxPreviewComponent imgUrl={`${config.publicApiForImages}${work.preview}`} onClick={navigateToProjectPresentation} />

            <div className="work-name-container">
                <span className="work-name-title">{work.name}</span>
                <span className="work-name-line" />
            </div>
            <p className="work-description">
                {work.slogan || ''}
            </p>
        </div>
    )
}

export default withRouter(ProjectItemComponent);
