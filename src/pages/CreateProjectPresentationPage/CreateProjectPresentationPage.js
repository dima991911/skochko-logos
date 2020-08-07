import React from 'react';
import { connect } from 'react-redux';
import './CreateProjectPresentationPage.css';

import { updateNewProject } from "../../store/actions";
import TopSectionImageComponent from "../../compnents/TopSectionImageComponent/TopSectionImageComponent";

function CreateProjectPresentationPage({ newProject, updateNewProject }) {

    const { topSectionImg } = newProject;

    const handleChangeTopSectionImg = (img) => {
        const newProjectUpdated = { ...newProject, topSectionImg: img };
        updateNewProject(newProjectUpdated);
    };

    return (
        <div className="page-container">
            <div className="panel-control">
                <div className="panel-control-show-icon" />
                <p>some new</p>
            </div>

            <TopSectionImageComponent
                image={topSectionImg}
                changeImage={handleChangeTopSectionImg}
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
