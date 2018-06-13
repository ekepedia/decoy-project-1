import React       from "react";

export default class ToggleButton extends React.Component {
    render () {

        const buttonStyle = {
            background: `url(${this.props.url})`,
            width: this.props.width,
            marginLeft: this.props.marginLeft,
            marginTop: this.props.marginTop
        };

        return (
            <div style={buttonStyle} className="action-button" onClick={this.props.onClick}>
                <div className="action-button-label">
                    <span>{this.props.label}</span>
                </div>
            </div>
        );
    }
}