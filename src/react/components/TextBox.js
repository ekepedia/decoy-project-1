import React      from "react";

export default class TextBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {value: props.value};
    }

    componentWillReceiveProps(props) {
        this.setState({value: props.value});
    }

    render() {

        const style = {
            height: this.props.height || "174px",
            backgroundColor: "#f0f0f0",
            width: "100%",
            marginBottom: this.props.marginBottom,
            marginTop: this.props.marginTop,
            border: "none",
            paddingLeft: "15px"
        };

        return (
            <textarea value={this.state.value ? this.state.value.replace(new RegExp("<br/>", 'g'), "\n") : null} style={style} name={this.props.name} onChange={this.props.handleChange} placeholder={this.props.placeholder}/>
        );
    }
}

