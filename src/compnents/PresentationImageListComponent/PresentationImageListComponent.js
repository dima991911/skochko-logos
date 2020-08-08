import React, { useRef } from 'react';
import './PresentationImageListComponent.css';
import ScrollAnimation from "react-animate-on-scroll";

import { commonIcons } from "../../images/icons";
import PresentationImageItem from "./PresentationImageItem/PresentationImageItem";

export default function PresentationImageListComponent({ images, addImage, removeImage }) {
    const inputEl = useRef(null);

    const chooseImage = () => {
        const { current } = inputEl;
        current.click();
    };

    const addImageToPresentation = (e) => {
        addImage(e.target.files[0]);
    };

    const removeImageFromPresentation = (i) => {
        const newImages = [...images];
        newImages.splice(i, 1);
        removeImage(newImages);
    };

    const renderImages = () => {
        return images.map((img, index) => (
            <div className="project-item-image" key={index}>

                <ScrollAnimation animateIn="fadeIn" duration={0.3}>
                    <>
                        <div className="actions-container" onClick={() => removeImageFromPresentation(index)}>
                            <img src={commonIcons.remove} alt="Edit" />
                        </div>
                        <PresentationImageItem img={img} />
                    </>
                </ScrollAnimation>
            </div>
        ))
    };

    return (
        <div className="presentation-images-container">
            {renderImages()}

            <div className="presentation-images-add">
                <img src={commonIcons.plus} alt="plus" onClick={chooseImage} />
                <input type="file" ref={inputEl} onChange={addImageToPresentation} />
            </div>
        </div>
    )
}
