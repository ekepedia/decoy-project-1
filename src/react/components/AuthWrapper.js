import React        from "react";
import { Route, Redirect } from 'react-router'

import AuthStore  from "../stores/AuthStore";

export default class AuthWrapper extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: AuthStore.getUser()
        };
    }

    componentWillReceiveProps(props) {
        this.setState({value: props.value});
    }

    render() {

        if (!this.state.user)
            return <Redirect to='/login'/>;

        return (
            <Route exact {...this.props}/>
        );
    }
}

