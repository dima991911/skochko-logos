import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './CreateProjectPresentationPage.css';

import { updateNewProject, createProject } from "../../store/actions";
import { ProjectService } from "../../services/ProjectService";
import { newProjectInit } from "../../helpers/helpers";

import SectionImageComponent from "../../compnents/SectionImageComponent/SectionImageComponent";
import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationImageListComponent from "../../compnents/PresentationImageListComponent/PresentationImageListComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";
import PanelControlComponent from "../../compnents/PanelControlComponent/PanelControlComponent";

function CreateProjectPresentationPage({ newProject, updateNewProject, createProject, history }) {
    const [isPreview, setIsPreview] = useState(false);

    const { topSectionImg, images, bottomSectionImg, backgroundColor, textColor, feedback, name, preview } = newProject;

    useEffect(() => {
        if (!preview) {
            history.push('/');
        }
    }, [preview, history]);

    const validatePresentation = () => {
        if (!topSectionImg || !name) {
            alert('You must have image in top section and project name');
            return false;
        }
        return true;
    };

    const handleIsPreview = () => {
        const isValidPresentation = validatePresentation();
        if (isValidPresentation) setIsPreview(!isPreview);
    };

    const handleChangeTopSectionImg = (topSectionImg) => {
        const newProjectUpdated = { ...newProject, topSectionImg };
        updateNewProject(newProjectUpdated);
    };

    const handleChangeBottomSectionImg = (bottomSectionImg) => {
        const newProjectUpdated = { ...newProject, bottomSectionImg };
        updateNewProject(newProjectUpdated);
    };

    const handleUpdateProjectInfo = (project) => {
        updateNewProject(project);
    };

    const handleAddImage = (img) => {
        const updatedImages = [...images, img];
        const updatedProject = { ...newProject, images: updatedImages };
        updateNewProject(updatedProject);
    };

    const handleRemoveImage = (i) => {
        const updatedImages = [...newProject.images];
        updatedImages.splice(i, 1);
        updateNewProject({ ...newProject, images: updatedImages });
    };

    const handleChangeBackgroundColor = (backgroundColor) => {
        const updatedProject = { ...newProject, backgroundColor };
        updateNewProject(updatedProject);
    };

    const handleChangeTextColor = (textColor) => {
        const updatedProject = { ...newProject, textColor };
        updateNewProject(updatedProject);
    };

    const handleSavePresentation = () => {
        const isValidatePresentation = validatePresentation();
        const fd = generateFormData();

        if (isValidatePresentation) {
            ProjectService.createProject(fd)
                .then(res => {
                    createProject(res.project);
                    updateNewProject({ ...newProjectInit });
                    history.push('/');
                });
        }
    };

    const generateFormData = () => {
        const fd = new FormData();

        for (const key in newProject) {
            if (key !== 'images' && newProject[key]) {
                fd.append(key, newProject[key]);
            }
        }

        newProject.images.forEach(img => {
            fd.append('images', img);
        });

        return fd;
    };

    return (
        <div className="page-container" style={{ backgroundColor: backgroundColor, color: textColor }}>
            <SectionImageComponent
                image={topSectionImg}
                changeImage={handleChangeTopSectionImg}
                isPreview={isPreview}
            />

            <ProjectInfoComponent
                project={newProject}
                updateProject={handleUpdateProjectInfo}
                isPreview={isPreview}
            />

            <PresentationImageListComponent
                images={images}
                addImage={handleAddImage}
                removeImage={handleRemoveImage}
                isPreview={isPreview}
            />

            {
                (isPreview && feedback) || !isPreview ?
                    <PresentationFeedbackComponent
                        project={newProject}
                        updateProject={handleUpdateProjectInfo}
                        isPreview={isPreview}
                    /> : null
            }

            {
                (isPreview && bottomSectionImg) || !isPreview ?
                    <SectionImageComponent
                        notFullHeight
                        image={bottomSectionImg}
                        changeImage={handleChangeBottomSectionImg}
                        isPreview={isPreview}
                    /> : null
            }

            <PanelControlComponent
                textColor={textColor}
                backgroundColor={backgroundColor}
                isPreview={isPreview}
                toggleIsPreview={handleIsPreview}
                changeBackgroundColor={handleChangeBackgroundColor}
                changeTextColor={handleChangeTextColor}
                savePresentation={handleSavePresentation}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        newProject: state.newProject,
    };
};

const mapDispatchToProps = {
    updateNewProject,
    createProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectPresentationPage);
