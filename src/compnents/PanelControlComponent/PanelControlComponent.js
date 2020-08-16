import React from 'react';
import './PanelControlComponent.css';
import ColorPickerComponent from "../ColorPickerComponent/ColorPickerComponent";

export default function PanelControlComponent({ textColor, backgroundColor, isPreview, toggleIsPreview,
                                                  savePresentation, changeBackgroundColor, changeTextColor }) {
    return (
        <div className="panel-control">
            <div className="panel-control-show-icon" />

            <div className="panel-control-color-container">
                <div className="panel-control-color-item">
                    <ColorPickerComponent
                        title="Background"
                        color={backgroundColor}
                        onChangeColor={changeBackgroundColor}
                    />
                </div>
                <div className="panel-control-color-item">
                    <ColorPickerComponent
                        title="Text color"
                        color={textColor}
                        onChangeColor={changeTextColor}
                    />
                </div>
            </div>

            <div className="save-button-container">
                <button className="save-button" onClick={savePresentation}>SAVE</button>
            </div>

            <div className="preview-container">
                Show Preview
                <input type="checkbox" value={isPreview} onClick={toggleIsPreview} />
            </div>
        </div>
    )
}
