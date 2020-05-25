import {LogosPreviewActionTypes} from "./actions";

export { LogosPreviewActionTypes } from './actions';

export function logosPreviewReducer(state, action) {
    switch (action.type) {
        case LogosPreviewActionTypes.CHANGE_PREVIEW_LOGO:
            return { ...state, currentLogoIndex: action.index };
        default:
            return state;
    }
};
