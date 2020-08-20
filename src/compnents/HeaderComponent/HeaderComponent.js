import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import classes from 'classnames';
import './HeaderComponent.css';
import 'animate.css/animate.css';

import logo from "../../images/logo.png";
import { commonIcons } from "../../images/icons";

function HeaderComponent({ isBackBtn, onClickBackBtn, history }) {
    const [showHeader, setShowHeader] = useState(1);
    const [showBackBtn, setShowBackBtn] = useState(false);

    useEffect(() => {
        const initScroll = () => {
            const width = window.innerWidth;
            const scrollY = window.scrollY;

            if (!isBackBtn) {
                if (width < 1300 && scrollY > 50) {
                    setShowHeader(0);
                } else {
                    setShowHeader(1);
                }
            } else {
                if (scrollY > window.innerHeight / 2) {
                    setShowBackBtn(true);
                }
            }
        };

        window.addEventListener('scroll', initScroll);

        return () => {
            window.removeEventListener('scroll', initScroll);
        }
    }, [isBackBtn]);

    const navigateToHome = () => {
        if (onClickBackBtn) {
            onClickBackBtn();
        } else {
            history.push('/');
        }
    };

    return (
        <header className="header" style={{ opacity: showHeader }}>

            <div
                className={classes('back-btn', { 'animate__fadeInLeft': showBackBtn })}
                style={{ opacity: showBackBtn ? 1 : 0 }}
                onClick={navigateToHome}
            >
                <img src={commonIcons.leftChevron} alt="Back" />
            </div>

            <div
                className={classes('header-logo', { 'animate__fadeOutRight': showBackBtn })}
                style={{ opacity: showBackBtn ? 0 : 1 }}
                onClick={navigateToHome}
            >
                <img src={logo} alt="Logo" />
            </div>

            <div className="header-links">
                <a
                    className="header-link-item"
                    href="https://dribbble.com/skochko_design"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <img src={commonIcons.dribble} alt="dribble" />
                </a>
                <a
                    className="header-link-item"
                    href="mailto:info@skochko.net"
                    title="info@skochko.net"
                >
                    <img src={commonIcons.email} alt="email" />
                </a>
            </div>
        </header>
    )
}

export default withRouter(HeaderComponent);
