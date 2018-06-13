import React    from "react";

import Input    from "../Input";
import Checkbox from "../Checkbox";
import Select   from "../Select";

import CourseStore  from "../../stores/CourseStore";
import FacultyStore from "../../stores/FacultyStore";

export default class Course extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.state.courses = [];
        this.state.faculty = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleSave   = this.handleSave.bind(this);
        this.loadCourses  = this.loadCourses.bind(this);
        this.loadFaculty  = this.loadFaculty.bind(this);
    }

    componentWillMount() {
        this.loadCourses();
        this.loadFaculty();

        const {faculty_id, course_id, term, year, team_lead} = this.props;

        this.setState({faculty_id, course_id, term, year, team_lead});

        CourseStore.on("courses loaded", this.loadCourses);
        FacultyStore.on("faculty loaded", this.loadFaculty);
    }

    componentWillUnmount() {
        CourseStore.removeListener("courses loaded", this.loadCourses);
        FacultyStore.removeListener("faculty loaded", this.loadFaculty);
    }

    handleChange(e) {
        let state = this.state;
        state[e.target.name] = e.target.value;

        if (e.target.type === "checkbox") {
            const value = (e.target.value === "true");
            state[e.target.name] = !value;
        }

        this.setState({
            state
        })
    }

    componentWillReceiveProps(props) {
        const {faculty_id, course_id, term, year, team_lead} = props;
        this.setState({faculty_id, course_id, term, year, team_lead});
    }

    loadCourses() {
        let courses = CourseStore.getCourses() ? CourseStore.getCourses().map(function (c) {
            return {
                value: c.course_id,
                label: `${c.course_number} ${c.name}`
            }
        }) : [];

        courses = courses.sort(function (a,b) {
            return parseFloat(a["label"]) - parseFloat(b["label"]);
        });

        this.setState({
            courses: courses
        })
    }

    loadFaculty() {
        let faculty = FacultyStore.getFaculty() ? FacultyStore.getFaculty().map(function (f) {
            return {
                value: f.faculty_id,
                label: f.name
            }
        }) : [];

        faculty = faculty.sort(function (a,b) {
            return a["label"] > b["label"];
        });

        this.setState({
            faculty: faculty
        })
    }


    handleSave(e) {
        let state = this.state;

        if (!state || !state.faculty_id || !state.course_id || !state.term || !state.year) {
            state.missing_fields = true;
            return this.setState({
                state
            });
        }

        state.missing_fields = false;
        this.setState({
            state
        });

        this.props.handleSave(state);
    }

    render() {

        const {faculty_id, course_id, term, year, team_lead} = this.state;

        const years = [2018,2017,2016];
        const terms = [
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

        return (
            <div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="col col-md-12">
                            {this.state.missing_fields &&
                            <div>Missing Fields!</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <Select   name="year"       handleChange={this.handleChange} placeholder="Year"      value={year}       options={years}              marginBottom="12.5px"/>
                        <Select   name="term"       handleChange={this.handleChange} placeholder="Term"      value={term}       options={terms}              marginBottom="12.5px"/>
                        <Select   name="course_id"  handleChange={this.handleChange} placeholder="Course"    value={course_id}  options={this.state.courses} marginBottom="12.5px"/>
                        <Select   name="faculty_id" handleChange={this.handleChange} placeholder="Faculty"   value={faculty_id} options={this.state.faculty} marginBottom="12.5px"/>
                        <Checkbox name="team_lead"  handleChange={this.handleChange} placeholder="Team Lead" value={team_lead}  marginBottom="12.5px" />
                        <button   className="btn"          onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

