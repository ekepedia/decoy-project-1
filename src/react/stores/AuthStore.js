import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";
import axios            from "axios";
import store from "store";

class AuthStore extends EventEmitter {

    constructor() {
        super();

        this.user  = store.get("user");
        this.token = store.get("token");
    }

    loadLocations() {
        axios.get("/api/locations").then((data) => {
            this.locations = data.data;
            this.emit("locations loaded");
        });
    }

    attemptLogin({email, password}) {

        if (!email || !password)
            return;

        console.log("LOGIN: Attempting login",email, password);

        axios.post(`/api/auth/login`, {
            email,
            password
        }).then((data) => {

            if (!data || !data.data)
                return this.emit("login error");

            console.log("LOGIN: login success status", data.data.success);

            if (data.data.success){
                const {user, token} = data.data.data;

                this.user  = user;
                this.token = token;

                store.set('user',  user);
                store.set('token', token);

                return this.emit("login success");
            }

            return this.emit("login failure");
        });
    }

    attemptSignUp({name, email, password}) {

        if (!name || !email || !password)
            return;

        console.log("SIGN UP: Attempting sign up",name, email, password);

        axios.post(`/api/auth/sign-up`, {
            name,
            email,
            password
        }).then((data) => {

            if (!data || !data.data)
                return this.emit("sign up error");

            console.log("SIGN UP: sign up success status", data.data.success);

            if (data.data.success){
                return this.emit("sign up success");
            }

            return this.emit("sign up failure");
        });
    }

    logout() {
        this.token = null;
        store.set("token", null);

        this.emit("logout");
    }

    getUser() {
        return this.user;
    }

    getToken() {
        return this.token;
    }

    handleActions(action) {
        switch(action.type) {
            case "SUBMIT_LOGIN_CREDENTIALS": {
                this.attemptLogin(action);
                break;
            }
            case "SUBMIT_SIGN_UP_CREDENTIALS": {
                this.attemptSignUp(action);
                break;
            }
            case "LOGOUT": {
                this.logout(action);
                break;
            }
        }
    }

}

const authStore = new AuthStore();
dispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;