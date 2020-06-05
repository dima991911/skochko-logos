import React, { Component } from "react";
import { connect } from "react-redux";
import "./Portfolio.css";

import LeftToolbar from "../../components/LeftToolbar/LeftToolbar";
import ProjectPresentation from "../../components/ProjectPresentation/ProjectPresentation";
import AboutProjectContainer from "../../components/AboutProject/AboutProjectContainer";
import { setPreviewLogo, addPreviewLogo, changeAddPreviewLogo } from "../../store/actions";

import UserService from "../../services/user.service";
import {LogoPreview} from "../../helpers/defaultData";
import ProjectMode from "../../enums/ProjectMode";

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.isAuthenticated = UserService.getToken() != null;
    }

    state = {
        currentLogoIndex: 0,
    };

    setPreviewLogo = (index) => {
        this.setState({ currentLogoIndex: index });
    };

    handleAddPreviewLogo = () => {
        const { addPreviewLogo } = this.props;
        const { logos } = this.props.previewLogos;
        const newLogoPreview = new LogoPreview(ProjectMode.ProjectToAdd);

        addPreviewLogo(newLogoPreview);
        this.setState({ currentLogoIndex: logos.length });
    };

    handleChangeAddPreviewLogo = (changedLogo) => {
        const { changeAddPreviewLogo } = this.props;
        changeAddPreviewLogo(changedLogo);
    };

    render() {
        const { currentLogoIndex } = this.state;
        const { logos } = this.props.previewLogos;
        const currentLogo = logos[currentLogoIndex];

        return (
            <div className="page">
                <div className="left-container">
                    <LeftToolbar
                        logos={logos}
                        currentLogoIndex={currentLogoIndex}
                        setPreviewLogo={this.setPreviewLogo}
                        changeAddPreviewLogo={this.handleChangeAddPreviewLogo}
                        isAuthenticated={this.isAuthenticated}
                    />
                </div>

                <div className="right-container">
                    <div className="about-container">
                        <AboutProjectContainer
                            logo={currentLogo}
                            addPreviewLogo={this.handleAddPreviewLogo}
                            changeAddPreviewLogo={this.handleChangeAddPreviewLogo}
                            isAuthenticated={this.isAuthenticated}
                        />
                    </div>
                    <div className="logos-container">
                        <ProjectPresentation
                            isAuthenticated={this.isAuthenticated}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        previewLogos: state.previewLogos,
    };
};

const mapDispatchToProps = {
    setPreviewLogo,
    addPreviewLogo,
    changeAddPreviewLogo
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
