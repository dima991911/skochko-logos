import React, { Component } from "react";
import "./AboutProject.css";

import plusIcon from "../../images/icons/black-plus.png";

class AboutProject extends Component {
    render() {
        const { isAuthenticated } = this.props;

        return (
            <div className="about-wrapper" style={{ color: 'white' }}>
                {
                    isAuthenticated && (
                        <div className="add-project" title="Add project"><img src={plusIcon} alt="Add Project"/></div>
                    )
                }

                <section className="logo-info-container">
                    <h2 className="logo-info-item logo-name">BEARD STYLE</h2>
                    <p className="logo-info-item logo-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad asperiores commodi consequuntur deleniti, eveniet ex fugiat molestias optio quaerat similique temporibus ullam ut voluptatum.</p>
                    <a href="#" className="logo-info-item logo-website" style={{ color: 'white' }}>https://baardstyleshop.nl</a>
                </section>
                <footer className="logo-created">
                    Logo design, 2015
                </footer>
            </div>
        )
    }
}

export default AboutProject;
