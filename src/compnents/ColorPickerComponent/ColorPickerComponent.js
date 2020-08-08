import React, {useState} from 'react';
import './ColorPickerComponent.css';
import { BlockPicker } from 'react-color';

export default function ColorPickerComponent({ title, color, onChangeColor }) {
    const [isOpenColorPicker, setIsOpenColorPicker] = useState(false);

    const togglePicker = (isShow) => {
        setIsOpenColorPicker(isShow);
    };

    const handleChangeColor = (color) => {
        onChangeColor(color.hex);
    };

    return (
        <div className="color-wrapper">
            <span className="color-title">{title}</span>
            <div
                className="color-block"
                style={{ backgroundColor: color }}
                onMouseEnter={() => togglePicker(true)}
                onMouseLeave={() => togglePicker(false)}
            >
                {
                    isOpenColorPicker &&
                    <div className="color-picker-wrapper">
                        <BlockPicker
                            triangle="hide"
                            color={color}
                            onChangeComplete={handleChangeColor}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
