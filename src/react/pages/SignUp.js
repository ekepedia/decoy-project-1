import React      from "react";
import Input from "../components/Input";
import { Link } from 'react-router-dom';
import * as AuthActions from "../actions/AuthActions";
import AuthStore from "../stores/AuthStore";

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null,
            password_confirm: null
        };

        this.handleSignUpSuccess = this.handleSignUpSuccess.bind(this);
        this.handleChange        = this.handleChange.bind(this);
        this.submitSignUp        = this.submitSignUp.bind(this);
    }

    handleChange (e) {
        let state = this.state;
        state[e.target.name] = e.target.value;

        this.setState({
            state
        })
    }

    submitSignUp() {
        const {name, email, password} = this.state;
        AuthActions.submitSignUpCredentials({name, email, password});
    }

    handleSignUpSuccess () {
        console.log("LOGIN COMPONENT: TODO handling successful signup");
    }

    componentWillMount() {
        AuthStore.on("sign up success", this.handleSignUpSuccess);
    }

    componentWillUnmount() {
        AuthStore.removeListener("sign up success", this.handleSignUpSuccess);
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
                    <div className="row">
                        <div className="col col-md-6">
                            <Input value={this.state.name} handleChange={this.handleChange} name="name" marginBottom="12.5px" placeholder="name"/>
                        </div>
                        <div className="col col-md-6">
                            <Input value={this.state.email} handleChange={this.handleChange} name="email" marginBottom="12.5px" placeholder="email"/>
                        </div>
                        <div className="col col-md-6">
                            <Input value={this.state.password} password={true} handleChange={this.handleChange} name="password" marginBottom="12.5px" placeholder="password"/>
                        </div>
                        <div className="col col-md-6">
                            <Input value={this.state.password_confirm} password={true} handleChange={this.handleChange} name="password_confirm" marginBottom="12.5px" placeholder="confirm password"/>
                        </div>
                        <div className="col col-xs-12" style={{textAlign: "center", marginTop: "25px"}}>
                            <button style={submitBtn} onClick={this.submitSignUp} className="btn">Sign Up</button>
                        </div>
                        <div className="col col-xs-12" style={{textAlign: "center", marginTop: "25px"}}>
                            <Link to="/login">
                                <p style={{textDecoration: "underline"}}>Login</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

