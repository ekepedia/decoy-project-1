import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";
import axios            from "axios";
import store            from "store";
import AuthStore        from "./AuthStore";


class ARStore extends EventEmitter {

    constructor() {
        super();
    }

    loadFormResponses() {

        const user = AuthStore.getUser();

        if(!user)
            return;

        const {user_id} = user;

        axios.get(`/api/ar/${user_id}`).then((data) => {
            this.form_responses = data.data;
            this.emit("form responses loaded");
        });
    }

    submitFormResponse({ form_id, question_id, parent_id, response }) {

        if (!form_id || !question_id || !response)
            return;

        const user = AuthStore.getUser();

        if (!user)
            return;

        const { user_id } = user;

        console.log("AR: Attempting form response", question_id, response);

        axios.post(`/api/ar}`, {
            user_id,
            form_id,
            question_id,
            parent_id,
            response
        }).then((data) => {

            if (!data || !data.data)
                return this.emit("ar error");

            console.log("AR: form submission status", data.data.success);

            if (data.data.success){

            }
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

    getFormResponse() {
        return this.token;
    }

    handleActions(action) {
        switch(action.type) {
            case "COURSES": {
                this.submitFormReponse(action);
                break;
            }
            case "EDIT_FORM_RESPONSE": {
                this.attemptSignUp(action);
                break;
            }
        }
    }

}

const aRStore = new ARStore();
dispatcher.register(aRStore.handleActions.bind(aRStore));

export default aRStore;