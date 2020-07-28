import React, { Component } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./AboutProjectContainer.css";

import AboutProjectInfo from "./AboutProjectInfo";
import AboutProjectAddInfo from "./AboutProjectAddInfo";

import plusIcon from "../../images/icons/black-plus.png";
import ProjectMode from "../../enums/ProjectMode";

class AboutProjectContainer extends Component {

    handleChangeLogoInfo = (changedLogoInfo) => {
        const { changeAddPreviewLogo } = this.props;
        changeAddPreviewLogo(changedLogoInfo);
    };

    render() {
        const { addPreviewLogo, isAuthenticated, logo, currentLogoIndex } = this.props;
        const isProjectToAdd = logo.mode === ProjectMode.ProjectToAdd;

        return (
            <div
                className="about-wrapper"
                style={{ color: logo.rightTopSectionFontColor, background: logo.rightTopSectionBg }}
            >
                {
                    isAuthenticated && (
                        <div
                            className="add-project"
                            title="Add project"
                            onClick={addPreviewLogo}
                        >
                            <img src={plusIcon} alt="Add Project"/>
                        </div>
                    )
                }

                <SwitchTransition
                    mode="out-in"
                >
                    <CSSTransition
                        timeout={300}
                        key={currentLogoIndex}
                        className="info-wrapper"
                    >
                        <div>
                            {
                                isProjectToAdd ?
                                    <AboutProjectAddInfo logo={logo} onChangeLogoInfo={this.handleChangeLogoInfo} /> :
                                    <AboutProjectInfo logo={logo} />
                            }
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        )
    }
}

export default AboutProjectContainer;
