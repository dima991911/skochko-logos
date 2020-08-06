import React, { useEffect } from "react";
import { Provider } from 'react-redux';
import { ParallaxProvider } from 'react-scroll-parallax';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import "./App.css";

import store from "./store";

import { SmoothScroll } from "./helpers/helpers";
import ScrollToTopComponent from "./compnents/ScrollToTopComponent/ScrollToTopComponent";
import PrivateRoute from "./compnents/PrivateRouteComponent/PrivateRouteComponent";

import HomePage from "./pages/HomePage/HomePage";
import ProjectItemPage from "./pages/ProjectItemPage/ProjectItemPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateProjectPresentationPage from "./pages/CreateProjectPresentationPage/CreateProjectPresentationPage";

function App() {
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0 ,0);
        };

        const initPage = () => {
            window.SmoothScroll = new SmoothScroll(document,110,16);
        };

        window.addEventListener('beforeunload', scrollToTop);
        window.addEventListener('load', initPage);

        return () => {
            window.removeEventListener('beforeunload', scrollToTop);
            window.removeEventListener('load', initPage);
        }
    }, []);

    return (
        <Provider store={store}>
            <ParallaxProvider>
                <Router>
                    <ScrollToTopComponent />

                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/projects/:id" component={ProjectItemPage} />
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/project/create">
                            <CreateProjectPresentationPage />
                        </PrivateRoute>
                    </Switch>
                </Router>
            </ParallaxProvider>
        </Provider>
    );
}

export default App;
