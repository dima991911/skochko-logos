import React, { useEffect } from 'react';
import { connect } from "react-redux";
import ScrollAnimation from 'react-animate-on-scroll';
import './ProjectItemPage.css';

import { fetchProjects } from "../../store/actions";
import { ProjectService } from "../../services/ProjectService";

import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";

function ProjectItemPage({ project, match, fetchProjects }) {

    useEffect(() => {
        const { slug } = match.params;
        if (!project) {
            ProjectService.fetchProjectById(slug)
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
                    <ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
                        <img src={`${img.url}`} alt="Presentation" />
                    </ScrollAnimation>
                </div>
        ))
    };

    return (
        <>
            {project &&
                <div className="project-container" style={{ backgroundColor: project.backgroundColor, color: project.textColor }}>
                    <div className="top-section-avatar" style={{ backgroundImage: `url('${project.topSectionImg}')` }} />

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
                                <img src={`${project.bottomSectionImg}`} alt="Presentation" />
                            </div>
                    }
                </div>
            }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { slug } = ownProps.match.params;
    const project = state.projects.find(prj => prj.slug === slug);

    return {
        project: project,
    };
};

const mapDispatchToProps = {
    fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItemPage);
