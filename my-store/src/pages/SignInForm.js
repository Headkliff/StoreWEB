import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { allResolved } from 'q';


class SignInForm extends Component {
    constructor(){
        super();
        this.state ={
            nickname :'',
            password : ''
        };   

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        let target = e.target
        let value = target.type ==='checkbox' ? target.checked :target.value
        let name = target.name

        this.setState({
            [name]:value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            nickname:this.state.nickname,
            password: this.state.password
        }
        console.log('The form was submitted with the following data:');
        console.log(this.state);

        axios.post('https://localhost:44326/api/Login', user)
        .then(res=>{
            localStorage.setItem("token", res.data.token)
        }).catch(function (error) {
            if (error == 401){
                alert("You are not exist")
            }
          });

    }

    render() {
        return (
            <div className='FormCenter'>
                <form onSubmit={this.handleSubmit} className='FormFields' onSubmit={this.handleSubmit}>
                    <div className='FormField'>
                        <label className='FormField__Label' htmlFor='nickname'>Nickname</label>
                        <input type='text' id='nickname' className='FormField__Input' placeholder='Enter your nickname' name='nickname' value = {this.state.nickname} onChange={this.handleChange}/>
                    </div>

                    <div className='FormField'>
                        <label className='FormField__Label' htmlFor='password'>Password</label>
                        <input type='password' id='password' className='FormField__Input' placeholder='Enter your password' name='password' value ={this.state.password} onChange={this.handleChange}/>
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign In</button> <Link to="/sign-up" className="FormField__Link">Create an account</Link>
                    </div>
                </form>
            </div>
        )
    }
}
export default SignInForm