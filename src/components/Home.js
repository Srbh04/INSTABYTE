import React, { Component } from 'react'
import axios from 'axios';
import Card from './Card';
import "./home.css"
import {
    BrowserRouter as
        Router, Link, Switch, Route, Redirect
} from "react-router-dom";
import SearchCard from './searchCard';
export default class Home extends Component {
    constructor(props) {
        super(props);
        sessionStorage.setItem('currentpath', '/home');
        this.state = {
            detail: [],
            users: [],
            dp: sessionStorage.getItem('dp'),
            displaysearch: 'none',
            keyword: '',
            displaynotification: 'none',
            lable: '',
            searchlist: [
            ]
        }
    }
    componentDidMount = () => {
        const obj = {
            email: sessionStorage.getItem('email'),
            username: sessionStorage.getItem('username')
        }
        axios.post('http://localhost/ram/fetch.php', obj)
            .then((response) => {
                console.log("family" + response.data[0].lable);
                this.setState({ detail: response.data });
                // console.log("sas"+this.state.detail)
            })
            .catch(err => console.log(err));
        //  console.log(obj);

        const obj1 = {
            who: sessionStorage.getItem('username')
        }
        axios.post('http://localhost/ram/fetchusers.php', obj1)
            .then((response) => {
                console.log("data here")
                console.log(response.data);
                this.setState({ users: response.data });

            })
            .catch(err => console.log(err));

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

    follow = (username, index) => {

        const obj = {
            who: sessionStorage.getItem('username'),
            whom: username,
        }
        axios.post('http://localhost/ram/follow.php', obj)
            .then((response) => {
                console.log(response.data);
                let s = this.state.users
                s[index].text = "follow"
                this.setState({ users: s })

            })
            .catch(err => console.log(err));


    }
    unfollow = (username, index) => {
        const obj = {
            who: sessionStorage.getItem('username'),
            whom: username,
        }
        axios.post('http://localhost/ram/unfollow.php', obj)
            .then((response) => {
                console.log(response.data);
                let s = this.state.users
                s[index].text = "unfollow"
                this.setState({ users: s })

            })
            .catch(err => console.log(err));
    }
    changelable = (lable) => {
        this.setState({ lable: lable })
        console.log(lable)
    }
    render() {
        return (
            <div style={{ background: '#fafafa', padding: '.001%' }}>
                <div class="card" style={{ marginLeft: '13.3%', width: '50.5%', marginTop: '5%', height: '90px' }}>
                    <div class="category">
                        <li onClick={() => this.changelable('family')}>
                            <div>
                                <img src={require('../family.png').default} height="63px" width="63px" style={{ borderRadius: '50%' }} />
                                <h6>Family</h6>
                            </div>
                        </li>
                        <li onClick={() => this.changelable('friends')}>
                        <div>
                                <img src={require('../friends1.png').default} height="63px" width="63px" style={{ borderRadius: '50%' }} />
                                <h6>Friends</h6>
                            </div>
                        </li>
                        <li onClick={() => this.changelable('love')}>
                        <div>
                            <img src={require('../love.png').default} height="63px" width="63px" style={{ borderRadius: '50%' }} />
                            <h6>Love</h6>
                            </div>
                        </li>
                        <li onClick={() => this.changelable('work')}>
                            <div>
                               <img src={require('../office.png').default} height="63px" width="63px" style={{ borderRadius: '50%' }} />
                                <h6>Work</h6>
                            </div>
                        </li>
                        <li onClick={() => this.changelable('motivation')}>
                        <div>
                                <img src={require('../inspiration.png').default} height="63px" width="63px" style={{ borderRadius: '50%' }} />
                                <h6>Motivation</h6>
                            </div>
                        </li>
                    </div>
                </div>
                <div class="home-top-nav-icon">
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
                <div class="container">
                    <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-7">
                            {
                                this.state.detail.slice(0).reverse().map((item) => {
                                    if (item.lable == this.state.lable) {
                                        return <Card key={item.id} item={item} />
                                    }
                                })}

                        </div>
                        <div class="col-lg-3" style={{ background: '', marginTop: '-9%' }}>
                            <div style={{ position: 'fixed', }}>
                                <Link to={'/profile'} style={{ cursor: 'pointer', textDecoration: 'none' }} >
                                    <div class="title" >
                                        <span>   <img src={require('../' + sessionStorage.getItem('dp')).default} height="63px" width="63px" style={{ borderRadius: '50%' }} />
                                        </span>
                                        <span class="username">
                                            {sessionStorage.getItem('username')}

                                        </span>
                                        <div class="name">
                                            {sessionStorage.getItem('name')}

                                        </div>
                                        {/* <span style={{marginLeft:'-20%'}}>{sessionStorage.getItem('name')}</span> */}
                                    </div></Link>
                                <div class="suggestion">
                                    <div class="heading">
                                        <span class="suggestionforyou">Suggestions For You</span>
                                        <Link style={{ textDecoration: 'none' }} to={'/suggestion'} class="seeall">See All</Link>
                                    </div>
                                    <div class="suggestion-list mt-1">
                                        {
                                            this.state.users.slice(0, 6).map((item, index) => {
                                                if (item.email != sessionStorage.getItem('email')) {
                                                    return (
                                                        <div class="sug-list mt-2">
                                                            <span style={{ cursor: 'pointer' }}><img src={require('../' + item.dp).default} height="30px" width="30px" style={{ borderRadius: '50%' }} /></span>
                                                            <Link to={{ pathname: '/userprofile', state: { username: item.username } }} style={{ textDecoration: 'none', color: '#262626' }} > <span style={{ cursor: 'pointer', marginLeft: '5%' }}>{item.username}</span></Link>
                                                            {(item.text === "follow") ?
                                                                <span style={{ cursor: 'pointer', float: 'right', fontSize: '12px', color: '#0095F6' }} onClick={() => this.unfollow(item.username, index)}>Following</span> :
                                                                <span style={{ cursor: 'pointer', float: 'right', fontSize: '12px', color: '#0095F6' }} onClick={() => this.follow(item.username, index)}>Follow</span>
                                                            }
                                                        </div>

                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-1"></div>
                    </div>
                </div>

            </div>
        )
    }
}
