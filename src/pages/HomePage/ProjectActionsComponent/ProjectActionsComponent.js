import React from 'react';
import './ProjectActionsComponent.css';

export default function ProjectActionsComponent({ actions }) {
    return (
        <div className="preview-actions-container">
            {actions.map((action, index) => (
                <div key={index} className="preview-action" onClick={action.onClick}>{action.name}</div>
            ))}
        </div>
    )
}
