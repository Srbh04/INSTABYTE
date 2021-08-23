import React, { Component } from 'react'
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
import "./navi.css";
import axios from 'axios';
import SearchCard from './searchCard';
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dp: sessionStorage.getItem('dp'),
            displaysearch: 'none',
            keyword:'',
            displaynotification:'none',
            searchlist: [
            ]
        }
    }
    Search=(e)=>{
        this.setState({
            keyword:e.target.value
        })
        const obj = {
            keyword:e.target.value,
        }
        axios.post('http://localhost/ram/search.php',obj)
        .then( (response)=>{
            console.log(response.data);
            this.setState({searchlist:response.data})
        })
       .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <header>
                    <div class="hom-top-nav" >
                        <div class="home-top-nav-icon">
                            <div class="home-top-nav-logo" style={{ marginTop: '10px' }}>
                                <Link to={'/home'}><img src={require('../profile/logo.png').default} 
                                onClick={() => { this.setState({ displaysearch: 'none',displaynotification:'none' }) }}
                                alt="home" /></Link>
                            </div>
                        </div>

                        {/* <div class="home-top-nav-icon">
                            <div class="home-top-nav-search">
                                <input onClick={() => { this.setState({ displaysearch: 'block',displaynotification:'none' }) }} onChange={this.Search} style={{ height: '30px', width: '220px', padding: '5px', background: '#fafafa', fontSize: '14px', fontWeight: '200' }} type="text" placeholder='Search' />
                            </div>
                        </div> */}

                        <div class="home-top-nav-icon">
                            <div class="home-top-nav-icon-inside">
                                <div class="home-top-nav-icons">
                                    <Link to={'/home'} class="fill active" href=""><img src={require('../profile/home.png').default} alt="home"
                                    onClick={() => { this.setState({ displaysearch: 'none',displaynotification:'none'  }) }} /></Link>
                                </div>
                                <div class="home-top-nav-icons">
                                    <a class="outline" href=""><img src={require('../profile/messanger.png').default} alt="home" 
                                    onClick={() => { this.setState({ displaysearch: 'none',displaynotification:'none'  }) }}/></a>
                                </div>
                                <div class="home-top-nav-icons">
                                    <Link to={'/post'} class="fill active" href=""><svg aria-label="New Post" class="_8-yf5 " fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path><path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path><path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path></svg></Link>
                                </div>
                                <div class="home-top-nav-icons">
                                    <span class="outline" href=""><i class="fa fa-heart-o" style={{ color: '#000', fontSize: '21px', marginTop: '10%' }} onClick={() => { this.setState({ displaynotification: 'block',displaysearch:'none' }) }}
                                    aria-hidden="true"></i></span>
                                </div>
                                <div class="home-top-nav-icons">
                                    <Link to={'/profile'} class="outline" href=""><img src={require('../profile/pro.png').default}
                                    onClick={() => { this.setState({ displaysearch: 'none',displaynotification:'none'  }) }} alt="home" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                
                <div class="outer" style={{ display: this.state.displaynotification }} onClick={() => { this.setState({ displaynotification: 'none' }) }}>
                    <div class="notification"> 
                        <h1>dsd</h1>
                    </div>
                </div>
                {this.props.children}
                {/* <footer>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Navbar</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div class="navbar-nav">
                                    <Link class="nav-link active" aria-current="page" to={'/home'}>Home</Link>
                                    <Link class="nav-link" to={'/search'}>Search</Link>
                                    <Link class="nav-link" to={'/post'}>Post</Link>
                                    <Link class="nav-link" to={'/profile'} >Profile</Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </footer> */}
            </div>
        )
    }
}
