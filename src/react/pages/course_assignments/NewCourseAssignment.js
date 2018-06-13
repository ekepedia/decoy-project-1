import React              from "react";
import { Link, Redirect } from 'react-router-dom';

import CourseAssignmentsFields      from "../../components/courses_assignments/CourseAssignmentsFields";
import * as CourseAssignmentActions from "../../actions/CourseAssignmentActions";
import CourseAssignmentStore        from "../../stores/CourseAssignmentStore";

export default class NewCourse extends React.Component {

    constructor(props) {
        super(props);

        this.newCourseAssignmentSuccess = this.newCourseAssignmentSuccess.bind(this);
        this.newCourseAssignmentError   = this.newCourseAssignmentError.bind(this);
    }

    componentWillMount() {
        CourseAssignmentStore.on("new course assignment success", this.newCourseAssignmentSuccess);
        CourseAssignmentStore.on("new course assignment error", this.newCourseAssignmentError);

    }

    componentWillUnmount() {
        CourseAssignmentStore.removeListener("new course assignment success", this.newCourseAssignmentSuccess);
        CourseAssignmentStore.removeListener("new course assignment error", this.newCourseAssignmentError);
    }

    newCourseAssignmentSuccess() {
        this.setState({
            newCourseAssignmentSuccess: true
        })
    }

    newCourseAssignmentError() {
        this.setState({
            newCourseAssignmentError: true
        })
    }

    handleSave(course) {
        console.log("Ready to Post New Course");
        console.log(course);
        CourseAssignmentActions.newCourseAssignment(course);
    }

    render() {
        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Link to="/courses/assignments">
                                <button className="btn">
                                    Cancel
                                </button>
                            </Link>
                        </div>

                        <br/>
                        <br/>
                        <div className="col-xs-12">
                            <h1 className="new-course-title">New Course Assignment</h1>
                            <p>If there is a faculty or course you can't find in the list, you can add it in the course or faculty pages.</p>
                        </div>
                        {this.state && this.state.newCourseAssignmentError &&
                            <div className="col col-xs-12">
                                <p>Duplicate Course Assignment!</p>
                            </div>
                        }
                        <div className="col col-xs-12">
                            <CourseAssignmentsFields
                                course_id="1"
                                faculty_id="1"
                                year="2018"
                                term="S"
                                handleSave={this.handleSave}
                            />
                        </div>
                        {this.state && this.state.newCourseAssignmentSuccess &&
                            <Redirect to="/courses/assignments"/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

