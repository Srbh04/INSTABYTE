import React, { Component } from 'react'
import axios from 'axios'
import Profile_Post from './Profile_Post'
import "./profile_post.css"
import SearchCard from './searchCard';
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
export default class Profile extends Component {
    constructor(props) {
        super(props)
        sessionStorage.setItem('currentpath','/profile');
        this.state = {
            img: '',
            username:sessionStorage.getItem('username'),
            aboutimage: null,
            email: '',
            posts: [],
            len:0,
            website:'',
            bio:'',
            followcount:'',
            followercount:'',
            displaysearch: 'none',
            keyword:'',
            displaynotification:'none',
            searchlist: [
            ]
            // uppost:[]
           
        }
    }

    componentDidMount = () => {

        const obj = {
            email: sessionStorage.getItem('email')
        }
        axios.post('http://localhost/ram/fetchprofile_pic.php', obj)
            .then((response) => {
                console.log(response.data.Message);
                if (response.data.Message == "true") {
                    this.setState({ img: response.data.dp });
                    sessionStorage.setItem('dp', response.data.dp);
                    console.log(this.state.img);
                }

            })
            .catch(err => console.log(err));

            const obj1 = {
                username: sessionStorage.getItem('username')
            }
        axios.post('http://localhost/ram/fetchownposts.php', obj1)
            .then((response) => {
                // console.log(response.data);
                // console.log(response.data[1].image);

                // this.setState({
                //     posts: response.data

                // })
                let uppost=[];
                let len=response.data.length;
                this.setState({
                    len:len
                })
                let k=0,i=0;
                let ar=[];
                for( i=1;i<=len;i++)
                {
                    
                    ar=[...ar,response.data[i-1]]
                    if(i%3==0)
                    {
                        uppost=[...uppost,ar];
                        ar=[]   
                    }
                   
                }
                if(ar.length>0)
                uppost=[...uppost,ar];
                // console.log(uppost)
                this.setState({posts:uppost})
            })
            .catch(err => console.log(err));
            const obj2 = {
                username: this.state.username
            }
            axios.post('http://localhost/ram/fetchregister.php', obj2)
                .then((response) => {
                    console.log("->"+response.data.email);
                  
                        this.setState({ img: response.data.dp,
                        bio:response.data.bio,
                    website:response.data.website,
                email:response.data.email,
            name:response.data.name,
        followercount:response.data.followercount,
    followcount:response.data.followcount });    
                })
                .catch(err => console.log(err));

    }
   
    refreshPage = () => {
        window.location.reload();
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
    Edit = () => {
        this.props.history.push( {pathname: "/editpath"});
        console.log("sd")
        // window.location.href = '/editpath';
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
            <div  style={{background:'#fafafa',padding:'1%'}}>
                  <div class="home-top-nav-icon">
                            <div class="home-top-nav-search1">
                                <input onClick={() => { this.setState({ displaysearch: 'block',displaynotification:'none' }) }} onChange={this.Search} style={{ height: '30px', width: '220px', padding: '5px', background: '#fafafa', fontSize: '14px', fontWeight: '200' }} type="text" placeholder='Search' />
                            </div>
                        </div>
                        <div class="outerbox" style={{ display: this.state.displaysearch }} onClick={() => { this.setState({ displaysearch: 'none' }) }}>
                    {/* <div class="searchtip"></div> */}
                    <div class="searchbox">
                        {
                            (this.state.searchlist.length>0)? this.state.searchlist.map((item) => {
                                return  <Link to={{ pathname: '/userprofile', state: { username: item.username} }}><SearchCard  username={item.username} name={item.name} image={item.image} email={item.email} /></Link>
                            }):(<div class="no-result">
                               <center> <p style={{}}class="">No results found.</p></center></div>)
                           
                        }
                      
                    </div>
                </div>
                <div class="container intro-profile" >
                    <div class="row">
                        <div class="col-1">      </div>
                        <div class="col-3">
                            <label style={{ cursor:'pointer', width: '150px', height: '150px', borderRadius: '50%'}}>                 
                                <img src={require('../' + this.state.img).default} height="150px" width="150px" style={{ borderRadius: '50%' }} />
                                <input type="file" onChange={(e) => this.onupload(e)} name="img" style={{ visibility: 'hidden' }} />
                            </label>
                        </div>
                        <div class="col-7 profile-info">
                            <div class="pro">
                                <h2>{this.state.username}
                                <button class="edit-profile" onClick={this.Edit} style={{outline:'none'}}>Edit Profile</button>
                                </h2>
                            </div>
                            <div class="follow">
                                <span><span class="bold">{this.state.len}</span>posts</span>
                                <span><span class="bold">{this.state.followercount}</span>followers</span>
                                <span><span class="bold">{this.state.followcount}</span>following</span>
                            </div>
                            <div class="name-heading">
                                <h1>{this.state.name}</h1>
                            </div>
                            <div class="bios">
                            <p>{this.state.bio}</p>
                            </div>
                            <div class="website">
                            <a href={'//' + this.state.website} target='_blank'>{sessionStorage.getItem('website')}</a><br />
                            </div>
                         </div>
                        <div class="col-1">      </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10">

                            <main>
                                <ul class="navigationList">
                                    <li class="navigationItem">
                                        <button class="navigationItem__Button">
                                            <svg aria-label="Posts" class="navigationItem__Icon" fill="#262626" viewBox="0 0 48 48">
                                                <path clip-rule="evenodd"
                                                    d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                                                    fill-rule="evenodd"></path>
                                            </svg>
                                            <p class="navigationItem__Text">POSTS</p>
                                        </button>
                                    </li>
                                </ul>
                            </main>
                            {/* {this.allign} */}
                            <div className="allpost">
                            {
                               
                                this.state.posts.map((item) => {
                                //    console.log(item[0][0]+"fd")
                                    // return <img src={require('../images/' + item.image).default} height="100px" width="auto" />
                                    if(item.length==1)
                                    {
                                        return (
                                        <div class="photosGrid">
                                        <img href="#" title="Photo 1" class="photosGrid__Photo"
                                        src={require('../images/'+item[0].image).default}></img>   
                                        {/* <h1>{this.state.image}</h1> */}
                                        </div>
                                        )
                                    }
                                   else if(item.length==2)
                                    {
                                        return (
                                            <div class="photosGrid">
                                            <img href="#" title="Photo 1" class="photosGrid__Photo"
                                            src={require('../images/'+item[0].image).default}></img>   

                                            <img href="#" title="Photo 1" class="photosGrid__Photo"
                                            src={require('../images/'+item[1].image).default}></img>   
                                            {/* <h1>{this.state.image}</h1> */}
                                            </div>
                                            
                                        )
                                    }
                                    else{
                                    return (
                                        <div class="photosGrid">
                                        <img href="#" title="Photo 1" class="photosGrid__Photo"
                                        src={require('../images/'+item[0].image).default}></img>   

                                        <img href="#" title="Photo 1" class="photosGrid__Photo"
                                        src={require('../images/'+item[1].image).default}></img>  
                                         <img href="#" title="Photo 1" class="photosGrid__Photo"
                                        src={require('../images/'+item[2].image).default}></img>   
                                        {/* <h1>{this.state.image}</h1> */}
                                        </div>
                                    )
                                    }
                                  
                                })
                            
                            }
                            </div>
                        </div>
                        <div class="col-1"></div>
                    </div>
                </div>
            </div>
        )
    }
}




