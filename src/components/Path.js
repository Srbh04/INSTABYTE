import React, { Component, Profiler } from 'react'
import Login from './Login'
import Register from './Register'
import Nav from './Nav';
import {
    BrowserRouter as
        Router, Link, Switch, Route,Redirect
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
import UserProfile from './UserProfile';
import SuggestionList from './SuggestionList';
export default class Path extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Nav>  </Nav>
                        <Switch>
                        <Route
                        exact
                        path="/path"
                        render={() => {
                            return (
                            <Redirect to="/home" /> 
                            )
                        }}
              />
                          
                            <Route path='/home' component={Home} />
                            <Route path='/post' component={Post} />
                            <Route path='/profile' component={Profile} />
                            <Route path='/editpath' component={EditPath} />
                            <Route path='/profilepost' component={Profile_Post} />
                            <Route path='/userprofile' component={UserProfile} />
                            <Route path='/suggestion' component={SuggestionList} />   
                            
                       </Switch>
                  
                </Router>
            </div>
        )
    }
}
