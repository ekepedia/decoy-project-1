import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';

import Layout from "./components/Layout";

const app = document.getElementById('app');

ReactDOM.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>, app);