import { createStore } from "redux";
import { UserService } from "../services/UserService";

import { newProjectReducer, userReducer, projectReducer } from "./reducers";

import { newProjectInit } from "../helpers/helpers";

const isUserAuth = UserService.checkToken();

const defaultState = {
    isAuth: isUserAuth,
    projects: [],
    newProject: { ...newProjectInit },
};

function reducers(state = defaultState, action) {
    return {
        newProject: newProjectReducer(state.newProject, action),
        isAuth: userReducer(state.isAuth, action),
        projects: projectReducer(state.projects, action),
    }
}

const store = createStore(reducers);

export default store;
