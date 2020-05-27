export const LogosPreviewActionTypes = {
    CHANGE_PREVIEW_LOGO: 'CHANGE_PREVIEW_LOGO',
};

export function setPreviewLogo(index) {
    return { type: LogosPreviewActionTypes.CHANGE_PREVIEW_LOGO, index };
};
