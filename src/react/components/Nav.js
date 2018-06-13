import React from "react";
import styles from '../styles/nav.css';
import { Link } from 'react-router-dom';
import AuthStore from "../stores/AuthStore";

export default class Nav extends React.Component {

    constructor(){
        super();
    }

    render() {

        $('.nav a').on('click', function(){
            $('.btn-navbar').click();
            $('.navbar-toggle').click()
        });

        // <li><Link to='/faculty'>faculty</Link></li>
        // <li><Link to='/courses/assignments'>course A</Link></li>

        const user = AuthStore.getUser() || {};

        return (
            <nav className={[styles.navbar, "navbar"].join(' ')}>
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav navbar-right">
                            <li><Link to='/courses'>courses</Link></li>
                            { user.name &&
                                <li><a><span>{user.name}</span></a></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}