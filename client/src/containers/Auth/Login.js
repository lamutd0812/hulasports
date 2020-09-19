import React, { Component } from 'react';
import { NavLink, Redirect, Link } from 'react-router-dom';
import { updateObject, checkValidity } from '../../util/utility';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/authActions';

class Login extends Component {

    state = {
        controls: {
            email: {
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    inputChangeHandler = (event) => {
        let controlName = event.target.name;
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    };

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value);
    };

    render() {
        
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to="/" />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ fontStyle: 'italic', color: 'red' }}>{this.props.error}</p>
            );
        }

        return (
            <div>
                {authRedirect}
                <div className="breacrumb-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb-text">
                                    <NavLink to="/"><i className="fa fa-home"></i> Home</NavLink>
                                    <span>Login</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="register-login-section spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="login-form">
                                    <h2>Trang đăng nhập</h2>
                                    <form onSubmit={this.formSubmitHandler}>
                                        <div className="group-input">
                                            <label htmlFor="username">Username or email address *</label>
                                            <input type="text"
                                                name="email"
                                                className={!this.state.controls.email.valid && this.state.controls.email.touched ? "form-input-error" : "form-input"}
                                                defaultValue={this.state.controls.email.value}
                                                onChange={this.inputChangeHandler} />
                                            {!this.state.controls.email.valid && this.state.controls.email.touched ?
                                                <p>Please enter a valid email!</p> : null}
                                        </div>
                                        <div className="group-input">
                                            <label htmlFor="pass">Password *</label>
                                            <input type="password"
                                                name="password"
                                                className={!this.state.controls.password.valid && this.state.controls.password.touched ? "form-input-error" : "form-input"}
                                                defaultValue={this.state.controls.password.value}
                                                onChange={this.inputChangeHandler} />
                                            {!this.state.controls.password.valid && this.state.controls.password.touched ?
                                                <p>Please enter a valid password!</p> : null}
                                        </div>
                                        <div className="group-input gi-check">
                                            <div className="gi-more">
                                                <label htmlFor="save-pass">
                                                    Save Password
                                                    <input type="checkbox" id="save-pass" />
                                                    <span className="checkmark"></span>
                                                </label>
                                                <NavLink to="/reset" className="forget-pass">Forget your Password</NavLink>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="site-btn login-btn"
                                            disabled={!this.state.formIsValid}>Sign In</button>
                                    </form>
                                    <div className="switch-login">
                                        {errorMessage}
                                        <Link to="/register" className="or-login">Or Create An Account</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = {
    onAuth: auth
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);