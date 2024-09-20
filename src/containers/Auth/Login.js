import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  userService  from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            IsShowPassword: false
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        // console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value)
    }
    handleLogin = async () =>{
        console.log('username:',  this.state.username)
        console.log('password:',  this.state.password)
        await userService.handleLogin(this.state.username, this.state.password)
    }
    handleShowHidePassword = () => {
        this.setState({
            IsShowPassword: !this.state.IsShowPassword
        })
    }


    render() {
        return (
            <div className='login-background'>
                 <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>User Name: </label>
                            <input type='text' className='form-control' 
                                        placeholder='input your username' value={this.state.username} 
                                        onChange={(event) => this.handleOnChangeUsername(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                            <input type={this.state.IsShowPassword ? 'text' : 'password'} className='form-control' 
                                        placeholder='input your password' value={this.state.password} 
                                        onChange={(event) => this.handleOnChangePassword(event)}></input>
                                <span onClick= {() => {this.handleShowHidePassword()}}>
                                <i class={this.state.IsShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}  ></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12'>
                        <button className='col-12  btn-login' onClick={() => {this.handleLogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'> Or Login With</span>
                        </div>
                        <div className='col-12 social-login'> 
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
