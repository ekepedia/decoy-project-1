import React       from "react";
import FacultyStore   from "../../stores/FacultyStore";

import { Link }    from 'react-router-dom';

export default class Faculties extends React.Component {

    constructor(props) {
        super(props);

        this.loadFaculty = this.loadFaculty.bind(this);
    }

    componentWillMount() {
        this.loadFaculty();
        FacultyStore.on("faculty loaded", this.loadFaculty);
    }

    componentWillUnmount() {
        FacultyStore.removeListener("faculty loaded", this.loadFaculty);
    }

    loadFaculty() {
        this.setState({
            faculty: FacultyStore.getFaculty()
        });
    }

    render() {

        const sorted_faculty =  this.state.faculty && this.state.faculty.sort(function (a,b) {
                return a["name"] > b["name"];
            });

        const faculty = sorted_faculty && sorted_faculty.map((faculty) => {
                return (
                    <div className="course-link col col-xs-6">
                        <Link key={faculty.faculty_id} to={`/faculty/${faculty.faculty_id}`}>
                            <span className="course-link-name">{faculty.name}</span>
                        </Link>
                    </div>
                );
            }
        );

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div style={{marginBottom: "50px"}} className="col-xs-12">
                            <Link to="/faculty/new">
                                <button className="btn">
                                    New Faculty
                                </button>
                            </Link>
                        </div>
                        <div className="col col-xs-12">
                            <div className="row">
                                <div className="col col-xs-12">
                                    <h1 className="courses-title">All Faculty</h1>
                                </div>
                            </div>
                            <div className="row">
                                {faculty}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

