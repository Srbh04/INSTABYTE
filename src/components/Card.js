import React, { Component } from 'react';
import axios from 'axios';
import "./card.css"
import {
    BrowserRouter as
        Router, Link, Switch, Route
} from "react-router-dom";
export default class Card extends Component {
    constructor(props) {
        super(props);
        this.onChangeComment=this.onChangeComment.bind(this);
        // console.log("ii"+this.props.item.username)
        this.state = {
            dp:this.props.item.dp,
            id: this.props.item.id,
            user:this.props.username,
            newid:this.props.item.id.toString(),
            email: this.props.item.email,
            name: this.props.item.name,
            location: this.props.item.location,
            caption: this.props.item.caption,
            status: this.props.item.status,
            lable:this.props.item.lable,
            count: parseInt(this.props.item.count),
            comments:[],
            comment:'',
            actualcomments:[],
            flag:1,

        }
        // console.log(this.state.image);
    }
    onChangeComment = e =>
    {
        this.setState({
            comment:e.target.value,
            newflag:1
        });
        
    }
    componentDidMount=()=>{
        const obj={
            postid:this.state.id
        }
        axios.post('http://localhost/ram/fetch_comment.php',obj)
        .then((response)=>{
            console.log(response.data);
            let len=response.data.length;
            if(len>2)
            {
                this.setState({actualcomments:[
                    response.data[len-2],response.data[len-1]]});
            }
            else{
                this.setState({
                    actualcomments:response.data
                })
            }
            this.setState({
                comments:response.data
            })
           
        })
       .catch(err => console.log(err));
       //  console.log(obj);
       
    }
    onlike = () => {
        console.log("sd")

        const formData = new FormData();
        formData.append('email', sessionStorage.getItem('email'));
        formData.append('id', this.state.id);
        axios.post('http://localhost/ram/likes.php', formData)
            .then((response) => {
                this.setState({ status: 1 })
                this.setState({ count: this.state.count + 1 })

            })
            .catch(err => console.log(err));
        //  console.log(obj);
    }
    onunlike = () => {
        console.log("sd")

        const formData = new FormData();
        formData.append('email', sessionStorage.getItem('email'));
        formData.append('id', this.state.id);
        axios.post('http://localhost/ram/unlike.php', formData)
            .then((response) => {
                this.setState({ status: null })
                this.setState({ count: this.state.count - 1 })

            })
            .catch(err => console.log(err));
        //  console.log(obj);
    }
    postComment=()=>{
        
        const obj = {
            email:sessionStorage.getItem('email'),
            postid : this.state.id,
            username:sessionStorage.getItem('username'),
            comment:this.state.comment,
            
        };
     
        axios.post('http://localhost/ram/post_comment.php',obj)
        .then( (response)=>{
            console.log( document.getElementById(this.state.newid).value);
            let tmp=this.state.comment;
           
            this.setState({
                comments:[...this.state.comments,{
                    email:sessionStorage.getItem('email'),
                    postid : this.state.id,
                    username:sessionStorage.getItem('username'),
                    comment:tmp,
                    date:response.date,
                    moments:'just now'
                }]
            })
           
            let temp=this.state.actualcomments
            if(temp.length>=2)
            temp.splice(0,1)
            this.setState({
                actualcomments:[...temp,{
                    email:sessionStorage.getItem('email'),
                    postid : this.state.id,
                    username:sessionStorage.getItem('username'),
                    comment:tmp,
                    date:response.date,
                    moments:'just now'
                }]
            })
          
            document.getElementById(this.state.newid).value='';
            
             this.setState({comment:''})
        })
       .catch(err => console.log(err));
      
      
    }
    showAll=()=>{
        if(this.state.flag==1){
        this.setState({
            flag:0
        })
    }else
    {
        this.setState({
            flag:1
        })
    }
    }
    newFun=(username)=>{
        sessionStorage.setItem('uniqueusername',username);
        this.props.showProfile()
    }
   
