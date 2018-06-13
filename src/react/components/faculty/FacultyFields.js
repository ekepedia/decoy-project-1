import React       from "react";
import Input from "../Input";
import TextBox from "../TextBox";

export default class FacultyFields extends React.Component {

    constructor(props) {
        super(props);

        const {name, campus_address, campus_phone, kerberos, mit_id} = props;

        this.state = {name, campus_address, campus_phone, kerberos, mit_id};

        this.handleChange = this.handleChange.bind(this);
        this.handleSave   = this.handleSave.bind(this);
    }

    handleChange(e) {
        let state = this.state;
        state[e.target.name] = e.target.value;

        this.setState({
            state
        })
    }

    componentWillReceiveProps(props) {
        const {name, campus_address, campus_phone, kerberos, mit_id} = props;
        this.setState({name, campus_address, campus_phone, kerberos, mit_id});
    }

    handleSave(e) {
        let state = this.state;

        if (!state || !state.name || !state.kerberos) {
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

        const {name, campus_address, campus_phone, kerberos, mit_id} = this.state;

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
                        <Input value={name}           handleChange={this.handleChange} name="name"           marginBottom="12.5px" placeholder="Full Name"/>
                        <Input value={campus_address} handleChange={this.handleChange} name="campus_address" marginBottom="12.5px" placeholder="Campus Address"/>
                        <Input value={campus_phone}   handleChange={this.handleChange} name="campus_phone"   marginBottom="12.5px" placeholder="Campus Phone"/>
                        <Input value={kerberos}       handleChange={this.handleChange} name="kerberos"       marginBottom="12.5px" placeholder="Kerberos"/>
                        <Input value={mit_id}         handleChange={this.handleChange} name="mit_id"         marginBottom="12.5px" placeholder="MIT ID"/>
                        <button className="btn" onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

