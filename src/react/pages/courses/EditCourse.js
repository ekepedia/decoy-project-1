import React       from "react";

import { Link, Redirect }     from 'react-router-dom';
import queryString from "query-string";

import CourseFields from "../../components/courses/CourseFields";

import * as CourseActions from "../../actions/CourseActions";

import CourseStore from "../../stores/CourseStore";

export default class EditCourse extends React.Component {

    constructor(props) {
        super(props);

        const {location}            = queryString.parse(this.props.location.search);
        const { match: { params } } = this.props;
        const course_id             = params.id;

        this.state = {
            course_id,
            course: CourseStore.getCourse(course_id) || {}
        };

        this.editCourseSuccess = this.editCourseSuccess.bind(this);
        this.editCourseError   = this.editCourseError.bind(this);
        this.loadCourse        = this.loadCourse.bind(this);
        this.handleSave        = this.handleSave.bind(this);

    }

    componentWillMount() {
        CourseStore.on("edit course success", this.editCourseSuccess);
        CourseStore.on("edit course error", this.editCourseError);
        CourseStore.on("courses loaded", this.loadCourse);
    }

    componentWillUnmount() {
        CourseStore.removeListener("edit course success", this.editCourseSuccess);
        CourseStore.removeListener("edit course error", this.editCourseError);
        CourseStore.removeListener("courses loaded", this.loadCourse);
    }

    loadCourse() {
        this.setState({
            course: CourseStore.getCourse(this.state.course_id)
        });
    }

    editCourseSuccess() {
        this.setState({
            editCourseSuccess: true
        });
    }

    editCourseError() {
        this.setState({
            editCourseError: true
        });
    }

    handleSave(course) {
        console.log("Ready to Edit Course");
        console.log(course);
        course.course_id = this.state.course_id;
        CourseActions.editCourse(course);
    }

    render() {

        const {name, course_number, units, description, wrap_description, featured} = this.state.course;

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col-xs-12">
                            <Link to={`/courses/${this.state.course_id}`}>
                                <button className="btn">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                        <br/>
                        <br/>
                        <div className="col-xs-12">
                            <h1 className="edit-course-title">Edit Course: {course_number}</h1>
                        </div>
                        {this.state && this.state.editCourseError &&
                            <div className="col col-xs-12">
                                <p>There was an error creating this course. Make sure you aren't creating 2 courses with the same course number!</p>
                            </div>
                        }
                        <div className="col col-xs-12">
                            <CourseFields
                                name={name}
                                course_number={course_number}
                                units={units}
                                featured={featured}
                                description={description}
                                wrap_description={wrap_description}
                                handleSave={this.handleSave}
                            />
                        </div>
                        {this.state && this.state.editCourseSuccess &&
                            <Redirect to={`/courses/${this.state.course_id}`}/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

