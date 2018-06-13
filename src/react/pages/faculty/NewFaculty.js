import React       from "react";

import { Link, Redirect }     from 'react-router-dom';

import FacultyFields from "../../components/faculty/FacultyFields";

import * as FacultyActions from "../../actions/FacultyActions";

import FacultyStore from "../../stores/FacultyStore";

export default class NewFaculty extends React.Component {

    constructor(props) {
        super(props);

        this.newFacultySuccess = this.newFacultySuccess.bind(this);
        this.newFacultyError = this.newFacultyError.bind(this);

    }

    componentWillMount() {
        FacultyStore.on("new faculty success", this.newFacultySuccess);
        FacultyStore.on("new faculty error", this.newFacultyError);

    }

    componentWillUnmount() {
        FacultyStore.removeListener("new faculty success", this.newFacultySuccess);
        FacultyStore.removeListener("new faculty error", this.newFacultyError);
    }

    newFacultySuccess() {
        this.setState({
            newFacultySuccess: true
        })
    }

    newFacultyError() {
        this.setState({
            newFacultyError: true
        })
    }

    handleSave(faculty) {
        FacultyActions.newFaculty(faculty);
    }

    render() {
        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Link to="/faculty">
                                <button className="btn">
                                    Cancel
                                </button>
                            </Link>
                        </div>

                        <br/>
                        <br/>
                        <div className="col-xs-12">
                            <h1 className="new-course-title">New Faculty</h1>
                        </div>

                        {this.state && this.state.newFacultyError &&
                            <div className="col col-xs-12">
                                <p>There was an error creating this faculty. Make sure you aren't creating 2 faculty with the same kerberos</p>
                            </div>
                        }
                        <div className="col col-xs-12">
                            <FacultyFields handleSave={this.handleSave}/>
                        </div>
                        {this.state && this.state.newFacultySuccess &&
                            <Redirect to="/faculty"/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

