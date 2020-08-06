import React, { useEffect, useState, useRef } from "react";
import "./AddProjectComponent.css";

import { commonIcons } from "../../../images/icons";
import { toBase64 } from "../../../helpers/helpers";
import ParallaxPreviewComponent from "../../../compnents/ParallaxPreviewComponent/ParallaxPreviewComponent";

export default function AddProjectComponent({ newProject, updateNewProject }) {
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

    const renderChooseProjectContainer = () => {
        return (
            <div className="add-project" onClick={choosePreviewPhoto}>
                <img
                    src={commonIcons.plus}
                    alt="Plus icon"
                    className="add-project-plus-icon"
                />
                <input
                    type="file"
                    ref={inputEl}
                    className="input-file"
                    onChange={changePreviewImage}
                />
            </div>
        )
    };

    const renderPreviewImg = () => {
        return (
            <div className="preview-img-wrapper">
                <ParallaxPreviewComponent imgUrl={previewImg} />
            </div>
        )
    };

    return (
        <div className="column">
            {!previewImg ? renderChooseProjectContainer() : renderPreviewImg()}
        </div>
    )
}
