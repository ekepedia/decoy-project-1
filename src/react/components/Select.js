import React      from "react";

export default class Select extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            options: props.options,
            value: props.value
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            options: props.options,
            value: props.value
        });
    }

    render() {

        const style = {
            backgroundColor: "#FDFDFA",
            fontFamily: "'Roboto Mono', monospace",
            width: this.props.width || "100%",
            marginBottom: this.props.marginBottom,
            marginRight: this.props.marginRight,
            marginTop: this.props.marginTop,
            padding: "8px 18px",
            borderRadius: 0,
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundPosition: "right 15px center",
            backgroundSize: "20px",
            backgroundRepeat: "no-repeat",
            backgroundImage: 'url("/img/downarrow.png")',
            paddingRight: "1.5em",
            border: "solid 1px"
        };

        return (

            <select value={this.state.value || ""} name={this.props.name} onChange={this.props.handleChange} style={style}>
                <option disabled>{this.props.placeholder}</option>
                {this.state.options.map((option, i)=>{
                    return (<option key={i} value={option.value || option}>{option.label || option.value || option}</option>)
                })}
            </select>
        );
    }
}

