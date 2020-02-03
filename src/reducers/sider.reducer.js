import { TOGGLE_SIDER_COLLAPSE } from "../actions/type";

const initialState = {
    collapsed: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDER_COLLAPSE:
            return { ...state, collapsed: !state.collapsed };
        default:
            return state;
    };
};