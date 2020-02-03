import { authTypes } from "./type";

const {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_OUT_SUCCESS
} = authTypes;

const signIn = (auth) => {

    // 登入成功
    if (auth.username === "aceradmin" && auth.password === "aceradmin") {
        return {
            type: SIGN_IN_SUCCESS,
            payload: auth
        };
    };

    // 登入失敗
    return {
        type: SIGN_IN_FAILURE
    };
};

const signOut = () => {

    localStorage.removeItem("auth");

    return {
        type: SIGN_OUT_SUCCESS
    };
};

export const authActions = {
    signIn,
    signOut
};