import { NewProjectType } from "./actions";

export function newProjectReducer(state, action) {
    switch (action.type) {
        case NewProjectType.UPDATE_NEW_PROJECT:
            return { ...state, ...action.project };
        default:
            return state;
    }
}
