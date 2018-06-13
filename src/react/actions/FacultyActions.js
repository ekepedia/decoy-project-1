import dispatcher from "../dispatcher";
import axios from "axios";

export function reloadFaculty() {

    dispatcher.dispatch({
        type: "FETCH_FACULTY"});

    axios.get('/api/faculty')
        .then(function (response) {

            console.log(response);

            dispatcher.dispatch({
                type: "LOADED_FACULTY",
                faculty: response.data.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function newFaculty({name, campus_address, campus_phone, kerberos, mit_id}) {

    dispatcher.dispatch({
        type: "POSTING_FACULTY"});

    axios.post('/api/faculty', {name, campus_address, campus_phone, kerberos, mit_id})
        .then(function (response) {
            console.log(response);
            reloadFaculty();

            dispatcher.dispatch({
                type: "NEW_FACULTY_SUCCESS"
            });

        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "NEW_FACULTY_ERROR"
            });
        });
}

export function editFaculty({faculty_id, name, campus_address, campus_phone, kerberos, mit_id}) {

    dispatcher.dispatch({
        type: "PATCHING_FACULTY"
    });

    axios.patch('/api/faculty', {faculty_id, name, campus_address, campus_phone, kerberos, mit_id})
        .then(function (response) {
            console.log(response);
            reloadFaculty();

            dispatcher.dispatch({
                type: "EDIT_FACULTY_SUCCESS"
            });
        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "EDIT_FACULTY_ERROR"
            });
        });
}