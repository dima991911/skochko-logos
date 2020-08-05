import { createStore } from "redux";

import { newProjectReducer } from "./reducers";

const defaultState = {
    projects: [],
    newProject: {

    },
};

function reducers(state = defaultState, action) {
    return {
        newProject: newProjectReducer(state.newProject, action),
    }
}

const store = createStore(reducers);

export default store;