    render() {
        return (
                   <div class="">
                        <div class="card my-4">
                            <div class="card-body">
                                
                            <Link to={{ pathname: (sessionStorage.getItem('username')==this.props.item.username)?'/profile':'/userprofile', state: { username: this.props.item.username} }} style={{textDecoration:'none',color:'#262626'}}> 
                            <span >
                            <img src={require('../' + this.state.dp).default} height="40px" width="40px" style={{ borderRadius: '50%' }} />
                            </span>
                            <span >
                            <span style={{fontSize:'18px',marginLeft:'2%',fontWeight:'600',marginTop:'-10%'}} class="card-title">{this.state.name}</span>
                                <p class="card-text" style={{marginLeft:'9.5%',marginTop:'-3%'}}><small class="text-muted">{this.state.location}</small></p>
                                </span></Link>
                            
                            </div>
                            <div style={{marginTop:'1%'}}>
                            <img class="card-img-bottom" src={require('../images/' + this.props.item.image).default} alt="Card image cap" />
                            </div>
                            <div class="card-body">
                            <div style={{marginTop:'-2%'}}>
                                {
                                    (this.state.status == null) ? (<span onClick={this.onlike} style={{
                                        fontSize: '35px',
                                        cursor: 'pointer',
                                       
                                    }} class="fa fa-heart-o" type="submit"></span>) :
                                        (<span onClick={this.onunlike} style={{
                                            fontSize: '35px',
                                            cursor: 'pointer', color: 'rgb(235, 52, 52)'
                                        }} class="fa fa-heart"
                                        >
                                        </span>)
                                }
                                <span >
                                <svg aria-label="Comment" class="cmnt" fill="#262626" height="38" viewBox="0 0 48 49" width="32">
                                    <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd">
                                    </path></svg>
                                </span>
                                </div>
                                <strong>
                                    <div class="">
                                        {this.state.count} likes
                                    </div>
                                </strong>
                                <div>
                                    <span><b>{this.state.name}</b><span>  {this.state.caption}</span></span>
                                </div>
                                <div>
                                    {
                                       (this.state.flag==1)?
                                            
                                                 (<p style={{cursor:'pointer',color:'grey'}} onClick={this.showAll}>view all comments</p>)
                                            
                                           
                                            
                                                : (<p style={{cursor:'pointer',color:'grey'}} onClick={this.showAll}>hide comments</p>)
                                            
                                        
                                    }
                                  
                                    {
                                        (this.state.flag==1)?
                                            
                                               this.state.actualcomments.map((com)=>{
                                                    return (<div style={{width:'100%'}}><span onClick={()=>this.newFun(com.username)} style={{fontWeight:'700'}}>{com.username}  </span>
                                                    <span> {com.comment}</span>
                                                     <span class="time"> {com.moments} ago</span></div>)
                                                })
                                            
                                            :
                                                this.state.comments.map((com)=>{
                                                    return (<div style={{width:'100%'}}><span style={{fontWeight:'700'}}>{com.username}  </span>
                                                    <span> {com.comment}</span>
                                                   <span class="time"> {com.moments} ago</span></div>)
                                                })

                                    }
                                    <span class="posttime">2 DAYS AGO</span>

                                    {/* <form onSubmit={(e)=>{
                                        e.preventDefault();
                                    }}> */}
                                    <div class="input-group mt-3 cmt">
                                        <input id={this.state.newid} type="text" class="form-control comment" style={{background:'#fff'}} onChange={this.onChangeComment} placeholder="Add a comment..." />
                                        <button onClick={this.postComment} class="post"  style={{opacity:(this.state.comment.length==0)?'0.4':'1'}}
                                        disabled={(this.state.comment.length==0)?true:false}>Post</button>
                                           </div>
                                           {/* </form> */}
                                    </div>

                                </div>

                            </div>
                          
                        </div>
                      
                )
    }
}
