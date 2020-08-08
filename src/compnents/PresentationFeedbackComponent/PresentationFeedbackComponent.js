import React from 'react';
import './PresentationFeedbackComponent.css';

import EditableComponent from "../EditableComponent/EditableComponent";

export default function PresentationFeedbackComponent({ project, updateProject, isPreview }) {

    const { feedback, clientName } = project;

    const handleChangeFeedback = (feedback) => {
        const updatedProject = { ...project, feedback };
        updateProject(updatedProject);
    };

    const handleChangeClientName = (clientName) => {
        const updatedProject = { ...project, clientName };
        updateProject(updatedProject);
    };

    return (
        <div className="project-feedback-container">
            <div className="project-feedback-wrapper">
                <div className="project-feedback-quote">“</div>

                <h2 className="project-feedback-title">Client feedback</h2>

                <div className="project-feedback-info-wrapper">
                    <EditableComponent
                        value={feedback}
                        saveValue={handleChangeFeedback}
                        isPreview={isPreview}
                    >
                        <p className="project-feedback">{feedback || 'Client feedback'}</p>
                    </EditableComponent>

                    <EditableComponent
                        value={clientName}
                        saveValue={handleChangeClientName}
                        isPreview={isPreview}
                    >
                        <p className="project-feedback-author">{clientName || 'Client Name'}</p>
                    </EditableComponent>
                </div>
            </div>
        </div>
    )
};
