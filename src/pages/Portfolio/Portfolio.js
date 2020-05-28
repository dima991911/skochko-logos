import React, { Component } from "react";
import "./Portfolio.css";

import LeftToolbar from "../../components/LeftToolbar/LeftToolbar";
import ProjectPresentation from "../../components/ProjectPresentation/ProjectPresentation";
import AboutProject from "../../components/AboutProject/AboutProject";

import UserService from "../../services/user.service";

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.isAuthenticated = UserService.getToken() != null;
    }

    state = {
        active: 0,
    };

    render() {
        return (
            <div className="page">
                <div className="left-container">
                    <LeftToolbar
                        isAuthenticated={this.isAuthenticated}
                    />
                </div>

                <div className="right-container">
                    <div className="about-container">
                        <AboutProject
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

export default Portfolio;
