import React, { useRef } from 'react';
import './PresentationImageListComponent.css';
import ScrollAnimation from "react-animate-on-scroll";

import { commonIcons } from "../../images/icons";
import PresentationImageItem from "./PresentationImageItem/PresentationImageItem";

export default function PresentationImageListComponent({ images, addImage, removeImage, isPreview }) {
    const inputEl = useRef(null);

    const chooseImage = () => {
        const { current } = inputEl;
        current.click();
    };

    const addImageToPresentation = (e) => {
        addImage(e.target.files[0]);
    };

    const removeImageFromPresentation = (i) => {
        removeImage(i);
    };

    const renderImages = () => {
        return images.map((img, index) => {
            const imageUrl = img instanceof Blob ? img : img.url;
            return (
                <div className="project-item-image" key={index}>

                    <ScrollAnimation animateIn="fadeIn" duration={0.3}>
                        <>
                            {
                                !isPreview &&
                                <div className="action-remove-container" onClick={() => removeImageFromPresentation(index)}>
                                    <img src={commonIcons.remove} alt="Delete" />
                                </div>
                            }

                            <PresentationImageItem img={imageUrl} />
                        </>
                    </ScrollAnimation>
                </div>
            )
        })
    };

    return (
        <div className="presentation-images-container">
            {renderImages()}

            {
                !isPreview &&
                    <div className="presentation-images-add">
                        <img src={commonIcons.plus} alt="plus" onClick={chooseImage} />
                        <input type="file" ref={inputEl} onChange={addImageToPresentation} />
                    </div>
            }
        </div>
    )
}
