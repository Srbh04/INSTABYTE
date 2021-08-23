import React, { Component } from 'react'
import axios from 'axios';
import {
    BrowserRouter as
        Router, Link, Switch, Route, Redirect
} from "react-router-dom";
import SearchCard from './searchCard';
import "./post.css"
import Profile from './Profile';
export default class Post extends Component {
    constructor(props) {
        super(props);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            img: 'profile.png',
            email: sessionStorage.getItem('email'),
            location: '',
            caption: '',
            displaysearch: 'none',
            keyword: '',
            displaynotification: 'none',
            searchlist: [
            ]

        }
    }
    onChangeLocation = e => {
        this.setState({
            location: e.target.value
        });
    }
    onChangeCaption = e => {
        console.log(this.state.email)
        this.setState({
            caption: e.target.value
        });
    }
    onChangeImg = e => {
        console.log(e.target.files[0])
        this.setState({
            img: e.target.files[0]
        });
    }
    refreshPage = () => {
        this.setState({ img: 'profile.png', location: '', caption: '' })
    }
    onSubmit() {
        const formData = new FormData();
        formData.append('img', this.state.img, this.state.img.name);
        formData.append('email', this.state.email);
        formData.append('location', this.state.location);
        formData.append('caption', this.state.caption);
        axios.post('http://localhost/ram/image.php', formData)
            .then((response) => {
                console.log(response.data.response);

                this.refreshPage();

            })
            .catch(err => console.log(err));
        //  console.log(obj);

    }
    Search = (e) => {
        this.setState({
            keyword: e.target.value
        })
        const obj = {
            keyword: e.target.value,
        }
        axios.post('http://localhost/ram/search.php', obj)
            .then((response) => {
                console.log(response.data);
                this.setState({ searchlist: response.data })
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <div class="home-top-nav-icon mt-5">
                    <div class="home-top-nav-search">
                        <input onClick={() => { this.setState({ displaysearch: 'block', displaynotification: 'none' }) }} onChange={this.Search} style={{ height: '30px', width: '220px', padding: '5px', background: '#fafafa', fontSize: '14px', fontWeight: '200' }} type="text" placeholder='Search' />
                    </div>
                </div>
                <div class="outerbox" style={{ display: this.state.displaysearch }} onClick={() => { this.setState({ displaysearch: 'none' }) }}>
                    {/* <div class="searchtip"></div> */}
                    <div class="searchbox">
                        {
                            (this.state.searchlist.length > 0) ? this.state.searchlist.map((item) => {
                                return <Link to={{ pathname: '/userprofile', state: { username: item.username } }}><SearchCard username={item.username} name={item.name} image={item.image} email={item.email} /></Link>
                            }) : (<div class="no-result">
                                <center> <p style={{}} class="">No results found.</p></center></div>)
                        }
                    </div>
                </div>
                <div class="post-card">
                <div class="row">
               
                    <div class="col-sm-2"></div>
                   
                        <div class="col-sm-3">
                        {/* <img src={require('../' + this.state.img).default} height="150px" width="150px" style={{ borderRadius: '50%' }} /> */}
                              
                        {/* <label style={{ cursor:'pointer', width: '150px', height: '60px',marginTop:'70%',marginLeft:'-20%',background:'#f5f5f5'}}>                 
                                 <i style={{ width: '150px', height: '60px'}} ></i>
                                <input type="file" onChange={(e) => this.onChangeImg(e)} name="img" style={{ visibility: 'hidden' }}/>
                       
                            </label> */}

                            <label style={{ cursor:'pointer', width: '150px', height: '150px', borderRadius: '50%',marginTop:'70%'}}>                 
                                <i class="fa fa-plus fa-lg" style={{height:'150px', width:'150px' ,borderRadius: '50%' }} />
                                <input type="file" onChange={(e) => this.onChangeImg(e)} name="img" style={{ visibility: 'hidden' }} />
                            </label>
                           </div>
                        <div class="col-sm-4">
                            <input type="text" class="inpu"
                                value={this.state.location}
                                onChange={this.onChangeLocation}
                                placeholder="Enter location.." name="location" />
                           <br/> <br/>
                            <input type="text" class="inpu"
                                value={this.state.caption}
                                onChange={this.onChangeCaption}
                                Placeholder="Enter caption.." name="caption" />
                             <br/> <br/>
                         
                            <button type="submit" onClick={this.onSubmit} style={{ color: '#fff', fontWeight: '500', background: '#0095F6', height: '32px', fontSize: '14px' }} class="btn btn-primary">Upload</button>
                        
                        </div>
                    <div class="col-sm-2"></div>
                 
                </div>

                </div>
            </div>
        )
    }
}
