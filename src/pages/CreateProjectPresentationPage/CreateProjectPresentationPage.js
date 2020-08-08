import React from 'react';
import { connect } from 'react-redux';
import './CreateProjectPresentationPage.css';

import { updateNewProject } from "../../store/actions";
import SectionImageComponent from "../../compnents/SectionImageComponent/SectionImageComponent";
import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationImageListComponent from "../../compnents/PresentationImageListComponent/PresentationImageListComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";

function CreateProjectPresentationPage({ newProject, updateNewProject }) {

    const { topSectionImg, images, bottomSectionImg } = newProject;

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

    return (
        <div className="page-container">
            <div className="panel-control">
                <div className="panel-control-show-icon" />
                <p>some new</p>
            </div>

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
