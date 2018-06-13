import React  from "react";
import Main   from "./Main";
import Nav    from "./Nav";
import Footer from "./Footer";

export default class Layout extends React.Component {

    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <Nav/>
                <Main/>
            </div>
        );
    }
}

