import React, { Component } from "react";
import { connect } from "react-redux";

import "./LeftToolbar.css";
import ProjectItem from "./ProjectItem";

import { setPreviewLogo } from "../../store/actions";
import plusIcon from "../../images/icons/white-plus.png";
import ProjectMode from "../../enums/ProjectMode";
import ProjectToAdd from "./ProjectToAdd";

class LeftToolbar extends Component {

    renderSliderNavigation = () => {
        const { currentLogoIndex, logos } = this.props.previewLogos;

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
        const { currentLogoIndex, logos } = this.props.previewLogos;
        const marginTop = currentLogoIndex * window.innerHeight;

        /*TODO: Done animation*/
        return (
            <div className="projects-wrapper">
                <div className="projects" style={{ transform: `translateY(${-marginTop}px)` }}>
                    {
                        logos.map((logo, index) => {
                            // return (
                            //     <div
                            //         className="project-item"
                            //         style={{ background: `url(${logo.logoSrc})` }}
                            //         key={index}
                            //     />
                            // )
                            return logo.mode === ProjectMode.ProjectToAdd ?
                                <ProjectToAdd
                                    key={index}
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

const mapStateToProps = (state) => {
    return {
        previewLogos: state.previewLogos,
    };
};

const mapDispatchToProps = {
    setPreviewLogo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftToolbar);
