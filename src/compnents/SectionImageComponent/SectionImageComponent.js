import React, { useEffect, useRef, useState } from 'react';
import './SectionImageComponent.css';

import { toBase64 } from "../../helpers/helpers";
import { commonIcons } from "../../images/icons";

export default function SectionImageComponent({ image, changeImage, notFullHeight, isPreview }) {
    const [imgInBase64, setImgInBase64] = useState(null);
    const inputEl = useRef(null);

    useEffect(() => {
        if (image && image instanceof Blob) {
            toBase64(image).then(res => {
                setImgInBase64(res);
            });
        } else if (typeof image === 'string') {
            setImgInBase64(image);
        }
    }, [image]);

    const chooseTopSectionImg = () => {
        const { current } = inputEl;
        current.click();
    };

    const handleChangeTopSectionImg = (e) => {
        changeImage(e.target.files[0]);
    };

    const renderChooseTopSectionImg = () => {
        return (
            <div className="top-section-choose-image">
                <img src={commonIcons.plus} alt="Choose" onClick={chooseTopSectionImg} />
            </div>
        );
    };

    const renderTopSectionImg = () => {
        const classes = notFullHeight ? "image-wrapper" : "image-wrapper top-section-avatar";
        return (
            <div className={classes} style={{ backgroundImage: notFullHeight ? '' : `url('${imgInBase64}')` }}>

                {
                    !isPreview &&
                        <div className="actions-container" onClick={chooseTopSectionImg}>
                            <div className="actions-container-item">
                                <img src={commonIcons.edit} alt="Edit" />
                            </div>
                        </div>
                }

                {notFullHeight && <img src={imgInBase64} alt="presentation" />}
            </div>
        );
    };

    return (
        <>
            <input
                ref={inputEl}
                type="file"
                className="input-file"
                onChange={handleChangeTopSectionImg}
            />
            {!imgInBase64 ? renderChooseTopSectionImg() : renderTopSectionImg()}
        </>
    )
}
