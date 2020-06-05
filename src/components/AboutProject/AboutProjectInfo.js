import React, { Component } from "react";
import "./AboutProjectContainer.css";

class AboutProjectInfo extends Component {

    render() {
        const { logo } = this.props;

        return (
            <>
                <section className="logo-info-container">
                    <h2 className="logo-info-item logo-name">{logo.name}</h2>
                    <p className="logo-info-item logo-description">{logo.description}</p>
                    <a href="#" className="logo-info-item logo-website" style={{ color: 'white' }}>https://baardstyleshop.nl</a>
                </section>
                <footer className="logo-created">
                    Logo design, {logo.logoCreatedAt}
                </footer>
            </>
        )
    }
}

export default AboutProjectInfo;
