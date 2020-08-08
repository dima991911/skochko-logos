import React from 'react';
import './ProjectInfoComponent.css';

import EditableComponent from "../EditableComponent/EditableComponent";

export default function ProjectInfoComponent({ project, updateProject, isPreview }) {

    const handleChangeName = (name) => {
        const updatedProject = { ...project, name };
        updateProject(updatedProject);
    };

    const handleChangeSlogan = (slogan) => {
        const updatedProject = { ...project, slogan };
        updateProject(updatedProject);
    };

    const handleChangeDescription = (description) => {
        const updatedProject = { ...project, description };
        updateProject(updatedProject);
    };

    const handleChangeWebsite = (websiteLink) => {
        const updatedProject = { ...project, websiteLink };
        updateProject(updatedProject);
    };

    return (
        <div className="project-info">
            <EditableComponent
                value={project.name}
                saveValue={handleChangeName}
                isPreview={isPreview}
            >
                <h1 className="project-info-name project-info-item">
                    {project.name || 'Name'}
                </h1>
            </EditableComponent>

            {
                (isPreview && project.slogan) || !isPreview ?
                    <EditableComponent
                        value={project.slogan}
                        saveValue={handleChangeSlogan}
                        isPreview={isPreview}
                    >
                        <h2 className="project-info-slogan">
                            {project.slogan || 'Slogan'}
                        </h2>
                    </EditableComponent> : null
            }

            {
                (isPreview && project.description) || !isPreview ?
                    <EditableComponent
                        value={project.description}
                        saveValue={handleChangeDescription}
                        isPreview={isPreview}
                    >
                        <div className="project-info-item">
                            <p className="project-info-description">
                                {project.description || 'Description'}
                            </p>
                        </div>
                    </EditableComponent> : null
            }

            {
                (isPreview && project.websiteLink) || !isPreview ?
                    <EditableComponent
                        value={project.websiteLink}
                        saveValue={handleChangeWebsite}
                        isPreview={isPreview}
                    >
                        <div className="project-info-item">
                            <a
                                className="project-info-website-link"
                                rel="noopener noreferrer"
                                target="_blank"
                                href={project.websiteLink}
                            >
                                Visit Website
                            </a>
                        </div>
                    </EditableComponent> : null
            }
        </div>
    )
}
