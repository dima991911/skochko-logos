import React from "react";
import { ParallaxProvider } from 'react-scroll-parallax';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import ProjectItemPage from "./pages/ProjectItemPage/ProjectItemPage";

function App() {
    return (
        <ParallaxProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/projects/:id" component={ProjectItemPage} />
                </Switch>
            </Router>
        </ParallaxProvider>
    );
}

export default App;
