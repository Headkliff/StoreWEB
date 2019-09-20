import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component {

    constructor() {
        super();

        this.state = {
            nickname: '',
            password: '',
            firstName: '',
            secondName:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            nickname:this.state.nickname,
            password: this.state.password,
            firstName: this.state.firstName,
            secondName: this.state.secondName
        }
        console.log('The form was submitted with the following data:');
        console.log(this.state);

        axios.post('https://localhost:44326/api/Register', user)
        .then(res=>{
            localStorage.setItem("token",res.data.token)
        })

    }


    render() {
        return (
            <div className='FormCenter'>
                <form className='FormFields' onSubmit={this.handleSubmit}>
                    <div className='FormField'>
                        <label className='FormField__Label' htmlFor='nickname'>Nickname</label>
                        <input type='text' id='nickname' className='FormField__Input' placeholder='Enter your nickname' name='nickname' value={this.state.nickname} onChange={this.handleChange}/>
                    </div>

                    <div className='FormField'>
                        <label className='FormField__Label' htmlFor='password'>Password</label>
                        <input type='password' id='password' className='FormField__Input' placeholder='Enter your password' name='password' value={this.state.password} onChange={this.handleChange} />
                    </div>

                    <div className='FormField'>
                        <label className='FormField__Label' htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' className='FormField__Input' placeholder='Enter your First Name' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
                    </div>

                    <div className='FormField'>
                        <label className='FormField__Label' htmlFor='secondName'>Second Name</label>
                        <input type='text' id='secondName' className='FormField__Input' placeholder='Enter your Second Name' name='secondName' value={this.state.secondName} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
                    </div>
                </form>
            </div>
        )
    }
}
export default SignUpForm