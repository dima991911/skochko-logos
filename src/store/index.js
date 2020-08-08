import { createStore } from "redux";
import { UserService } from "../services/UserService";

import { newProjectReducer, userReducer } from "./reducers";

const isUserAuth = UserService.checkToken();

const defaultState = {
    isAuth: isUserAuth,
    projects: [],
    newProject: {
        preview: null,
        topSectionImg: null,
        name: null,
        slogan: null,
        description: null,
        websiteLink: null,
        images: [],
        feedback: null,
        clientName: null,
        bottomSectionImg: null,
    },
};

function reducers(state = defaultState, action) {
    return {
        newProject: newProjectReducer(state.newProject, action),
        isAuth: userReducer(state.isAuth, action),
    }
}

const store = createStore(reducers);

export default store;
