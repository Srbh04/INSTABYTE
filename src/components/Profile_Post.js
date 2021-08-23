import React, { Component } from 'react'
import "./profile_post.css"
export default class Profile_Post extends Component {
    constructor(props)
    {
        super(props);
        console.log(this.props.item.image)
        this.state={
            image:this.props.item.image
        }
       
    }
    render() {
        return (
        <div class="photosGrid">
            <img href="#" title="Photo 1" class="photosGrid__Photo"
            src={require('../images/'+this.state.image).default}></img>   
            {/* <h1>{this.state.image}</h1> */}
            </div>
    
           
        )
    }
}
