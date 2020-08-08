import React from 'react';
import { connect } from 'react-redux';
import './CreateProjectPresentationPage.css';

import { updateNewProject } from "../../store/actions";
import SectionImageComponent from "../../compnents/SectionImageComponent/SectionImageComponent";
import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationImageListComponent from "../../compnents/PresentationImageListComponent/PresentationImageListComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";
import ColorPickerComponent from "../../compnents/ColorPickerComponent/ColorPickerComponent";

function CreateProjectPresentationPage({ newProject, updateNewProject }) {

    const { topSectionImg, images, bottomSectionImg, backgroundColor, textColor } = newProject;

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

    return (
        <div className="page-container" style={{ backgroundColor: backgroundColor, color: textColor }}>
            <SectionImageComponent
                image={topSectionImg}
                changeImage={handleChangeTopSectionImg}
            />

            <ProjectInfoComponent
                project={newProject}
                updateProject={handleUpdateProjectInfo}
            />

            <PresentationImageListComponent
                images={images}
                addImage={handleAddImage}
                removeImage={handleRemoveImage}
            />

            <PresentationFeedbackComponent
                project={newProject}
                updateProject={handleUpdateProjectInfo}
            />

            <SectionImageComponent
                notFullHeight
                image={bottomSectionImg}
                changeImage={handleChangeBottomSectionImg}
            />

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
