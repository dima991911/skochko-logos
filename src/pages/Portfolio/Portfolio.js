import React, { Component } from "react";
import "./Portfolio.css";

import LeftToolbar from "../../components/LeftToolbar/LeftToolbar";
import ProjectPresentation from "../../components/ProjectPresentation/ProjectPresentation";

class Portfolio extends Component {

    state = {
        active: 0,
    };

    render() {
        return (
            <div className="page">
                <div className="left-container">
                    <LeftToolbar />
                </div>

                <div className="right-container">
                    <div className="about-container">

                    </div>
                    <div className="logos-container">
                        <ProjectPresentation />
                    </div>
                </div>
            </div>
        );
    }
}

export default Portfolio;
