import { LogosPreviewActionTypes } from "./actions";

export function logosPreviewReducer(state, action) {
    switch (action.type) {
        case LogosPreviewActionTypes.CHANGE_PREVIEW_LOGO:
            return { ...state, currentLogoIndex: action.index };
        case LogosPreviewActionTypes.ADD_LOGO_PREVIEW:
            const logosWithNewLogo = [ ...state.logos, action.logo];
            return { logos: logosWithNewLogo, currentLogoIndex: logosWithNewLogo.length - 1 };
        case LogosPreviewActionTypes.CHANGE_ADD_PREVIEW_LOGO:
            const newLogosArr = [...state.logos];
            newLogosArr[state.currentLogoIndex] = action.logo;
            return { ...state, logos: newLogosArr };
        default:
            return state;
    }
}
