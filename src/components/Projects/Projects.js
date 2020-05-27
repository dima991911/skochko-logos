import React, { Component } from 'react';
import "./Projects.css";

class Projects extends Component {
    render() {
        const arr = new Array(10).fill(true, 0);

        return (
            <div className="container">
                {
                    arr.map((item, index) => {
                        return (
                            <div className="projects-item" key={index}></div>
                        );
                    })
                }
            </div>
        )
    }
}

export default Projects;