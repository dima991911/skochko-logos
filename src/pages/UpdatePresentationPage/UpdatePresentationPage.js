import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import { ProjectService } from "../../services/ProjectService";
import { updateProjectForUpdate, setSpinnerLoading } from "../../store/actions";

import SectionImageComponent from "../../compnents/SectionImageComponent/SectionImageComponent";
import ProjectInfoComponent from "../../compnents/ProjectInfoComponent/ProjectInfoComponent";
import PresentationImageListComponent
    from "../../compnents/PresentationImageListComponent/PresentationImageListComponent";
import PresentationFeedbackComponent from "../../compnents/PresentationFeedbackComponent/PresentationFeedbackComponent";
import PanelControlComponent from "../../compnents/PanelControlComponent/PanelControlComponent";

function UpdatePresentationPage({ project, history, updateProjectForUpdate, setSpinnerLoading }) {
    const [imgForDelete, setImgForDelete] = useState([]);
    const [isPreview, setPreview] = useState(false);

    useEffect(() => {
        if (!project) {
            history.push('/');
        }
    }, [project, history]);

    const handleUpdateProjectInfo = (updatedProject) => {
        updateProjectForUpdate(updatedProject);
    };

    const handleChangeTopSectionImage = (topSectionImg) => {
        const updatedProject = { ...project, topSectionImg };
        updateProjectForUpdate(updatedProject);
    };

    const handleChangeBottomSectionImg = (bottomSectionImg) => {
        const updatedProject = { ...project, bottomSectionImg };
        updateProjectForUpdate(updatedProject);
    };

    const handleRemoveImage = (i) => {
        const img = project.images[i];
        if (img._id) {
            const newImgForDelete = [...imgForDelete, img._id];
            setImgForDelete(newImgForDelete);
        }

        const updatedImages = [...project.images];
        updatedImages.splice(i, 1);
        updateProjectForUpdate({ ...project, images: updatedImages });
    };

    const handleAddImage = (img) => {
        const updatedImages = [...project.images, img];
        updateProjectForUpdate({ ...project, images: updatedImages });
    };

    const handleTogglePreview = () => {
        setPreview(!isPreview);
    };

    const handleChangeTextColor = (textColor) => {
        updateProjectForUpdate({ ...project, textColor });
    };

    const handleChangeBackgroundColor = (backgroundColor) => {
        updateProjectForUpdate({ ...project, backgroundColor });
    };

    const handleUpdatePresentation = () => {
        const fd = generateFormData();

        setSpinnerLoading(true);
        ProjectService.updateProject(fd, project._id)
            .then(() => {
                history.push('/');
            })
            .catch(err => {
                alert(err);
            })
            .finally(() => {
                setSpinnerLoading(false);
            });
    };

    const generateFormData = () => {
        const fd = new FormData();

        for (const key in project) {
            if (key !== 'images' && project[key]) {
                fd.append(key, project[key]);
            }
        }

        project.images.forEach(img => {
            if (!img._id) {
                fd.append('images', img);
            }
        });

        fd.append('deleteImages', imgForDelete);

        return fd;
    };

    return (
        <>
            {
                project &&
                    <div className="page-container" style={{ backgroundColor: project.backgroundColor, color: project.textColor }}>
                        <SectionImageComponent
                            image={project.topSectionImg}
                            changeImage={handleChangeTopSectionImage}
                        />

                        <ProjectInfoComponent
                            project={project}
                            updateProject={handleUpdateProjectInfo}
                        />

                        <PresentationImageListComponent
                            images={project.images}
                            removeImage={handleRemoveImage}
                            addImage={handleAddImage}
                            isPreview={isPreview}
                        />

                        {
                            (isPreview && project.feedback) || !isPreview ?
                                <PresentationFeedbackComponent
                                    project={project}
                                    updateProject={handleUpdateProjectInfo}
                                    isPreview={isPreview}
                                /> : null
                        }

                        {
                            (isPreview && project.bottomSectionImg) || !isPreview ?
                                <SectionImageComponent
                                    notFullHeight
                                    image={project.bottomSectionImg}
                                    changeImage={handleChangeBottomSectionImg}
                                    isPreview={isPreview}
                                /> : null
                        }

                        <PanelControlComponent
                            textColor={project.textColor}
                            backgroundColor={project.backgroundColor}
                            changeTextColor={handleChangeTextColor}
                            changeBackgroundColor={handleChangeBackgroundColor}
                            toggleIsPreview={handleTogglePreview}
                            savePresentation={handleUpdatePresentation}
                            isPreview={isPreview}
                        />
                    </div>
            }
        </>
    )
}

const stateToProps = (state) => {
    return {
        project: state.editProject,
    }
};

const mapDispatchToProps = {
    updateProjectForUpdate,
    setSpinnerLoading,
}

export default connect(stateToProps, mapDispatchToProps)(UpdatePresentationPage);
