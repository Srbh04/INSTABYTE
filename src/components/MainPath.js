import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import Nav from './Nav';
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
import Profile from './Profile';
import Home from './Home';
import Search from './Search';
import Post from './Post';
import EditProfile from './EditProfile';
import EditInfo from './EditInfo';
import EditPassword from './EditPassword';
import Profile_Post from './Profile_Post';
import EditPath from './EditPath';
import Path from './Path';
export default class MainPath extends Component {
    render() {
        return (
            <div>
                 <Router>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route path='/register' component={Register} />
                           <Route path='/path' component={Path} />
                       </Switch>
                  </Router>
            </div>
        )
    }
}
