import React, { Component } from 'react'
import axios from 'axios'
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
import "./editinfo.css"
export default class EditInfo extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeWebsite = this.onChangeWebsite.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: sessionStorage.getItem('email'),
            name: sessionStorage.getItem('name'),
            username: sessionStorage.getItem('username'),
            website: sessionStorage.getItem('website'),
            bio: sessionStorage.getItem('bio'),
            phone: sessionStorage.getItem('phone'),
            redirect: false
        }
    }
    onChangeName = e => {
        this.setState({
            name: e.target.value
        });
    }
    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        });
    }
    onChangeWebsite = e => {
        this.setState({
            website: e.target.value
        });
    }
    onChangeBio = e => {
        this.setState({
            bio: e.target.value
        });
    }
    onChangeEmail = e => {
        this.setState({
            email: e.target.value
        });
    }
    onChangePhone = e => {
        this.setState({
            phone: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            email: this.state.email,
            website: this.state.website,
            bio: this.state.bio,
            phone: this.state.phone,
            name: this.state.name,
            username: this.state.username

        };
        axios.post('http://localhost/ram/update_profile.php', obj)
            .then((response) => {
                console.log(response);
                if (response.data[0].Message == "true") {
                    sessionStorage.setItem('website', this.state.website);
                    sessionStorage.setItem('bio', this.state.bio);
                    sessionStorage.setItem('username', this.state.username);
                    sessionStorage.setItem('name', this.state.name);
                    sessionStorage.setItem('phone', this.state.phone);
                    alert('update successfully')

                    //  this.refreshPage();
                }
            })
            .catch(err => console.log(err));
    }
    onupload = e => {
        console.log(e.target.files[0])

        const formData = new FormData();
        formData.append('img', e.target.files[0], e.target.files[0].name);
        formData.append('email', this.state.email);
        axios.post('http://localhost/ram/profile_image.php', formData)
            .then((response) => {
                console.log(response.data.response);
                if (response.data.Message == "true") {
                    console.log("srbh")
                    this.refreshPage();
                }
            })
            .catch(err => console.log(err));
        //  console.log(obj);
    }
    render() {
        return (
            <div style={{ padding: '5%' }}>
                <div class="row">
                    {/* <div class="col-1"></div> */}
                    <div class="col-3 this">
                        <label class="i" style={{ cursor:'pointer', width: '40px', height: '40px', borderRadius: '50%'}} >
                    <img src={require('../' +sessionStorage.getItem('dp')).default} height="40px" width="40px" style={{ borderRadius: '50%' }} />
                    <input type="file" onChange={(e) => this.onupload(e)} name="img" style={{ visibility: 'hidden' }} />
                         
                    </label>
                    </div>
                    <div class="col-8 edit-username">
                       <h1> {sessionStorage.getItem('username')}</h1>
                       <label style={{ cursor:'pointer',width:'200px',height:'25px'}} >
                  
                       <p className="pr">Change Profile Photo</p>
                       <input type="file" class="up" onChange={(e) => this.onupload(e)} style={{ visibility: 'hidden' }} />
                   
                   
                       </label>
                    </div>
                </div>
                <div class="">
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-3 this">
                                <label>Name</label>
                            </div>
                            <div class="col-8">
                                <input class="in" type="text" name="name" placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.onChangeName} />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-3 this">
                                <label>Username</label>
                            </div>
                            <div class="col-8">
                                <input class="in" type="text" name="username" placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername} disabled/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-3 this">
                                <label>Website</label>
                            </div>
                            <div class="col-8">
                                <input class="in" type="text" name="website" placeholder="Website"
                                    value={this.state.website}
                                    onChange={this.onChangeWebsite} />
                                <p>Don't Enter http or https just enter website name ex. google.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-3 this">
                                <label>Bio</label>
                            </div>
                            <div class="col-8">
                                <textarea class="int" type="text" name="bio" rows="3" cols="50" placeholder="Enter bio"
                                    value={this.state.bio}
                                    onChange={this.onChangeBio} />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-3 this">
                                <label>Email</label>
                            </div>
                            <div class="col-8">
                                <input class="in" type="text" name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail} disabled />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-3 this">
                                <label>Phone Number</label>
                            </div>
                            <div class="col-8">
                                <input class="in" type="text" name="email" placeholder="Phone Number"
                                    value={this.state.phone}
                                    onChange={this.onChangePhone} />
                            </div>
                        </div>
                    </div>
                    {/* <div class="form-group">
                        <label>Gender</label>
                        <select name="gender" id="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div> */}
                    <div class="row">
                        <div class="col-3"></div>

                        <div class="col-8">
                            <button type="submit" style={{ color: '#fff', fontWeight: '500', background: '#0095F6', height: '32px', fontSize: '14px' }} class="btn btn-primary">Submit</button>
                        </div>
                    </div>

                </form>
                </div>
            </div>
        )
    }
}
