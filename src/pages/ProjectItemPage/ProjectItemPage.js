import React, { useEffect } from 'react';
import { connect } from "react-redux";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import './ProjectItemPage.css';

import { fetchProjects } from "../../store/actions";
import { ProjectService } from "../../services/ProjectService";

import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";
import HeaderComponent from "../../compnents/HeaderComponent/HeaderComponent";

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
                    <ScrollAnimation animateIn="fadeIn" duration={1.7} animateOnce={true}>
                        <img src={`${img.url}`} alt="Presentation" />
                    </ScrollAnimation>
                </div>
        ))
    };

    return (
        <>
            {project &&
                <div className="project-container" style={{ backgroundColor: project.backgroundColor, color: project.textColor }}>
                    <HeaderComponent isBackBtn />

                    <ScrollAnimation animateIn="fadeIn" duration={1.7} animateOnce={true}>
                        <div className="top-section-avatar" style={{ backgroundImage: `url('${project.topSectionImg}')` }} />
                    </ScrollAnimation>

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
                            <ScrollAnimation animateIn="fadeIn" duration={1.7} animateOnce={true}>
                                <div className="project-item-image">
                                    <img src={`${project.bottomSectionImg}`} alt="Presentation" />
                                </div>
                            </ScrollAnimation>
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
