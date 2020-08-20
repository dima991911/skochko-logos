import { createStore } from "redux";
import { UserService } from "../services/UserService";

import { newProjectReducer, userReducer, projectReducer, editProjectReducer, spinnerReducer } from "./reducers";

import { newProjectInit } from "../helpers/helpers";

const isUserAuth = UserService.checkToken();

const defaultState = {
    isAuth: isUserAuth,
    projects: [],
    newProject: { ...newProjectInit },
    editProject: null,
    isLoading: false,
};

function reducers(state = defaultState, action) {
    return {
        newProject: newProjectReducer(state.newProject, action),
        isAuth: userReducer(state.isAuth, action),
        projects: projectReducer(state.projects, action),
        editProject: editProjectReducer(state.editProject, action),
        isLoading: spinnerReducer(state.isLoading, action),
    }
}

const store = createStore(reducers);

export default store;
