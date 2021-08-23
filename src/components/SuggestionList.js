import React, { Component } from 'react'
import axios from 'axios';
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
import "./suggestionlist.css"
export default class SuggestionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[]
        }
    }
    componentDidMount = () => {
        const obj1 = {
            who: sessionStorage.getItem('username')
        }
        axios.post('http://localhost/ram/fetchusers.php',obj1)
        .then((response) => {
            console.log("data here")
            console.log(response.data);
            this.setState({ users: response.data });
            
        })
        .catch(err => console.log(err));
    }
    follow=(username,index)=>{ 
        const obj = {
            who:sessionStorage.getItem('username'),
            whom:username,
        }
        axios.post('http://localhost/ram/follow.php',obj)
        .then((response)=>{
            console.log(response.data);
            let s=this.state.users
            s[index].text="follow"
            this.setState({users:s})
            sessionStorage.setItem('followcount',parseInt(sessionStorage.getItem('followcount'))+1)
            
        })
       .catch(err => console.log(err));
       }
       unfollow=(username,index)=>{
        const obj = {
            who:sessionStorage.getItem('username'),
            whom:username,
        }
        axios.post('http://localhost/ram/unfollow.php',obj)
        .then( (response)=>{
            console.log(response.data);
            let s=this.state.users
            s[index].text="unfollow"
            this.setState({users:s})
            sessionStorage.setItem('followcount',parseInt(sessionStorage.getItem('followcount'))-1)
        })
       .catch(err => console.log(err));
       }
    render() {
        return (
            <div style={{background:'#fafafa'}}>
                <div class="container">
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-6 list">
                        <h4>Suggested</h4>
                            <div class="suggestion-card">
                                
                                {
                                this.state.users.map((item,index)=>{
                                    if(item.email!=sessionStorage.getItem('email')){
                                    return (
                                        <div class="sug-list mt-2">
                                              <div  class="tit">
                                             <span style={{cursor:'pointer'}}><img src={require('../' + item.dp).default} height="40px" width="40px" style={{ borderRadius: '50%' }} />
                                             </span>
                                             <Link to={{ pathname: '/userprofile', state: { username: item.username} }} style={{textDecoration:'none',color:'#262626'}}>
                                                 <span class="user" >{item.username}
                                                 </span>
                                                 <div className="nam">{item.name}</div>
                                                 
                                              
                                             </Link> 
                                             </div>
                                             {/* <span class="follow-btn" style={{cursor:'pointer',float:'right'}}>Follow</span> */}

                                             {  (item.text==="follow")?
                                                    <span class="follow-btn" style={{cursor:'pointer',float:'right',color:'#262626',background:'#fafafa',   border:'1px solid rgba(var(--ca6,219,219,219),1)',
                                                    borderRadius:'4px'}} onClick={()=>this.unfollow(item.username,index)}>Following</span>:
                                                    <span class="follow-btn" style={{cursor:'pointer',float:'right',color:'#fff',background:'#0095F6'}} onClick={()=>this.follow(item.username,index)}>Follow</span>
                                           }
                                        </div>
                                    
                                    ) }
                                })
                            }
                            </div>
 
                        </div>
                        <div class="col-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}
