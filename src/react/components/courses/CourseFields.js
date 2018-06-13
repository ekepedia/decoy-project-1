import React       from "react";
import Input from "../Input";
import TextBox from "../TextBox";
import Checkbox from "../Checkbox";

export default class Course extends React.Component {

    constructor(props) {
        super(props);

        const {name, course_number, units, description, wrap_description, featured} = props;

        this.state = {name, course_number, units, description, wrap_description, featured};

        this.handleChange = this.handleChange.bind(this);
        this.handleSave   = this.handleSave.bind(this);

    }

    handleChange(e) {
        let state = this.state;
        state[e.target.name] = e.target.value.replace(new RegExp("\n", 'g'), "<br/>");

        if (e.target.type === "checkbox") {
            const value = (e.target.value === "true");
            state[e.target.name] = !value;
        }

        this.setState({
            state
        })
    }

    componentWillReceiveProps(props) {
        const {name, course_number, units, description, wrap_description, featured} = props;
        this.setState({name, course_number, units, description, wrap_description, featured});
    }

    handleSave(e) {
        let state = this.state;

        if (!state || !state.name || !state.course_number || !state.units) {
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

        const {name, course_number, units, description, wrap_description, featured} = this.state;

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
                        <h5 className="input-label">Course Name</h5>
                        <Input    value={name}             handleChange={this.handleChange} name="name"             marginBottom="12.5px" placeholder="Course Name"/>
                        <h5 className="input-label">Course Description</h5>
                        <TextBox  value={description}      handleChange={this.handleChange} name="description"      marginBottom="12.5px" placeholder="Description"/>
                        <h5 className="input-label">WRAP Course Description</h5>
                        <TextBox  value={wrap_description} handleChange={this.handleChange} name="wrap_description" marginBottom="12.5px" placeholder="WRAP Description"/>
                        <button   className="btn"          onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </div>
        );

        /*

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
         <Input    value={name}             handleChange={this.handleChange} name="name"             marginBottom="12.5px" placeholder="Course Name"/>
         <Input    value={course_number}    handleChange={this.handleChange} name="course_number"    marginBottom="12.5px" placeholder="Course Number"/>
         <Input    value={units}            handleChange={this.handleChange} name="units"            marginBottom="12.5px" placeholder="Units"/>
         <Checkbox value={featured}         handleChange={this.handleChange} name="featured"         marginBottom="12.5px" placeholder="featured"/>
         <TextBox  value={description}      handleChange={this.handleChange} name="description"      marginBottom="12.5px" placeholder="Description"/>
         <TextBox  value={wrap_description} handleChange={this.handleChange} name="wrap_description" marginBottom="12.5px" placeholder="WRAP Description"/>
         <button   className="btn"          onClick={this.handleSave}>Save</button>
         </div>
         </div>
         </div>
         );
         */
    }
}

