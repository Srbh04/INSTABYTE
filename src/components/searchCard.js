import React, { Component } from 'react'
import "./searchcard.css";
import { Redirect, useHistory, withRouter ,Link} from 'react-router-dom';
export default class searchCard extends Component {
    constructor(props) {
        super(props);
        
     
        this.state = {
            
            image: this.props.image,
            name:this.props.name,
            username:this.props.username,
            email:this.props.email
        }
    }
 
   
    render() {
        return (
            <div>
                <div class="searchcard mt-1">
                <span className="image" style={{ }}>
                  <img src={require('../' + this.state.image).default} height="43px" width="43px" style={{ borderRadius: '50%'}} /> 
                </span>
                <span className="names">
                <h6>{this.state.name}</h6>
                <p>{this.state.username}</p></span>
                </div>
            </div>
        )
    }
}
