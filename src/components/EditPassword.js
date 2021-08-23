import React, { Component } from 'react'
import axios from 'axios';
import EditNav from './EditNav';
import "./editpassword.css"
export default class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',

        }
    }
    onChangeOldPassword = e => {
        this.setState({
            oldpassword: e.target.value
        });
    }
    onChangeNewPassword = e => {
        this.setState({
            newpassword: e.target.value
        });
    }
    onChangeConfirmPassword = e => {
        this.setState({
            confirmpassword: e.target.value
        });
    }
    onSubmit(e)
    {
        e.preventDefault();
      
        const obj = {
            email:sessionStorage.getItem('email'),
            oldpassword:this.state.oldpassword,
            newpassword:this.state.newpassword,
            confirmpassword:this.state.confirmpassword,
        };
        if(obj.newpassword!=obj.confirmpassword)
        alert('password not matching')
        else{
        axios.post('http://localhost/ram/update_password.php',obj)
        .then( (response)=>{
            console.log(response.data[0].Message);
            if(response.data[0].Message=="true")
            {
              //  console.log("srbh")
           
                alert('update successfully')
                this.setState({
                    oldpassword:'',
                    confirmpassword:'',
                    newpassword:'',
                })
            //  this.refreshPage();
            }
            else{
                alert('Please enter correct password')
            }
        })
       .catch(err => console.log(err));
    }
    }
    render() {
        return (
            <div style={{padding:'5%'}}>
                    <div class="row">
                    {/* <div class="col-1"></div> */}
                    <div class="col-3 this">
                        <span>
                    <img src={require('../' +sessionStorage.getItem('dp')).default} height="40px" width="40px" style={{ borderRadius: '50%' }} />
                    </span>
                    </div>
                    <div class="col-8 edit-username">
                       <h1> {sessionStorage.getItem('username')}</h1>
                    </div>
                </div>
                <div class="mt-4">
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <div class="row">
                            {/* <div class="col-1"></div> */}
                            <div class="col-3">
                            <label>Old Password</label>
                            </div>
                            <div class="col-8">
                            <input class="input-password" type="text" name="name"
                            value={this.state.oldpassword}
                            onChange={this.onChangeOldPassword} required/>
                 
                            </div>
                            {/* <div class="col-1"></div> */}
                        </div>
                      
                          </div>
                    <div class="form-group">
                    <div class="row">
                    <div class="col-3">
                        <label>New Password</label>
                        </div>
                        <div class="col-8">
                        <input class="input-password" type="text" name="username"
                            value={this.state.newpassword}
                            onChange={this.onChangeNewPassword} required
                            />
                             </div>
                    </div>
                    </div>
                    <div class="form-group">
                    <div class="row">
                    <div class="col-3">
                        <label>Confirm Password</label>
                        </div>
                        <div class="col-8">
                        <input class="input-password" type="text" name="email"
                            value={this.state.confirmpassword}
                            onChange={this.onChangeConfirmPassword} required/>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-3"></div>
                    <div class="col-8">
                      <button type="submit" style={{color:'#fff',fontWeight:'500',background:'#0095F6',height:'35px',fontSize:'14px'}} class="btn btn-primary">Change Password</button>
                      </div>
                    </div>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}
