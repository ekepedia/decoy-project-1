import React       from "react";
import AuthStore   from "../stores/AuthStore";
import queryString from "query-string";
import Input       from "../components/Input";

import { Link }    from 'react-router-dom';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        const {location} = queryString.parse(this.props.location.search);
        const { match: { params } } = this.props;
        const id = params.id;

        this.state = {
            user: AuthStore.getUser()
        };
    }

    componentWillReceiveProps(props) {
        const {location} = queryString.parse(props.location.search);
        const { match: { params } } = this.props;
        const id = params.id;

        this.setState({
            location: location,
            id: id
        });
    }

    render() {

        return (
            <div className="page">
                <section className="section">
                    <div className="row">
                        <div className="col col-xs-12">
                            <h1>Hello, {this.state.user.name}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12">
                            <Input/>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}

