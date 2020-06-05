import React, { Component } from "react";

import "./LeftToolbar.css";
import ProjectItem from "./ProjectItem";

import plusIcon from "../../images/icons/white-plus.png";
import ProjectMode from "../../enums/ProjectMode";
import ProjectToAdd from "./ProjectToAdd";

class LeftToolbar extends Component {

    renderSliderNavigation = () => {
        const { currentLogoIndex, logos } = this.props;

        return logos.map((logo, index) => {
            const classes = index === currentLogoIndex ? 'slider-navigation-item slider-navigation-item-active' : 'slider-navigation-item';
            return (
                <div
                    key={index}
                    className="slider-navigation-item-wrapper"
                    onClick={() => this.changeCurrentPreviewLogo(index)}
                >
                    <div className={classes} />
                </div>
            )
        });
    };

    changeCurrentPreviewLogo = (index) => {
        const { setPreviewLogo } = this.props;
        setPreviewLogo(index);
    };

    render() {
        const { currentLogoIndex, logos, changeAddPreviewLogo } = this.props;
        const marginTop = currentLogoIndex * window.innerHeight;

        /*TODO: Done animation*/
        return (
            <div className="projects-wrapper">
                <div className="projects" style={{ transform: `translateY(${-marginTop}px)` }}>
                    {
                        logos.map((logo, index) => {
                            return logo.mode === ProjectMode.ProjectToAdd ?
                                <ProjectToAdd
                                    key={index}
                                    changeAddPreviewLogo={changeAddPreviewLogo}
                                    index={index}
                                    logo={logo}
                                /> :
                                <ProjectItem
                                    key={index}
                                    index={index}
                                    logo={logo}
                                />
                        })
                    }
                </div>

                <div className="slider-navigation-container">
                    {this.renderSliderNavigation()}

                    <div className="contact-button">
                        Contact
                    </div>
                </div>

                <div className="more-projects">
                    <img src={plusIcon} alt="More projects"/>
                    <span>MORE PROJECTS</span>
                </div>
            </div>
        )
    }
}

export default LeftToolbar;
