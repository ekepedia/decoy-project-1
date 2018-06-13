import React       from "react";

import { Link, Redirect }     from 'react-router-dom';

import CourseFields from "../../components/courses/CourseFields";

import * as CourseActions from "../../actions/CourseActions";

import CourseStore from "../../stores/CourseStore";

export default class NewCourse extends React.Component {

    constructor(props) {
        super(props);

        this.newCourseSuccess = this.newCourseSuccess.bind(this);
        this.newCourseError = this.newCourseError.bind(this);

    }

    componentWillMount() {
        CourseStore.on("new course success", this.newCourseSuccess);
        CourseStore.on("new course error", this.newCourseError);

    }

    componentWillUnmount() {
        CourseStore.removeListener("new course success", this.newCourseSuccess);
        CourseStore.removeListener("new course error", this.newCourseError);
    }

    newCourseSuccess() {
        this.setState({
            newCourseSuccess: true
        })
    }

    newCourseError() {
        this.setState({
            newCourseError: true
        })
    }

    handleSave(course) {
        console.log("Ready to Post New Course");
        console.log(course);
        CourseActions.newCourse(course);
    }

    render() {
        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Link to="/courses">
                                <button className="btn">
                                    Cancel
                                </button>
                            </Link>
                        </div>

                        <br/>
                        <br/>
                        <div className="col-xs-12">
                            <h1 className="new-course-title">New Course</h1>
                        </div>
                        {this.state && this.state.newCourseError &&
                            <div className="col col-xs-12">
                                <p>There was an error creating this course. Make sure you aren't creating 2 courses with the same course number!</p>
                            </div>
                        }
                        <div className="col col-xs-12">
                            <CourseFields handleSave={this.handleSave}/>
                        </div>
                        {this.state && this.state.newCourseSuccess &&
                            <Redirect to="/courses"/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

