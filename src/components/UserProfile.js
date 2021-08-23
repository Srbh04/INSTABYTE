import React, { Component } from 'react'
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
import axios from 'axios'
import Profile_Post from './Profile_Post'
import "./userprofile.css"
import SearchCard from './searchCard';
export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        console.log("now"+this.props.location.state.username)
        this.state = {
            img: '',
            aboutimage: null,
            username:this.props.location.state.username,
            name:'',
            email: '',
            bio:'',
            website:'',
            posts: [],
            len:0,
            followcount:'',
            followercount:'',
            displaysearch: 'none',
            keyword:'',
            displaynotification:'none',
            followcheck:'',
            searchlist: [
            ]
            // uppost:[]
           
        }
    }

    componentDidMount = () => {
        const obj = {
            username: this.state.username,
            currentuser:sessionStorage.getItem('username')
        }
        axios.post('http://localhost/ram/fetchregister.php', obj)
            .then((response) => {
                console.log("->"+response.data.email);
              
                    this.setState({ img: response.data.dp,
                    bio:response.data.bio,
                website:response.data.website,
            email:response.data.email,
        name:response.data.name,
    followcount:response.data.followcount,
followercount:response.data.followercount });    
            })
            .catch(err => console.log(err));


        axios.post('http://localhost/ram/fetchownposts.php', obj)
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



            axios.post('http://localhost/ram/followcheck.php', obj)
            .then((response) => {
                console.log("back",response.data.check)
               this.setState({followcheck:response.data.check})
               console.log("check",this.state.followcheck)
            }).catch(err => console.log(err));

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
        // this.props.history.push( {pathname: "/editpath"});
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

     myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
      }
      follow=()=>{ 
        const obj = {
            who:sessionStorage.getItem('username'),
            whom:this.state.username,
        }
        axios.post('http://localhost/ram/follow.php',obj)
        .then((response)=>{
            console.log(response.data);
            this.setState({followcheck:'true',followercount:this.state.followercount+1})
            sessionStorage.setItem('followcount',parseInt(sessionStorage.getItem('followcount'))+1)
            
        })
       .catch(err => console.log(err));
       }
       unfollow=()=>{
        const obj = {
            who:sessionStorage.getItem('username'),
            whom:this.state.username,
        }
        axios.post('http://localhost/ram/unfollow.php',obj)
        .then( (response)=>{
            console.log(response.data);
            this.setState({followcheck:'false',followercount:this.state.followercount-1})
            
            sessionStorage.setItem('followcount',parseInt(sessionStorage.getItem('followcount'))-1)
        })
       .catch(err => console.log(err));
       }
   
     category=(e)=>{
        const obj = {
            who:sessionStorage.getItem('username'),
            whom:this.state.username,
            lable:e
        }
        axios.post('http://localhost/ram/lable.php',obj)
        .then( (response)=>{
            console.log(response.data);
        })
       .catch(err => console.log(err));
       }
     
    
    render() {
        return (
            <div style={{background:'#fafafa',padding:'1%'}}>
                 
                <div class="container intro-profile">
                    <div class="row">
                        <div class="col-1">      </div>
                        <div class="col-3">
                            <label style={{width: '150px', height: '150px', borderRadius: '50%'}}>                 
                                <img src={require('../' + this.state.img).default} height="150px" width="150px" style={{ borderRadius: '50%' }} />
                                {/* <input type="file" onChange={(e) => this.onupload(e)} name="img" style={{ visibility: 'hidden' }} /> */}
                            </label>
                        </div>
                        <div class="col-7 profile-info">
                            <div class="pro">
                                <h2>{this.state.username}
                                {/* <button class="edit-profile" onClick={this.Edit} style={{outline:'none'}}>Edit Profile</button> */}
                                </h2>
                            </div>
                            <div class="follow">
                                <span><span class="bold">{this.state.len}</span>posts</span>
                                <span><span class="bold">{this.state.followercount}</span>followers</span>
                                <span><span class="bold">{this.state.followcount}</span>following</span>
                            </div>
                            <div class="follow-button">
                          {  (this.state.followcheck=='true')?
                            <span class="follow-btn-profile" style={{cursor:'pointer',color:'#262626',background:'#fff',   border:'1px solid rgba(var(--ca6,219,219,219),1)',
                                                    borderRadius:'4px'}} onClick={()=>this.unfollow()}>Following</span>
                                                    
                                                    
                                                    :
                                                    <span class="follow-btn-profile" style={{cursor:'pointer',color:'#fff',background:'#0095F6',   border:'1px solid rgba(var(--ca6,219,219,219),1)',
                                                    borderRadius:'4px'}} onClick={()=>this.follow()}>Follow</span>
                            }
                                 { 
                                 (this.state.followcheck=='true')?
                                <div class="dropdown">
                                <button onClick={()=>this.myFunction()} class="dropbtn"><i class="fa fa-angle-down" aria-hidden="true"></i></button>
                                <div id="myDropdown" class="dropdown-content">

                                    <li onClick={()=>this.category('family')}>family</li>
                                    <li onClick={()=>this.category('friends')}>friends</li>
                                    <li onClick={()=>this.category('love')}>love</li>
                                    <li onClick={()=>this.category('work')}>work</li>
                                    <li onClick={()=>this.category('motivation')}>motivation</li>
                                </div>
                                </div>  :null
                                }               
                            </div>
                            <div class="name-heading-userprofile">
                                <h1>{this.state.name}</h1>
                            </div>
                            <div class="bio">
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
                               (this.state.followcheck=='true')?
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
                                  
                                }):(null)
                            
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
