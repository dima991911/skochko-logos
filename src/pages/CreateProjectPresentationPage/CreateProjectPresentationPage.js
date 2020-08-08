import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './CreateProjectPresentationPage.css';

import { updateNewProject } from "../../store/actions";
import SectionImageComponent from "../../compnents/SectionImageComponent/SectionImageComponent";
import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationImageListComponent from "../../compnents/PresentationImageListComponent/PresentationImageListComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";
import ColorPickerComponent from "../../compnents/ColorPickerComponent/ColorPickerComponent";

function CreateProjectPresentationPage({ newProject, updateNewProject, history }) {
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

    const handleRemoveImage = (images) => {
        const updatedProject = { ...newProject, images };
        updateNewProject(updatedProject);
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
        const isValidaPresentation = validatePresentation();
        console.log(newProject, isValidaPresentation);
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

            <div className="panel-control">
                <div className="panel-control-show-icon" />

                <div className="panel-control-color-container">
                    <div className="panel-control-color-item">
                        <ColorPickerComponent
                            title="Background"
                            color={backgroundColor}
                            onChangeColor={handleChangeBackgroundColor}
                        />
                    </div>
                    <div className="panel-control-color-item">
                        <ColorPickerComponent
                            title="Text color"
                            color={textColor}
                            onChangeColor={handleChangeTextColor}
                        />
                    </div>
                </div>

                <div className="save-button-container">
                    <button className="save-button" onClick={handleSavePresentation}>SAVE</button>
                </div>

                <div className="preview-container">
                    Show Preview
                    <input type="checkbox" value={isPreview} onClick={handleIsPreview} />
                </div>
            </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectPresentationPage);
