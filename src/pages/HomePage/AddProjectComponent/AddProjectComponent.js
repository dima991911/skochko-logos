import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import "./AddProjectComponent.css";

import { commonIcons } from "../../../images/icons";
import { toBase64 } from "../../../helpers/helpers";
import ProjectActionsComponent from "../ProjectActionsComponent/ProjectActionsComponent";
import ParallaxPreviewComponent from "../../../compnents/ParallaxPreviewComponent/ParallaxPreviewComponent";

function AddProjectComponent({ newProject, updateNewProject, history }) {
    const [previewImg, setPreviewImg] = useState(null);
    const inputEl = useRef(null);
    const { preview } = newProject;

    useEffect(() => {
        if (preview) {
            toBase64(preview).then(resPreview => {
                setPreviewImg(resPreview);
            });
        }
    }, [preview]);

    const choosePreviewPhoto = () => {
        inputEl.current.click();
    };

    const changePreviewImage = (e) => {
        const newProjectUpdated = { ...newProject, preview: e.target.files[0] };
        updateNewProject(newProjectUpdated);
        inputEl.current.value = '';
    };

    const navigateToCreatePresentationPage = () => {
        history.push('/project/create');
    };

    const actions = [
        { name: 'Edit Preview', onClick: choosePreviewPhoto },
        { name: 'Presentations', onClick: navigateToCreatePresentationPage },
    ];

    const renderChooseProjectContainer = () => {
        return (
            <div className="add-project" onClick={choosePreviewPhoto}>
                <img
                    src={commonIcons.plus}
                    alt="Plus icon"
                    className="add-project-plus-icon"
                />
            </div>
        )
    };

    const renderPreviewImg = () => {
        return (
            <div className="preview-img-wrapper">
                <div className="preview-img-actions-container">
                    <ProjectActionsComponent actions={actions} />
                </div>
                <ParallaxPreviewComponent imgUrl={previewImg} />
            </div>
        )
    };

    return (
        <div className="column">
            {!previewImg ? renderChooseProjectContainer() : renderPreviewImg()}

            <input
                type="file"
                ref={inputEl}
                className="input-file"
                onChange={changePreviewImage}
            />
        </div>
    )
}

export default withRouter(AddProjectComponent);
