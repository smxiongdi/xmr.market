import { normalize } from "normalizr";
// import APIs
import { siteVerifyInfoAPI, logoutUserAPI, userSessionAPI, loginUserAPI, registerUserAPI, confirmAccountAPI } from "../.././api/api";
// import reducers

export const siteVerify = (recaptcha) => (dispatch) => {

    dispatch({ type: "NETWORK_REQUEST", isFetching: true });

    return siteVerifyInfoAPI(recaptcha).then(
        response => {
            dispatch({
                type: "SITEVERIFY_SUCCESS",
                isFetching: false,
                message: response.message,
                error: response.error,
                recap: response.recap,
            });
        },
        error => {
            dispatch({
                type: "SITEVERIFY_FAILURE",
                isFetching: false,
                message: "Recaptcha API failed",
                recap: 0,
            });
        }
    );
}

export const logoutUser = () => (dispatch) => {

    dispatch({ type: "NETWORK_REQUEST", isFetching: true });

    return logoutUserAPI().then(
        response => {
            dispatch({
                type: "LOGOUT_USER_SUCCESS",
                isFetching: false,
                message: response.message,
            });
        },
        error => {
            /*
            dispatch({
                type: "USER_LOGOUT_FAILURE",
                isFetching: false,
                message: "No logged-in user.",
            });
            */
        }
    );
};

export const userSession = () => (dispatch) => {

    dispatch({ type: "NETWORK_REQUEST", isFetching: true });

    return userSessionAPI().then(
        response => {
            dispatch({
                type: "USER_SESSION_SUCCESS",
                isFetching: false,
                message: response.message,
                theme: response.theme || "Dark",
                uname: response.uname,
            });
        },
        error => {
            dispatch({
                type: "USER_SESSION_FAILURE",
                isFetching: false,
                message: "No logged-in user.",
                theme: response.theme || "Dark",
            });
        }
    );
};

export const loginUser = (userObject) => (dispatch) => {

    dispatch({ type: "NETWORK_REQUEST", isFetching: true });

    return loginUserAPI(userObject).then(
        response => {
            dispatch({
                type: "LOGIN_USER_SUCCESS",
                isFetching: false,
                uname: response.uname,
                message: response.message || "Successfully logged in"
            });
        },
        error => {
            dispatch({
                type: "LOGIN_USER_FAILURE",
                isFetching: false,
                message: "User credentials incorrect",
            });
        }
    );
};

export const registerUser = (userObject) => (dispatch) => {
    dispatch({ type: "NETWORK_REQUEST", isFetching: true });

    // perform API call
    registerUserAPI(userObject).then(
        response => {
            dispatch({
                type: "REGISTER_USER_SUCCESS",
                error: response.error,
                message: response.message
            });
        },
        error => {
            dispatch({
                type: "REGISTER_USER_FAILURE",
                isFetching: false,
                error: response.error,
                message: response.message || "Registration failure"
            });
        }
    );
}

export const confirmAccount = (confUrl) => (dispatch) => {

    dispatch({ type: "NETWORK_REQUEST", isFetching: true });

    return confirmAccountAPI(confUrl).then(
        response => {
            dispatch({
                type: "CONFIRM_ACCOUNT_SUCCESS",
                isFetching: false,
                message: "Account validated. You may now use your credentials to log in."
            });
        },
        error => {
            dispatch({
                type: "CONFIRM_ACCOUNT_FAILURE",
                isFetching: false,
                title: "404",
                message: "Confirmation link incorrect, or account has already been validated. Try logging in if you have already registered."
            });
        }
    );
};
