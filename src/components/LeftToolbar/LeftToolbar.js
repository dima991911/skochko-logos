import React, { Component } from "react";
import { connect } from "react-redux";

import { setPreviewLogo } from "../../store/actions";
import "./LeftToolbar.css";
import logos from "./Logos";

class LeftToolbar extends Component {

    state = {
        active: 0,
    };

    componentDidMount() {
        this.animationInterval = setInterval(() => {
            const { active } = this.state;
            if (active === logos.length - 1) {
                clearInterval(this.animationInterval);
            } else {
                this.setState({ active: active + 1 });
            }
        }, 2700);
    }

    componentWillUnmount() {
        clearInterval(this.animationInterval);
    }

    render() {
        console.log(this.props);
        const { active } = this.state;
        const marginTop = active * window.innerHeight;

        return (
            <div className="projects" style={{ marginTop: -marginTop }}>
                {
                    logos.map((logo, index) => {
                        let classes = 'project-item-logo';
                        if (index < active) classes += ' project-item-logo-after';
                        else if (index > active) classes += ' project-item-logo-before';

                        return (
                            <div className="project-item"
                                 style={{ background: logo.bgColor }}
                                 key={index}
                            >
                                <div className={classes}>
                                    <img src={logo.logoSrc} alt="Photo" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        previewLogos: state.previewLogos,
    };
};

const mapDispatchToProps = {
    setPreviewLogo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftToolbar);
