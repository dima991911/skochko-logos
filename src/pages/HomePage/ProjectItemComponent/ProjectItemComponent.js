import React, { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import './ProjectItemComponent.css';

import { config } from "../../../config/index";
import { commonIcons } from "../../../images/icons";

import ParallaxPreviewComponent from "../../../compnents/ParallaxPreviewComponent/ParallaxPreviewComponent";
import ProjectActionsComponent from "../ProjectActionsComponent/ProjectActionsComponent";

function ProjectItemComponent({ work, history, slug, isAuth, isFirstProject, isLastProject,
                                  navigateToEditProject, removeProject, changeOrder, changePreview }) {
    const inputEl = useRef(null);

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

    const openInputFile = () => {
        inputEl.current.click();
    };

    const handleEditPreview = (e) => {
        const preview = e.target.files[0];
        changePreview(preview);
    };

    const actions = [
        { name: 'Edit Preview', onClick: openInputFile },
        { name: 'Edit Presentation', onClick: navigateToEditProject },
    ]

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

                <div className="parallax-container">
                    <ParallaxPreviewComponent imgUrl={`${config.publicApiForImages}${work.preview}`} onClick={navigateToProjectPresentation} />

                    {
                        isAuth &&
                            <div className="project-actions-container">
                                <ProjectActionsComponent actions={actions} />
                            </div>
                    }
                </div>
            <input
                ref={inputEl}
                type="file"
                className="change-preview-input"
                onChange={handleEditPreview}
            />

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
