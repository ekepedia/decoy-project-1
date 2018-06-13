import React      from "react";

export default class TextBoxInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {value: props.value};
    }

    componentWillReceiveProps(props) {
        this.setState({value: props.value});
    }

    render() {

        const style = {
            height: "40.1px",
            backgroundColor: "#f0f0f0",
            width: "100%",
            marginBottom: this.props.marginBottom,
            marginTop: this.props.marginTop,
            border: "none",
            paddingLeft: this.props.paddingLeft || "15px",
            textAlign: this.props.textAlign
        };

        return (
            <input value={this.state.value} onChange={this.props.handleChange} name={this.props.name} type={this.props.password ? "password" : "text"} style={style} placeholder={this.props.placeholder}/>
        );
    }
}

