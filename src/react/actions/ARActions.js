import dispatcher from "../dispatcher";

export function submitFormReponse({form_id, question_id, parent_id, response}) {

    if (!form_id || !question_id || !response)
        return;

    dispatcher.dispatch({
        type: "SUBMIT_FORM_RESPONSE",
        form_id,
        question_id,
        parent_id,
        response
    });
}

export function editFormReponse({response_id, response}) {

    if (!response_id || !response)
        return;

    dispatcher.dispatch({
        type: "EDIT_FORM_RESPONSE",
        response_id,
        response
    });
}