import { authTypes } from "../actions/type";

const {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT_SUCCESS
} = authTypes;

const auth = JSON.parse(localStorage.getItem("auth"));

const initialState = auth
    ? { auth, isSignedIn: true }
    : {};

export default (state = initialState, action) => {
    switch (action.type) {

        case SIGN_IN_SUCCESS:
            return { ...state, isSignedIn: true, signInFailure: false, auth: action.payload };
        case SIGN_IN_FAILURE:
            return { ...state, isSignedIn:false, signInFailure: true };

        case SIGN_OUT_SUCCESS:
            return { ...state, isSignedIn: false, auth: {} };

        default:
            return state;
    };
};