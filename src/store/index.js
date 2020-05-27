import { createStore } from "redux";
import { logosPreviewReducer } from "./reducers";

import logos from "../components/LeftToolbar/Logos";

const initialState = {
    previewLogos: {
        logos,
        currentLogoIndex: 0,
    }
};

function reducers(state = initialState, action) {
    return {
        previewLogos: logosPreviewReducer(state.previewLogos, action),
    };
}

const store = createStore(reducers);

export default store;
