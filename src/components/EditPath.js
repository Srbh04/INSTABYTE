import React, { Component } from 'react'
import {
    BrowserRouter as
        Router, Link, Switch, Route, Redirect
} from "react-router-dom";
import EditInfo from './EditInfo';
import EditNav from './EditNav';
import EditPassword from './EditPassword';
import "./editprofile.css"
export default class EditPath extends Component {
    render() {
        return (
            <div style={{backgroundColor: '#fafafa',}}>
            <Router>
                <div class="container ">
                    <div class="row">
                        <div class="col-1"></div>
                        {/* <div class="card"> */}
                        <div class="col-2 card" style={{background:''}}>
                        <EditNav></EditNav>
                        </div>
                        <div class="col-8 card c">
                        <Switch>
                        <Route
                        exact
                        path="/editpath"
                        render={() => {
                            return (
                            <Redirect to="/editinfo" /> 
                            )
                        }}
              />
                        <Route exact path='/editinfo' component={EditInfo} />
                        <Route path='/editpassword' component={EditPassword} />
                        </Switch>

                        </div>
                        {/* </div> */}
                        <div class="col-1"></div>
                    </div>
                </div>
               
            </Router>
        </div>
        )
    }
}
