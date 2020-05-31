import React from "react";

export default function ProjectItem({ logo }) {
    return (
        <div
            className="project-item"
            style={{ background: `url(${logo.logoSrc})` }}
        />
    )
}
