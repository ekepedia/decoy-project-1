import React       from "react";
import CourseStore   from "../../stores/CourseStore";
import queryString from "query-string";
import Select      from "../../components/Select";

import { Link }    from 'react-router-dom';

import BackButton from "../../components/BackButton";
import ActionButton from "../../components/ActionButton";
import SearchBar from "../../components/SearchBar";
import ToggleButton from "../../components/ToggleButton";

export default class Course extends React.Component {

    constructor(props) {
        super(props);

        const {location} = queryString.parse(this.props.location.search);
        const { match: { params } } = this.props;
        const course_id = params.id;

        this.state = {course_id};

        this.loadCourse              = this.loadCourse.bind(this);
        this.exapndCourseDescription = this.exapndCourseDescription.bind(this);
    }

    componentWillMount() {
        this.loadCourse();
        CourseStore.on("courses loaded", this.loadCourse);
    }

    componentWillUnmount() {
        CourseStore.removeListener("courses loaded", this.loadCourse);
    }

    loadCourse() {
        this.setState({
            course: CourseStore.getCourse(this.state.course_id)
        });
    }

    exapndCourseDescription() {
        const expand_course_description = !this.state.expand_course_description;
        this.setState({expand_course_description});
    }

    render() {

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col col-xs-12">
                            <BackButton link="/courses" label="Back To All Courses"/>
                        </div>
                    </div>

                    <div className="row" style={{marginBottom: "20px"}}>
                        <div className="col col-md-7">
                            <div>
                                <span className="course-number">
                                {this.state.course && this.state.course.course_number}
                                </span>
                                <span className="course-units">
                                    {this.state.course && this.state.course.units} Units
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col col-md-7">
                            <div className="course-name">
                                {this.state.course && this.state.course.name}
                            </div>
                        </div>
                        <div className="col col-md-5">
                            <div style={{float: "left", marginRight: "10px"}}>
                                <ActionButton width="150px" link={`/courses/${this.state.course_id}/edit`} label="Edit Course" />
                            </div>
                            <div style={{float: "left" }}>
                                <Select placeholder="Term" width="172" value="Fall 2018" options={["Fall 2018"]}/>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col col-xs-7">
                            <div className="course-header">
                                Course Description
                            </div>
                            <div
                                className="course-description"
                                style={{maxHeight: (this.state.expand_course_description ? "none" : null)}}
                                dangerouslySetInnerHTML={{__html: ( (this.state.course && this.state.course.description) || "No course description" )}}>
                            </div>
                            {
                                this.state.course && this.state.course.description &&
                                <ToggleButton label={(this.state.expand_course_description ? "Read Less" : "Read More") } marginLeft="0" marginTop="20px" width="120px" onClick={this.exapndCourseDescription}/>
                            }
                            <div className="course-header">
                                WRAP Description
                            </div>
                            <div
                                className="course-wrap-descriptionn"
                                dangerouslySetInnerHTML={{__html: ( (this.state.course && this.state.course.wrap_description) || "No WRAP course description" )}}>
                            </div>

                        </div>
                        <div className="col col-xs-5">
                            <div className="course-header">
                                Instructors
                            </div>
                            <div className="course-description">
                                No Assigned Instructors
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-2">
                            <div className="course-header">
                                Materials
                            </div>
                        </div>
                        <div className="col col-xs-12 col-sm-5">
                            <SearchBar />
                        </div>
                        <div className="col col-xs-12 col-sm-5">
                            <div style={{marginTop: "35px"}} >
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        );
    }
}

