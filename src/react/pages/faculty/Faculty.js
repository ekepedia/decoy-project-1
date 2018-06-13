import React        from "react";
import FacultyStore from "../../stores/FacultyStore";
import queryString  from "query-string";

import { Link }    from 'react-router-dom';

export default class Faculty extends React.Component {

    constructor(props) {
        super(props);

        const {location} = queryString.parse(this.props.location.search);
        const { match: { params } } = this.props;
        const faculty_id = params.id;

        this.state = {faculty_id};

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
            faculty: FacultyStore.getFacultyOne(this.state.faculty_id)
        });
    }

    render() {

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col col-xs-12">
                            <Link to="/faculty">
                                <button className="btn" style={{marginBottom: "60px"}}>
                                    Back To All Faculty
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12">
                            <Link to={`/faculty/${this.state.faculty_id}/edit`}>
                                <button className="edit-faculty btn">
                                    Edit Faculty
                                </button>
                            </Link>
                            <div className="faculty-name">
                                {this.state.faculty && this.state.faculty.name}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-7">
                            <div className="page-heading">
                                Documents
                            </div>
                            <div className="page-content">
                                { "No documents uploaded" }
                            </div>

                            <div className="page-heading">
                                Annual Reviews
                            </div>
                            <div className="page-content">
                                { "No annual reviews completed" }
                            </div>
                        </div>
                        <div className="col col-xs-5">
                            <div className="page-heading">
                                Kerberos
                            </div>
                            <div className="page-content">
                                { (this.state.faculty && this.state.faculty.kerberos) }
                            </div>

                            <div className="page-heading">
                                Campus Address
                            </div>
                            <div className="page-content">
                                { (this.state.faculty && this.state.faculty.campus_address) || "No campus address" }
                            </div>

                            <div className="page-heading">
                                Campus Phone
                            </div>
                            <div className="page-content">
                                { (this.state.faculty && this.state.faculty.campus_phone) || "No campus phone"}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

