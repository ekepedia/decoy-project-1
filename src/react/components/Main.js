import React     from "react";
import { Switch, Route } from 'react-router-dom'

import AuthWrapper from "../components/AuthWrapper";

import Home     from "../pages/Home";

import Login    from "../pages/Login";
import SignUp   from "../pages/SignUp";
import Dashboard  from "../pages/Dashboard";

import Courses     from "../pages/courses/Courses";
import Course      from "../pages/courses/Course";
import NewCourse   from "../pages/courses/NewCourse";
import EditCourse  from "../pages/courses/EditCourse";

import Faculties   from "../pages/faculty/Faculties";
import Faculty     from "../pages/faculty/Faculty";
import EditFaculty from "../pages/faculty/EditFaculty";
import NewFaculty  from "../pages/faculty/NewFaculty";

import CourseAssignments    from "../pages/course_assignments/CourseAssignments";
import NewCourseAssignment  from "../pages/course_assignments/NewCourseAssignment";
import EditCourseAssignment from "../pages/course_assignments/EditCourseAssignment";


export default class Main extends React.Component {

    constructor(){
        super();
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/login'  component={Login}/>
                    <Route exact path='/signup' component={SignUp}/>

                    <AuthWrapper exact path='/' component={Dashboard}/>

                    <AuthWrapper exact path='/dashboard' component={Dashboard}/>

                    <AuthWrapper exact path='/courses/assignments'      component={CourseAssignments}/>
                    <AuthWrapper exact path='/courses/assignments/new'  component={NewCourseAssignment}/>
                    <AuthWrapper exact path='/courses/assignments/:id/edit' component={EditCourseAssignment}/>

                    <AuthWrapper exact path='/courses'          component={Courses}/>
                    <AuthWrapper exact path='/courses/new'      component={NewCourse}/>
                    <AuthWrapper exact path='/courses/:id'      component={Course}/>
                    <AuthWrapper exact path='/courses/:id/edit' component={EditCourse}/>

                    <AuthWrapper exact path='/faculty'          component={Faculties}/>
                    <AuthWrapper exact path='/faculty/new'      component={NewFaculty}/>
                    <AuthWrapper exact path='/faculty/:id'      component={Faculty}/>
                    <AuthWrapper exact path='/faculty/:id/edit' component={EditFaculty}/>
                </Switch>
            </main>
        );
    }
}

