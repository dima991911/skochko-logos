import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import './ProjectItemComponent.css';

import { config } from "../../config";
import { commonIcons } from "../../images/icons";

import ParallaxPreviewComponent from "../ParallaxPreviewComponent/ParallaxPreviewComponent";

function ProjectItemComponent({ work, history, slug, isAuth, isFirstProject, isLastProject, removeProject, changeOrder }) {
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
        history.push('/projects/' + slug);
    };

    const handleRemoveProject = () => {
        removeProject();
    };

    const handleChangeOrder = (isToTop) => {
        changeOrder(isToTop);
    };

    return (
        <div className="column">
            {
                isAuth &&
                    <div className="actions-wrapper">

                        <div className="action-item remove-project" onClick={handleRemoveProject}>
                            <img src={commonIcons.remove} alt="remove" />
                        </div>
                        {
                            !isFirstProject &&
                                <div className="action-item remove-project" onClick={() => handleChangeOrder(true)}>
                                    T
                                </div>
                        }
                        {
                            !isLastProject &&
                                <div className="action-item remove-project" onClick={() => handleChangeOrder(false)}>
                                    B
                                </div>
                        }
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
