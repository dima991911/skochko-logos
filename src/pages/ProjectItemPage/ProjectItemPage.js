import React, { useEffect } from 'react';
import { connect } from "react-redux";
import ScrollAnimation from 'react-animate-on-scroll';
import './ProjectItemPage.css';

import { config } from "../../config";
import { fetchProjects } from "../../store/actions";
import { ProjectService } from "../../services/ProjectService";

import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";

function ProjectItemPage({ project, match, fetchProjects }) {

    useEffect(() => {
        const { id } = match.params;
        if (!project) {
            ProjectService.fetchProjectById(id)
                .then(res => {
                    fetchProjects([res.project]);
                })
                .catch(err => {
                    alert('Something wen wrong');
                });
        }
    });

    const renderImages = () => {
        const { images } = project;

        return images.map(img => (
                <div className="project-item-image" key={img._id}>
                    <ScrollAnimation animateIn="fadeIn" duration={0.3} animateOnce={true}>
                        <img src={`${config.publicApiForImages}${img.url}`} alt="Presentation" />
                    </ScrollAnimation>
                </div>
        ))
    };

    return (
        <>
            {project &&
                <div className="project-container" style={{ backgroundColor: project.backgroundColor, color: project.textColor }}>
                    <div className="top-section-avatar" style={{ backgroundImage: `url('${config.publicApiForImages}${project.topSectionImg}')` }} />

                    <ProjectInfoComponent
                        project={project}
                        isPreview={true}
                    />

                    {renderImages()}


                    {
                        project.feedback &&
                            <PresentationFeedbackComponent
                                project={project}
                                isPreview={true}
                            />
                    }

                    {
                        project.bottomSectionImg &&
                            <div className="project-item-image">
                                <img src={`${config.publicApiForImages}${project.bottomSectionImg}`} alt="Presentation" />
                            </div>
                    }
                </div>
            }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const project = state.projects.find(prj => prj._id === id);

    return {
        project: project,
    };
};

const mapDispatchToProps = {
    fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItemPage);
