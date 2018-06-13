import React       from "react";

export default class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {value: props.value};
    }

    componentWillReceiveProps(props) {
        this.setState({value: props.value});
    }

    render () {
        return (
            <div className="search-bar">
                <input value={this.state.value} onChange={this.props.handleChange} className="search-input" placeholder="Search"/>
            </div>
        );
    }
}