import React       from "react";

import { Link }    from 'react-router-dom';

export default class ActionButton extends React.Component {
    render () {

        const buttonStyle = {
            background: `url(${this.props.url})`,
            width: this.props.width,
            marginLeft: this.props.marginLeft,
            marginTop: this.props.marginTop
        };

        return (
            <div style={buttonStyle} className="action-button">
                <Link to={`${this.props.link}`}>
                    <div className="action-button-label">
                        <span>{this.props.label}</span>
                    </div>
                </Link>
            </div>
        );
    }
}