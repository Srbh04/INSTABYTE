import React, { Component } from 'react'
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
import axios from 'axios';
import "./login.css";
import instagramlogo from "./instagram-logo.png";
import facebookicon from "./facebook-logo.png";
import phones from "./phones.png";
import insta from "./in.png";
// import facebookicon from "./facebook-icon.png";
import appfeatures from "./app-feautures.png"
export default class Login extends Component {
    constructor(props)
    {
        super(props);
        this.onChangeEmail=this.onChangeEmail.bind(this); 
        this.onChangePassword=this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state = {
            email:'',
            password:'',
            redirect:false
        }
    }
    onChangeEmail = e =>
    {
        this.setState({
            email:e.target.value
        });
    }
   
    onChangePassword = e =>
    {
        this.setState({
            password:e.target.value
        });
    }
    refreshPage = (data)=>{
        this.props.history.push( {pathname: "/path",
        state: { data:data }});
     }
     onSubmit(e)
     {
         e.preventDefault();
         const obj = {
             email:this.state.email,
             password:this.state.password,
             
         };
         axios.post('http://localhost/ram/login.php',obj)
         .then( (response)=>{
             console.log(response);
             if(response.data.Message=="true")
             {
                
                 sessionStorage.setItem('username', response.data.username);
                 sessionStorage.setItem('email', response.data.email); 
                 sessionStorage.setItem('name', response.data.name);
                 sessionStorage.setItem('dp', response.data.dp);
              
              this.refreshPage(response.data);
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
                                        <input type="text" class="form-control" value={this.state.email}
                                                           onChange={this.onChangeEmail} name="" id="" aria-describedby="helpId"
                                            placeholder="Phone Number, Username or Email"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" value={this.state.password}
                              onChange={this.onChangePassword} class="form-control" name="" id="" aria-describedby="helpId"
                                            placeholder="Password"/>
                                    </div>
                                    <input type="submit" value="Log In" class="mt-2 btn btn-primary w-100 disabled"/>
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
                             <span>Don't Have an Account?</span><span class="primaryColor" >  <Link to={'/register'} style={{textDecoration:'none',color:'#0095F6',fontWeight:'450'}}> Sign Up</Link></span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
          
        )
    }
}
