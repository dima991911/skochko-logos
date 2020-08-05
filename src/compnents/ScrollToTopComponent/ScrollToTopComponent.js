import { useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

function ScrollToTopComponent() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (window.SmoothScroll) window.SmoothScroll.setScrollPos(0);
    }, [pathname]);

    return null;
}

export default withRouter(ScrollToTopComponent);
