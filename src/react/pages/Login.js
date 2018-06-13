import React      from "react";
import Input from "../components/Input";
import { Link } from 'react-router-dom';
import * as AuthActions from "../actions/AuthActions";
import AuthStore from "../stores/AuthStore";

import ActionButton from "../components/ActionButton";
import ToggleButton from "../components/ToggleButton";

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null
        };

        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleChange       = this.handleChange.bind(this);
        this.submitLogin        = this.submitLogin.bind(this);

    }

    handleChange (e) {
        let state = this.state;
        state[e.target.name] = e.target.value;

        this.setState({
            state
        })
    }

    submitLogin() {
        const {email, password} = this.state;
        AuthActions.submitLoginCredentials({email, password,});
    }

    handleLoginSuccess () {
        this.props.history.push("/courses");
    }

    componentWillMount() {
        AuthStore.on("login success", this.handleLoginSuccess);
    }

    componentWillUnmount() {
        AuthStore.removeListener("login success", this.handleLoginSuccess);
    }

    render() {
        const submitBtn = {
            height: "40.5px",
            backgroundColor: "#02adc6",
            maxWidth: "488px",
            width: "100%",
            fontSize: "15pt",
            borderRadius: "0",
            border: "none",
            textTransform: "uppercase",
            color: "white",
            letterSpacing: "1px"
        };

        const text = {
            textAlign: "center",
            marginBottom: "45px",
            maxWidth: "780px",
            marginRight: "auto",
            marginLeft: "auto",
        };

        return (
            <div className="page">
                <section className="section">
                    <div className="row" style={{textAlign:"center"}}>
                        <div className="col col-md-6 col-md-offset-3">
                            <h5 className="course-name" style={{marginTop:"50px", marginBottom: "50px"}}>WRAP Pedagogy Place</h5>
                        </div>
                        <div className="col col-md-6 col-md-offset-3">
                            <h5 className="input-label">Email</h5>
                            <Input value={this.state.email} handleChange={this.handleChange} name="email" textAlign="center" paddingLeft="0" marginBottom="12.5px" />
                        </div>
                        <div className="col col-md-6 col-md-offset-3">
                            <h5 className="input-label">Password</h5>
                            <Input value={this.state.password} password={true} handleChange={this.handleChange} name="password" textAlign="center" paddingLeft="0" marginBottom="12.5px" />
                        </div>
                        <div className="col col-xs-12" style={{textAlign: "center", marginTop: "25px"}}>
                            <div style={{display:"inline-block"}}>
                                <ToggleButton onClick={this.submitLogin} label="Login"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

