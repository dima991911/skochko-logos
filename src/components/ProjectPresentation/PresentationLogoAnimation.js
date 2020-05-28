import React from "react";

export default function PresentationLogoAnimation({ project, activeSample }) {
    // TODO: create animation(horizontal carousel when change current logo and presentation photos for logo)
    return (
        <div
            className="samples-wrapper"
        >
            {
                project.samplesProject.map((sample, index) => {
                    const zIndex = index === activeSample ? 2 : 1;

                    return (
                        <div
                            className="samples-item"
                            style={{ backgroundImage: `url(${sample.sampleSrc})`, zIndex: zIndex }}
                            key={index}
                        />
                    )
                })
            }
        </div>
    )
}
