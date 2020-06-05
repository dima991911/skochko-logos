import React, { Component } from "react";
import { SketchPicker } from "react-color";
import "./AboutProjectContainer.css";

class AboutProjectAddInfo extends Component {

    state = {
        displayBgColorPicker: false,
        displayTextColorPicker: false,
    };

    handleChangeLogoTitle = (e) => {
        const { onChangeLogoInfo, logo } = this.props;
        const newLogoInfo = { ...logo, name: e.target.value };

        onChangeLogoInfo(newLogoInfo);
    };

    handleChangeLogoDescription = (e) => {
        const { onChangeLogoInfo, logo } = this.props;
        const newLogoInfo = { ...logo, description: e.target.value };

        onChangeLogoInfo(newLogoInfo);
    };

    handleChangeLogoWebsite = (e) => {
        const { onChangeLogoInfo, logo } = this.props;
        const newLogoInfo = { ...logo, webSite: e.target.value };

        onChangeLogoInfo(newLogoInfo);
    };

    handleChoiceBgColor = () => {
        this.setState({ displayBgColorPicker: !this.state.displayBgColorPicker });
    };

    handleChangeLogoCreatedAt = (e) => {
        const { onChangeLogoInfo, logo } = this.props;
        const newLogoInfo = { ...logo, logoCreatedAt: e.target.value };

        onChangeLogoInfo(newLogoInfo);
    };

    handleChangeBgColorComplete = (color) => {
        const { onChangeLogoInfo, logo } = this.props;
        const newLogoInfo = { ...logo, rightTopSectionBg: color.hex };

        onChangeLogoInfo(newLogoInfo);
    };

    handleChoiceTextColor = () => {
        this.setState({ displayTextColorPicker: !this.state.displayTextColorPicker });
    };

    handleChangeTextColorComplete = (color) => {
        const { onChangeLogoInfo, logo } = this.props;
        const newLogoInfo = { ...logo, rightTopSectionFontColor: color.hex };

        onChangeLogoInfo(newLogoInfo);
    };

    render() {
        const { displayBgColorPicker, displayTextColorPicker } = this.state;
        const { logo } = this.props;

        return (
            <>
                <section className="logo-info-container">
                    <input
                        value={logo.name}
                        type="text"
                        className="logo-info-input"
                        placeholder="Title"
                        style={{ color: logo.rightTopSectionFontColor, fontSize: '22px' }}
                        onChange={this.handleChangeLogoTitle}
                    />
                    <textarea
                        value={logo.description}
                        className="logo-info-input"
                        placeholder="Description"
                        style={{ color: logo.rightTopSectionFontColor, fontSize: '14px' }}
                        onChange={this.handleChangeLogoDescription}
                    />
                    <input
                        value={logo.webSite}
                        type="text"
                        className="logo-info-input"
                        placeholder="Website"
                        style={{ color: logo.rightTopSectionFontColor, fontSize: '14px' }}
                        onChange={this.handleChangeLogoWebsite}
                    />
                </section>
                <footer className="logo-created">
                    Logo design,
                    <input
                        value={logo.logoCreatedAt}
                        type="text"
                        className="logo-info-input"
                        placeholder="Logo created"
                        style={{ color: logo.rightTopSectionFontColor, fontSize: '14px' }}
                        onChange={this.handleChangeLogoCreatedAt}
                    />
                </footer>
                <div className="color-picker-container">
                    <div className="bg-color-picker">
                        <div style={{ backgroundColor: logo.rightTopSectionBg, height: '100%' }} onClick={this.handleChoiceBgColor} />
                        {
                            displayBgColorPicker && (
                                <div className="sketch-picker-container">
                                    <SketchPicker
                                        color={logo.rightTopSectionBg}
                                        onChangeComplete={this.handleChangeBgColorComplete}
                                    />
                                </div>
                            )
                        }
                    </div>

                    <div className="bg-color-picker">
                        <div style={{ backgroundColor: logo.rightTopSectionFontColor, height: '100%' }} onClick={this.handleChoiceTextColor} />
                        {
                            displayTextColorPicker && (
                                <div className="sketch-picker-container">
                                    <SketchPicker
                                        color={logo.rightTopSectionFontColor}
                                        onChangeComplete={this.handleChangeTextColorComplete}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default AboutProjectAddInfo;
