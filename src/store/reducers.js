import { NewProjectType, UserType } from "./actions";

export function newProjectReducer(state, action) {
    switch (action.type) {
        case NewProjectType.UPDATE_NEW_PROJECT:
            return { ...state, ...action.project };
        default:
            return state;
    }
}

export function userReducer(state, action) {
    switch (action.type) {
        case UserType.UPDATE_USER_AUTH:
            return action.isAuth;
        default:
            return state;
    }
}
