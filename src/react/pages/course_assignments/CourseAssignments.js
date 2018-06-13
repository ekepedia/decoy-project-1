import React                 from "react";
import CourseAssignmentStore from "../../stores/CourseAssignmentStore";
import CourseStore           from "../../stores/CourseStore";
import FacultyStore          from "../../stores/FacultyStore";

import Select from "../../components/Select";

import _                     from "lodash";

import { Link }    from 'react-router-dom';

const terms = {S: "Spring", F: "Fall", I: "IAP"};

const years_o = [2018,2017,2016];
const terms_o = [
    {
        value: "F",
        label: "Fall"
    },
    {
        value: "I",
        label: "IAP"
    },
    {
        value: "S",
        label: "Spring"
    }
];

export default class CourseAssignments extends React.Component {

    constructor(props) {
        super(props);

        this.loadCourseAssignments = this.loadCourseAssignments.bind(this);
        this.handleChange          = this.handleChange.bind(this);

        this.state = {
            year: 2018,
            term: "S"
        };
    }

    componentWillMount() {
        this.loadCourseAssignments();
        CourseAssignmentStore.on("courses assignments loaded", this.loadCourseAssignments);
    }

    componentWillUnmount() {
        CourseAssignmentStore.removeListener("courses assignments loaded", this.loadCourseAssignments);
    }

    loadCourseAssignments() {

        const ca = CourseAssignmentStore.getCourseAssignments();

        let course = {};

        _.each(ca, function (c) {
            course[c.course_id] = course[c.course_id] || {};
            course[c.course_id].faculty = course[c.course_id].faculty || [];
            course[c.course_id].faculty.push(c);
        });

        this.setState({
            course_assignments: course
        });
    }

    handleChange(e) {
        let state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({
            state
        })
    }

    render() {

        let self = this;

        const courses = this.state.course_assignments && _.map(this.state.course_assignments, function(ca) {

            let course_name = "";
            let course_number = "";

            const faculties = ca.faculty && ca.faculty.map((f) => {
                const course  = CourseStore.getCourse(f.course_id) || {};
                const faculty = FacultyStore.getFacultyOne(f.faculty_id) || {};

                course_name = course.name;
                course_number = course.course_number;
                if (parseInt(f.year) === parseInt(self.state.year) && f.term === self.state.term ) {
                    return (
                        <div key={f.course_assignment_id} className="course-link col col-xs-12">
                            <Link to={`/courses/assignments/${f.course_assignment_id}/edit`}>
                                <span className="course-link-name">
                                    {f.team_lead ? <span style={{fontWeight:"bold"}}>Lead</span> : ""} {faculty.name} {terms[f.term]} {f.year}
                                </span>
                            </Link>
                        </div>
                    );
                }
            });


            console.log(faculties);

            if (faculties && _.without(faculties, undefined, null).length) {
                return (
                    <div key={course_number} className="course-link col col-xs-12" style={{marginBottom:"20px"}}>
                        <h3>{course_number} {course_name}</h3>
                        <div className="row">
                            {faculties}
                        </div>
                    </div>
                );
            }

        });

        const all_courses = this.state.course_assignments && _.map(this.state.course_assignments, function(ca) {

                let course_name = "";
                let course_number = "";

                const faculties = ca.faculty && ca.faculty.map((f) => {
                        const course  = CourseStore.getCourse(f.course_id) || {};
                        const faculty = FacultyStore.getFacultyOne(f.faculty_id) || {};

                        course_name = course.name;
                        course_number = course.course_number;
                        return (
                            <div key={f.course_assignment_id} className="course-link col col-xs-12">
                                <Link to={`/courses/assignments/${f.course_assignment_id}/edit`}>
                                    <span className="course-link-name">
                                        {f.team_lead ? <span style={{fontWeight:"bold"}}>Lead</span> : ""} {faculty.name} {terms[f.term]} {f.year}
                                    </span>
                                </Link>
                            </div>
                        );
                    });
                return (
                    <div key={course_number} className="course-link col col-xs-12" style={{marginBottom:"20px"}}>
                        <h3>{course_number} {course_name}</h3>
                        <div className="row">
                            {faculties}
                        </div>
                    </div>
                )
            });

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div style={{marginBottom: "50px"}} className="col-xs-12">
                            <Link to="/courses/assignments/new">
                                <button className="btn">
                                    New Course Assignment
                                </button>
                            </Link>
                        </div>
                        <div className="col col-xs-12">
                            <div className="row">
                                <div className="col col-xs-12">
                                    <h1 className="courses-title">Courses Assignments</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12">
                                    <Select name="year" handleChange={this.handleChange} placeholder="Year" value={this.state.year} options={years_o} marginBottom="12.5px" width="49%" marginRight="2%"/>
                                    <Select name="term" handleChange={this.handleChange} placeholder="Term" value={this.state.term} options={terms_o} marginBottom="12.5px" width="49%"/>
                                </div>
                            </div>
                            <div className="row">
                                {courses}
                            </div>
                            <div className="row" style={{marginTop: "30px"}}>
                                <div className="col col-xs-12">
                                    <h1 className="courses-title">All Courses Assignments</h1>
                                </div>
                            </div>
                            <div className="row">
                                {all_courses}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

