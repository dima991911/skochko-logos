import React, { Component } from "react";
import { connect } from "react-redux";

import { changeAddPreviewLogo } from "../../store/actions";
import { fileToBase64 } from "../../helpers/helpers";

class ProjectToAdd extends Component {

    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
    }

    state = {
        bgImage: '',
    };

    componentDidUpdate(prevProps) {
        const { logo } = this.props;
        if (logo.logoSrc) {
            fileToBase64(logo.logoSrc).then(bgImage => this.setState({ bgImage }))
        }
    }

    openFileInput = () => {
        this.inputRef.current.click();
    };

    handleChangeInputFile = (e) => {
        const { changeAddPreviewLogo, logo } = this.props;
        const changedLogo = { ...logo, logoSrc: e.target.files[0] };

        changeAddPreviewLogo(changedLogo);
    };

    render() {
        const { bgImage } = this.state;
        const { logo } = this.props;

        return (
            <div
                className="project-item project-item-preview"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div
                    className="project-item-preview-input-ui"
                    onClick={this.openFileInput}
                >
                    {logo.logoSrc ? 'Change bg' : 'Load bg'}
                </div>
                <input
                    ref={this.inputRef}
                    className="project-item-preview-input"
                    type="file"
                    onChange={this.handleChangeInputFile}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    changeAddPreviewLogo,
};

export default connect(null, mapDispatchToProps)(ProjectToAdd);
