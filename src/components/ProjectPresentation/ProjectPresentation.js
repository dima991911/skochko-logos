import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProjectPresentation.css";
import PresentationLogoAnimation from "./PresentationLogoAnimation";

import leftArrow from "../../images/slider-icons/left-arrow.svg";
import rightArrow from "../../images/slider-icons/right-arrow.svg";

class ProjectPresentation extends Component {

    state = {
        activeSample: 0,
    };

    componentDidUpdate(prevProps) {
        const { currentLogoIndex: previewCurrentLogosIndex } = prevProps.previewLogos;
        const { currentLogoIndex } = this.props.previewLogos;
        if (previewCurrentLogosIndex !== currentLogoIndex) this.setState({ activeSample: 0 });
    }

    renderProjectSamples = () => {
        const { activeSample } = this.state;
        const { logos, currentLogoIndex } = this.props.previewLogos;

        const transformY = currentLogoIndex * 100;

        return (
            <div className="samples" style={{ transform: `translateY(${-transformY}%)` }}>
                {
                    logos.map((project, index) => (
                        <PresentationLogoAnimation
                            project={project}
                            key={index}
                            index={index}
                            activeSample={activeSample}
                            currentLogoIndex={currentLogoIndex}
                        />
                    ))
                }
            </div>
        );
    };

    changeSlide = (nextSlide) => {
        const { currentLogoIndex, logos } = this.props.previewLogos;
        const { samplesProject } = logos[currentLogoIndex];

        if (nextSlide < 0) {
            this.setState({ activeSample: samplesProject.length - 1 });
        } else if (nextSlide === samplesProject.length) {
            this.setState({ activeSample: 0 });
        } else {
            this.setState({ activeSample: nextSlide });
        }
    };

    render() {
        const { activeSample } = this.state;

        return (
            <div className="samples-container">
                <div className="navigation-arrow left-navigation-arrow" onClick={() => this.changeSlide(activeSample - 1)}><img src={leftArrow} alt="Left arrow"/></div>
                <div className="navigation-arrow right-navigation-arrow" onClick={() => this.changeSlide(activeSample + 1)}><img src={rightArrow} alt="Right arrow"/></div>

                {this.renderProjectSamples()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        previewLogos: state.previewLogos,
    };
};

export default connect(mapStateToProps, null)(ProjectPresentation);
