import React, { Component } from 'react'
import searchCard from './searchCard'
import UserProfile from './UserProfile'
import {
    BrowserRouter as
        Router, Link, Switch, Route,Redirect
} from "react-router-dom";
export default class NewPath extends Component {
    constructor(props){
        super(props);
        console.log(this.props.username)
    }
    render() {
        return (
            <div>
                  <Router>
                        <Switch>
                        <Route
                        exact
                        path={sessionStorage.getItem('currentpath')}
                        render={() => {
                            return (
                            <Redirect  to={{
                                pathname: "/searchcard",
                                state: { username: this.props.username,
                                name:this.props.name,
                                image:this.props.image,
                                email:this.props.email }
                              }} /> 
                            )
                        }}
              />
                            <Route path='/searchcard' component={searchCard} /> 
                             <Route path='/userprofile' component={UserProfile} />
                              </Switch>
                  
                </Router>
            </div>
        )
    }
}
