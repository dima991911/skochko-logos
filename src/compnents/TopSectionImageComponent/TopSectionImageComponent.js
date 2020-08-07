import React, { useEffect, useRef, useState } from 'react';
import './TopSectionImageComponent.css';

import { toBase64 } from "../../helpers/helpers";
import { commonIcons } from "../../images/icons";

export default function TopSectionImageComponent({ image, changeImage }) {
    const [imgInBase64, setImgInBase64] = useState(null);
    const inputEl = useRef(null);

    useEffect(() => {
        if (image) {
            toBase64(image).then(res => {
                setImgInBase64(res);
            });
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
        return (
            <div className="top-section-avatar" style={{ backgroundImage: `url('${imgInBase64}')` }}>
                <div className="actions-container" onClick={chooseTopSectionImg}>
                    <img src={commonIcons.edit} alt="Edit" />
                </div>
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
