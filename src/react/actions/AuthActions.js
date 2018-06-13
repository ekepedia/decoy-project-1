import dispatcher from "../dispatcher";

export function submitLoginCredentials({email, password}) {

    if (!email || !password)
        return;

    dispatcher.dispatch({
        type: "SUBMIT_LOGIN_CREDENTIALS",
        email,
        password
    });
}

export function submitSignUpCredentials({name, email, password}) {

    if (!name || !email || !password)
        return;

    dispatcher.dispatch({
        type: "SUBMIT_SIGN_UP_CREDENTIALS",
        name,
        email,
        password
    });
}

export function logout() {

    dispatcher.dispatch({
        type: "LOGOUT",
    });
}