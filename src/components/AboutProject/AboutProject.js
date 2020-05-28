import React, { Component } from "react";
import { connect } from "react-redux";
import "./AboutProject.css";

import plusIcon from "../../images/icons/black-plus.png";

class AboutProject extends Component {
    render() {
        const { isAuthenticated, previewLogo } = this.props;

        return (
            <div
                className="about-wrapper"
                style={{ color: previewLogo.rightTopSectionFontColor, background: previewLogo.rightTopSectionBg }}
            >
                {
                    isAuthenticated && (
                        <div className="add-project" title="Add project"><img src={plusIcon} alt="Add Project"/></div>
                    )
                }

                <section className="logo-info-container">
                    <h2 className="logo-info-item logo-name">{previewLogo.name}</h2>
                    <p className="logo-info-item logo-description">{previewLogo.description}</p>
                    <a href="#" className="logo-info-item logo-website" style={{ color: 'white' }}>https://baardstyleshop.nl</a>
                </section>
                <footer className="logo-created">
                    Logo design, {previewLogo.logoCreatedAt}
                </footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const previewLogo = state.previewLogos.logos[state.previewLogos.currentLogoIndex];
    return {
        previewLogo,
    };
};

export default connect(mapStateToProps, null)(AboutProject);
