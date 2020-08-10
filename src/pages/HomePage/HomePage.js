import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./HomePage.css";

import AddProjectComponent from "./AddProjectComponent/AddProjectComponent";
import { ProjectService } from "../../services/ProjectService";

import { updateNewProject, fetchProjects } from "../../store/actions";
import HeaderComponent from "../../compnents/HeaderComponent/HeaderComponent";
import ProjectItemComponent from "../../compnents/ProjectItemComponent/ProjectItemComponent";

const topSectionTitles = [
    'Welcome to my',
    'Portfolio',
];

function HomePage({ isAuth, projects, newProject, updateNewProject, fetchProjects }) {
    const [canAnimateTitle, setAnimateTitle] = useState(false);

    useEffect(() => {
        ProjectService.fetchProjects().then(res => {
            fetchProjects(res.projects);
        }).catch(err => {
            alert(`${err.message}. Please try again`);
        });

        setTimeout(() => {
            setAnimateTitle(true);
        }, 1500);
    }, []);

    const renderProjects = () => {
        // TODO: change id to slug
        return projects.map((project) => (
            <ProjectItemComponent
                work={project}
                id={project._id}
                key={project._id}
            />
        ))
    };

    const handleUpdateNewProject = (project) => {
        updateNewProject(project);
    };

    return (
        <div className="page">
            <div className="top-section-wrapper">
                <HeaderComponent />
                <section className="top-section">
                    {canAnimateTitle && (
                        <h1>
                            {topSectionTitles.map((title, index) => (
                                <span className="top-section-span-animate-wrapper" key={index}>
                                    <span className="top-section-span" style={{ animationDuration: `${(index * 0.3) + 0.6}s` }}>{title}</span>
                                </span>
                            ))}
                        </h1>
                    )}
                </section>
            </div>

            <div className="works">
                {renderProjects()}

                {isAuth &&
                        <AddProjectComponent newProject={newProject} updateNewProject={handleUpdateNewProject} />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuth: state.isAuth,
        newProject: state.newProject,
        projects: state.projects,
    };
};

const mapDispatchToProps = {
    updateNewProject,
    fetchProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
