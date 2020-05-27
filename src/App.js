import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Portfolio from "./pages/Portfolio/Portfolio";
import Login from "./pages/Login/Login";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <Portfolio />
                </Route>
                <Route path="/login" >
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
