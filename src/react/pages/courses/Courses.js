import React       from "react";
import CourseStore from "../../stores/CourseStore";
import _           from "lodash";

import { Link }    from 'react-router-dom';
import SearchBar from "../../components/SearchBar";

import store from "store";


export default class Courses extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: store.get("courses_filter")
        };

        this.loadCourses = this.loadCourses.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentWillMount() {
        this.loadCourses();
        CourseStore.on("courses loaded", this.loadCourses);
    }

    componentWillUnmount() {
        CourseStore.removeListener("courses loaded", this.loadCourses);
    }

    loadCourses() {
        this.setState({
            courses: CourseStore.getCourses()
        })
    }

    handleFilterChange(e) {
        const filter = e.target.value;

        store.set('courses_filter',  filter);

        this.setState({filter});
    }

    render() {

        const sorted_courses =  this.state.courses && this.state.courses.sort(function (a,b) {
                return parseFloat(a["course_number"]) - parseFloat(b["course_number"]);
            });

        const featured_courses = _.filter(sorted_courses, function (c) {
            return c.featured;
        });

        const courses = sorted_courses && sorted_courses.map((course) => {

            if (this.state.filter && this.state.filter.length !== 0) {

                const cn = course.course_number.toLowerCase();
                const ca = course.name.toLowerCase();

                const f  = this.state.filter.toLowerCase();

                if (cn.indexOf(f) === -1 && ca.indexOf(f) === -1)
                    return;
            }

            return (
                <CourseLink key={course.course_id} course_id={course.course_id} name={course.name} course_number={course.course_number}/>
            );
        });

        const f_courses = featured_courses && featured_courses.map((course) => {
                    return (
                        <FeatureCourseLink key={course.course_id + "F"} course_id={course.course_id} name={course.name} course_number={course.course_number}/>
                    );
                }
            );

        const m_courses = sorted_courses && sorted_courses.map((course) => {

                    if ([183,182, 207].indexOf(course.course_id) === -1)
                        return

                    return (
                        <MyCourseLink key={course.course_id + "M"} course_id={course.course_id} name={course.name} course_number={course.course_number}/>
                    );
                }
            );

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div  className="row">
                                <div className="col col-xs-12">
                                    <h1 className="courses-title">My Courses</h1>
                                </div>
                            </div>
                            <div className="row">
                                {m_courses}
                            </div>
                            <div style={{marginTop:"40px"}} className="row">
                                <div className="col col-xs-12">
                                    <h1 className="courses-title">Featured Courses</h1>
                                </div>
                            </div>
                            <div className="row">
                                {f_courses}
                            </div>
                            <div style={{marginTop:"40px", marginBottom: "20px"}} className="row">
                                <div className="col col-xs-3">
                                    <h1 className="courses-title">All Courses</h1>
                                </div>
                                <div className="col col-xs-12 col-sm-5 all-courses">
                                    <SearchBar value={this.state.filter} handleChange={this.handleFilterChange}/>
                                </div>
                            </div>
                            <div className="row">
                                {courses}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

class MyCourseLink extends React.Component {
    render () {
        return (
            <div className="my-course-link col col-xs-12 col-md-4 col-sm-6">
                <Link  to={`/courses/${this.props.course_id}`}>
                    <div className="course-link-number-holder"><span className="course-link-number">{this.props.course_number}</span></div>
                    <div className="course-link-name">{this.props.name}</div>
                </Link>
            </div>
        );
    }
}


class FeatureCourseLink extends React.Component {
    render () {
        return (
            <div className="feature-course-link col col-xs-12 col-md-4 col-sm-6">
                <Link  to={`/courses/${this.props.course_id}`}>
                    <div className="course-link-number-holder"><span className="course-link-number">{this.props.course_number}</span></div>
                    <div className="course-link-name">{this.props.name}</div>
                </Link>
            </div>
        );
    }
}

class CourseLink extends React.Component {
    render () {
        return (
            <div className="course-link col col-xs-6 col-sm-4 col-md-3">
                <Link to={`/courses/${this.props.course_id}`}>
                    <div className="course-link-number-holder"><span className="course-link-number">{this.props.course_number}</span></div>
                    <div className="course-link-name">{this.props.name}</div>
                </Link>
            </div>
        );
    }
}
