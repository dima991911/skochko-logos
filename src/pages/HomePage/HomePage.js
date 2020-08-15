import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./HomePage.css";

import AddProjectComponent from "./AddProjectComponent/AddProjectComponent";
import { ProjectService } from "../../services/ProjectService";

import { updateNewProject, fetchProjects, deleteProject, updateProject } from "../../store/actions";
import HeaderComponent from "../../compnents/HeaderComponent/HeaderComponent";
import ProjectItemComponent from "./ProjectItemComponent/ProjectItemComponent";

const topSectionTitles = [
    'Welcome to my',
    'Portfolio',
];

function HomePage({ isAuth, projects, newProject, updateNewProject, fetchProjects, deleteProject, updateProject }) {
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
        return projects.map((project, index) => (
            <ProjectItemComponent
                work={project}
                isFirstProject={index === 0}
                isLastProject={index === projects.length - 1}
                slug={project.slug}
                key={project._id}
                isAuth={isAuth}
                removeProject={() => handleRemoveProject(project._id)}
                changeOrder={(isToTop) => handleChangeOrder(isToTop, project._id)}
                changePreview={(preview) => handleChangePreview(preview, project._id)}
            />
        ))
    };

    const handleChangePreview = (preview, projectId) => {
        const fd = new FormData();
        fd.append('preview', preview);

        ProjectService.changePreview(fd, projectId)
            .then(res => {
                updateProject({ id: projectId, project: res.project });
            })
            .catch(err => {
                alert(err);
            })
    };

    const handleChangeOrder = (isToTop, projectId) => {
        ProjectService.changeOrder(isToTop, projectId)
            .then(async () => {
                const res = await ProjectService.fetchProjects();
                fetchProjects(res.projects);
            })
            .catch(err => {
                alert(err);
            });
    };

    const handleRemoveProject = (id) => {
        ProjectService.removeProject(id)
            .then(res => {
                deleteProject(res.id);
            })
            .catch(() => {
                alert('Something went wrong, try again');
            });
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

                {
                    isAuth &&
                        <AddProjectComponent newProject={newProject} updateNewProject={handleUpdateNewProject} />
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth,
        newProject: state.newProject,
        projects: state.projects,
    };
};

const mapDispatchToProps = {
    updateNewProject,
    fetchProjects,
    deleteProject,
    updateProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
