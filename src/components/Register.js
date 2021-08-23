import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios';
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";

import "./login.css";
import instagramlogo from "./instagram-logo.png";
import facebookicon from "./facebook-logo.png";
import insta from "./in.png";
import appfeatures from "./app-feautures.png"
// import facebookicon from "./facebook-icon.png";
import phones from "./phones.png"
export default class Register extends Component {
    constructor(props)
    {
        super(props);
        this.onChangeEmail=this.onChangeEmail.bind(this);  
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            email:'',
            name:'',
            username:'',
            password:'',
            redirect:false
        }
    }
    onChangeName = e =>
    {
        this.setState({
            name:e.target.value
        });
    }
    onChangeEmail = e =>
    {
        this.setState({
            email:e.target.value
        });
    }
    onChangeUsername = e =>
    {
        this.setState({
            username:e.target.value
        });
    }
    onChangePassword = e =>
    {
        this.setState({
            password:e.target.value
        });
    }
    refreshPage = ()=>{
        window.location.href='/';
     }
     onSubmit(e)
     {
         e.preventDefault();
         const obj = {
             email:this.state.email,
             name : this.state.name,
             username:this.state.username,
             password:this.state.password,
             
         };
         axios.post('http://localhost/ram/register.php',obj)
         .then( (response)=>{
             console.log(response);
             if(response.data[0].Message=="true")
             {
                 console.log("srbh")
              this.refreshPage();
             }
         })
        .catch(err => console.log(err));
        //  console.log(obj);
        
     }
    render() {
        return (
            <div class="wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 firstContainer">
                        <img src={appfeatures} alt="[+]" class="rounded d-block w-100"/>
                    </div>
                    <div class="col-md-6 text-center secondContainer">
                        <div class="card">
                            <div class="py-3 px-2">
                                <img src={insta} alt="card-img-top" />
                            </div>
                            <div class="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-group">
                                        <input type="text" class="form-control"  value={this.state.email}
                    onChange={this.onChangeEmail} name="" id="" aria-describedby="helpId"
                                            placeholder="Phone Number, Username or Email"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control"  value={this.state.name}
                    onChange={this.onChangeName} name="" id="" aria-describedby="helpId"
                                            placeholder="Full Name"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control"   value={this.state.username}
                    onChange={this.onChangeUsername} name="" id="" aria-describedby="helpId"
                                            placeholder="Username"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" value={this.state.password}
                              onChange={this.onChangePassword} class="form-control" name="" id="" aria-describedby="helpId"
                                            placeholder="Password"/>
                                    </div>
                                    <input type="submit" value="Sign In" class="mt-2 btn btn-primary w-100 disabled"/>
                                </form>
                                <div class="or">
                                    <span>OR</span>
                                </div>
                                {/* <div class="otherMethods">
                                    <div class="secondaryColor">
                                        <img src={facebookicon} class="img-fluid rounded" alt="[+]"
                                            />
                                        <span class="ms-2">Login with Facebook</span>
                                    </div>
                                </div> */}
                                {/* <div class="forgot-pass mt-3 primaryColor">Forgot Password ?</div> */}
                            </div>
                        </div>
                        <div class="card my-2">
                            <div class="card-body">
                               <span>Have an account?</span><span class="primaryColor"><Link to={'/'} style={{textDecoration:'none',color:'#0095F6',fontWeight:'450'}}> Log in</Link></span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>

 )
    }
}
