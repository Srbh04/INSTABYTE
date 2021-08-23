import React, { Component } from 'react'
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
import "./editprofile.css"
import axios from 'axios';
import EditNav from './EditNav';
export default class EditProfile extends Component {
    render() {
        return (
            <div class="c">
                <div class="container car">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-3 left">
                        <div class="content">
                          
                         </div>
                        </div>
                        <div class="col-7 right">
                        <h1>ram</h1>
                        </div>
                        <div class="col-1"></div>
                    </div>
                </div>
               
            </div>
        )
    }
}
