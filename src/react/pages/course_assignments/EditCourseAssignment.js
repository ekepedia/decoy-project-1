import React       from "react";

import { Link, Redirect }     from 'react-router-dom';
import queryString from "query-string";

import CourseAssignmentsFields from "../../components/courses_assignments/CourseAssignmentsFields";

import * as CourseAssignmentActions from "../../actions/CourseAssignmentActions";

import CourseAssignmentStore from "../../stores/CourseAssignmentStore";

export default class EditCourseAssignment extends React.Component {

    constructor(props) {
        super(props);

        const {location}            = queryString.parse(this.props.location.search);
        const { match: { params } } = this.props;
        const course_assignment_id  = params.id;

        this.state = {
            course_assignment_id,
            course_assignment: CourseAssignmentStore.getCourseAssignmentsById(course_assignment_id) || {}
        };

        this.editCourseAssignmentSuccess = this.editCourseAssignmentSuccess.bind(this);
        this.editCourseAssignmentError   = this.editCourseAssignmentError.bind(this);
        this.loadCourseAssignment        = this.loadCourseAssignment.bind(this);
        this.handleSave                  = this.handleSave.bind(this);
    }

    componentWillMount() {
        CourseAssignmentStore.on("edit course assignment success", this.editCourseAssignmentSuccess);
        CourseAssignmentStore.on("edit course assignment error", this.editCourseAssignmentError);
        CourseAssignmentStore.on("courses assignments loaded", this.loadCourseAssignment);
    }

    componentWillUnmount() {
        CourseAssignmentStore.removeListener("edit course assignment success", this.editCourseAssignmentSuccess);
        CourseAssignmentStore.removeListener("edit course assignment error", this.editCourseAssignmentError);
        CourseAssignmentStore.removeListener("courses assignments loaded", this.loadCourseAssignment);
    }

    loadCourseAssignment() {
        this.setState({
            course_assignment: CourseAssignmentStore.getCourseAssignmentsById(this.state.course_assignment_id)
        });
    }

    editCourseAssignmentSuccess() {
        this.setState({
            editCourseAssignmentSuccess: true
        });
    }

    editCourseAssignmentError() {
        this.setState({
            editCourseAssignmentError: true
        });
    }

    handleSave(course_assignment) {
        console.log("Ready to Edit Course");
        console.log(course_assignment);
        course_assignment.course_assignment_id = this.state.course_assignment_id;
        CourseAssignmentActions.editCourseAssignment(course_assignment);
    }

    render() {

        const {course_id, faculty_id, year, term, team_lead} = this.state.course_assignment;

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Link to={`/courses/assignments`}>
                                <button className="btn">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-xs-12">
                            <h1 className="edit-course-title">Edit Course</h1>
                        </div>
                        {this.state && this.state.editCourseAssignmentError &&
                            <div className="col col-xs-12">
                                <p>Duplicate Course Assignment!</p>
                            </div>
                        }
                        <div className="col col-xs-12">
                            <CourseAssignmentsFields
                                course_id={course_id}
                                faculty_id={faculty_id}
                                year={year}
                                term={term}
                                team_lead={team_lead}
                                handleSave={this.handleSave}
                            />
                        </div>
                        {this.state && this.state.editCourseAssignmentSuccess &&
                            <Redirect to={`/courses/assignments`}/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

