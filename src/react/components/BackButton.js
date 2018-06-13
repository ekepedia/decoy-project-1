import React       from "react";

import { Link }    from 'react-router-dom';

export default class BackButton extends React.Component {
    render () {
        return (
            <div className="back-button">
                <Link to={`${this.props.link}`}>
                    <div className="back-button-holder"></div>
                    <div className="back-button-label">
                        <span>{this.props.label}</span>
                    </div>
                </Link>
            </div>
        );
    }
}