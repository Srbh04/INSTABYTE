import React, { Component } from 'react'
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
export default class EditNav extends Component {
    render() {
        return (
            <div>
                  <div class="content mt-4">
                      <div style={{padding:'4%'}}>
                      <Link style={{fontSize:'16px',textDecoration:'none',padding:'10px',color:'#262626',fontWeight:'500'}} to={'/editinfo'}>Edit Profile</Link><br/>
                      </div>
                      <div style={{padding:'4%'}}>
                      <Link style={{fontSize:'16px',textDecoration:'none',padding:'10px',color:'#262626'}} to={'/editpassword'}>Change Password</Link>
                       
                      </div>
                         </div>
            </div>
        )
    }
}
