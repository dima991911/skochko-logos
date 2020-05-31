export const LogosPreviewActionTypes = {
    CHANGE_PREVIEW_LOGO: 'CHANGE_PREVIEW_LOGO',
    ADD_LOGO_PREVIEW: 'ADD_LOGO_PREVIEW',
    CHANGE_ADD_PREVIEW_LOGO: 'CHANGE_ADD_PREVIEW_LOGO',
};

export function setPreviewLogo(index) {
    return { type: LogosPreviewActionTypes.CHANGE_PREVIEW_LOGO, index };
}

export function addPreviewLogo(logo) {
    return { type: LogosPreviewActionTypes.ADD_LOGO_PREVIEW, logo };
}

export function changeAddPreviewLogo(logo) {
    return { type: LogosPreviewActionTypes.CHANGE_ADD_PREVIEW_LOGO, logo };
}
