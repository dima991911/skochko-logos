import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import './ProjectItemPage.css';

import { project } from '../../images/works/beerd-project';

export default function ProjectItemPage() {

    const renderImages = () => {
        const { images } = project;

        return images.map((img, index) => (
                <div className="project-item-image" key={index}>
                    <ScrollAnimation animateIn="fadeIn" duration={0.3} animateOnce={true}>
                        <img src={img} alt="Presentation" />
                    </ScrollAnimation>
                </div>
        ))
    };

    return (
        <div className="project-container" style={{ backgroundColor: project.backgroundColor }}>
            <div className="top-section-avatar" style={{ backgroundImage: `url('${project.previewImg}')` }} />

            <div className="project-info">
                <h1 className="project-info-name">{project.name}</h1>
                <h2 className="project-info-slogan">{project.slogan}</h2>
                <p className="project-info-description">{project.description}</p>
                <a className="project-info-website-link" href={project.websiteLink}>Visit Website</a>
            </div>

            {renderImages()}

            <div className="project-feedback-container">
                <div className="project-feedback-wrapper">
                    <div className="project-feedback-quote">“</div>

                    <h2 className="project-feedback-title">Client feedback</h2>
                    <p className="project-feedback">Great Work and good communication. Also great Service.</p>
                    <p className="project-feedback-author">Adam Smith</p>
                </div>
            </div>

            <div className="project-item-image">
                <img src={project.lastImg} alt="Presentation" />
            </div>
        </div>
    )
}
