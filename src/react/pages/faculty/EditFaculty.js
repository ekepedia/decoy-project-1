import React       from "react";

import { Link, Redirect }     from 'react-router-dom';
import queryString from "query-string";

import FacultyFields from "../../components/faculty/FacultyFields";

import * as FacultyActions from "../../actions/FacultyActions";

import FacultyStore from "../../stores/FacultyStore";

export default class EditFaculty extends React.Component {

    constructor(props) {
        super(props);

        const {location}            = queryString.parse(this.props.location.search);
        const { match: { params } } = this.props;
        const faculty_id            = params.id;

        this.state = {
            faculty_id,
            faculty: FacultyStore.getFacultyOne(faculty_id) || {}
        };

        this.editFacultySuccess = this.editFacultySuccess.bind(this);
        this.editFacultyError   = this.editFacultyError.bind(this);
        this.loadFaculty        = this.loadFaculty.bind(this);
        this.handleSave        = this.handleSave.bind(this);

    }

    componentWillMount() {
        FacultyStore.on("edit faculty success", this.editFacultySuccess);
        FacultyStore.on("edit faculty error", this.editFacultyError);
        FacultyStore.on("faculty loaded", this.loadFaculty);
    }

    componentWillUnmount() {
        FacultyStore.removeListener("edit faculty success", this.editFacultySuccess);
        FacultyStore.removeListener("edit faculty error", this.editFacultyError);
        FacultyStore.removeListener("faculty loaded", this.loadFaculty);
    }

    loadFaculty() {
        this.setState({
            faculty: FacultyStore.getFacultyOne(this.state.faculty_id)
        });
    }

    editFacultySuccess() {
        this.setState({
            editFacultySuccess: true
        });
    }

    editFacultyError() {
        this.setState({
            editFacultyError: true
        });
    }

    handleSave(faculty) {
        console.log("Ready to Edit Faculty");
        console.log(faculty);
        faculty.faculty_id = this.state.faculty_id;
        FacultyActions.editFaculty(faculty);
    }

    render() {

        const {name, campus_address, campus_phone, kerberos, mit_id} = this.state.faculty;

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Link to={`/faculty/${this.state.faculty_id}`}>
                                <button className="btn">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-xs-12">
                            <h1 className="edit-course-title">Edit Faculty</h1>
                        </div>
                        {this.state && this.state.editFacultyError &&
                            <div className="col col-xs-12">
                                <p>There was an error creating this faculty. Make sure you aren't creating 2 faculty with the same faculty kerberos!</p>
                            </div>
                        }
                        <div className="col col-xs-12">
                            <FacultyFields
                                name={name}
                                campus_address={campus_address}
                                campus_phone={campus_phone}
                                kerberos={kerberos}
                                mit_id={mit_id}
                                handleSave={this.handleSave}
                            />
                        </div>
                        {this.state && this.state.editFacultySuccess &&
                            <Redirect to={`/faculty/${this.state.faculty_id}`}/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

