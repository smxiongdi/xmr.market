import React from 'react';
import Recaptcha from 'react-gcaptcha';

import { registerUser } from '../.././redux/actions/actions';

class Register extends React.Component {

    constructor() {
        super();

        this.state = {
            inputEmail: '',
            inputPass: '',
            message: '',
            captcha: false,
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showTempMessage = this.showTempMessage.bind(this);
        this.handleRecaptcha = this.handleRecaptcha.bind(this);

    }

    handleEmailChange (evt) {
        this.setState({inputEmail: evt.target.value});
    }

    handlePassChange (evt) {
        this.setState({inputPass: evt.target.value});
    }

    handleRecaptcha (key) {
        this.setState({captcha: true});
    }

    handleSubmit (evt) {
        evt.preventDefault();

        if(this.state.inputEmail && this.state.inputPass.length >=4) {
            const newUser = {uname: this.state.inputEmail, upass: this.state.inputPass};
            this.state.captcha ? this.props.dispatch(registerUser(newUser)) : '';
            this.setState({captcha: false});
            // should redirect
        } else if(!this.state.inputEmail) {
            this.setState({message: 'Please enter e-mail'});
        } else { this.setState({message: 'Password too short'}) }
    }

    showTempMessage (msg) {
        setTimeout(() => this.props.history.push('/', 1000));
    }

    render () {
        this.props.username ? this.showTempMessage() : ''

        return (

            <div className="auth-page">
                <h2 className="display-4">{this.props.title}</h2>
                <form>
                        <div className="form-group inputfield">
                            <label htmlFor="inputEmail">E-mail</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Your e-mail here" onChange={this.handleEmailChange} value={this.state.inputEmail}/>
                            <small id="emailHelp" className="form-text text-muted">Your e-mail is kept private. We don't sell your information.</small>
                        </div>

                        <div className="form-group inputfield">
                            <label htmlFor="inputPass">Password</label>
                            <input type="password" className="form-control" id="inputPass" placeholder="xxxxxxxx" onChange={this.handlePassChange} value={this.state.inputPass}/>
                            <small id="passHelp" className="form-text text-muted">Don't worry. We aren't storing your password in plaintext.</small>
                        </div>

                <Recaptcha
                    sitekey="6LeGAD0UAAAAAHxEorgSZxhlgHAeAOL2AWFJNn4c"
                    verifyCallback={this.handleRecaptcha}
                    theme="light"
                />

                <div className="auth-button">
                    <button className="btn btn-outline-success" onClick={this.handleSubmit}>Register</button>
                </div>

            </form>

            {this.state.message}

        </div>

        )
    }
}

export default Register;
