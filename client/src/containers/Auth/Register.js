import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { updateObject, checkValidity } from '../../util/utility';
import { register, resetRegisterState } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

class Register extends Component {

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
            },
            confirm_password: {
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
            },
            fullname: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isModalOpen: false
    }

    componentDidMount() {
        this.props.onResetRegisterState();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.isSignedUp) {
            this.setState(updateObject(this.state, { isModalOpen: true }));
        }
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

        let passwordEquals = true;
        if (updatedControls['password'].value !== updatedControls['confirm_password'].value) {
            passwordEquals = false;
        }

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid && passwordEquals
        });
    };

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onRegister(this.state.controls.email.value,
            this.state.controls.password.value, this.state.controls.fullname.value);
    };

    closeModalHandler = () => {
        this.setState(updateObject(this.state, { isModalOpen: false }));
        this.props.onResetRegisterState();
        this.props.history.push('/login');
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ fontStyle: 'italic', color: 'red' }}>{this.props.error}</p>
            );
        }

        return (
            <Aux>
                <div>
                    <div className="breacrumb-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="breadcrumb-text">
                                        <NavLink to="/"><i className="fa fa-home"></i> Home</NavLink>
                                        <span>Register</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="register-login-section spad">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <div className="register-form">
                                        <h2>Register</h2>
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
                                            <div className="group-input">
                                                <label htmlFor="confirm-pass">Confirm Password *</label>
                                                <input type="password"
                                                    name="confirm_password"
                                                    className={!this.state.controls.confirm_password.valid && this.state.controls.confirm_password.touched ? "form-input-error" : "form-input"}
                                                    defaultValue={this.state.controls.confirm_password.value}
                                                    onChange={this.inputChangeHandler} />
                                                {!this.state.controls.confirm_password.valid && this.state.controls.confirm_password.touched ?
                                                    <p>Please enter a valid password!</p> : null}
                                                {this.state.controls.password.value !== this.state.controls.confirm_password.value
                                                    && this.state.controls.confirm_password.touched ?
                                                    <p>Password must be equal!</p> : null}
                                            </div>
                                            <div className="group-input">
                                                <label htmlFor="fullname">Fullname *</label>
                                                <input type="text"
                                                    name="fullname"
                                                    className={!this.state.controls.fullname.valid && this.state.controls.fullname.touched ? "form-input-error" : "form-input"}
                                                    defaultValue={this.state.controls.fullname.value}
                                                    onChange={this.inputChangeHandler} />
                                                {!this.state.controls.fullname.valid && this.state.controls.fullname.touched ? (
                                                    <p>Please enter a valid value!</p>
                                                ) : null}
                                            </div>
                                            <button
                                                type="submit"
                                                className="site-btn register-btn"
                                                disabled={!this.state.formIsValid}>
                                                REGISTER
                                            </button>
                                        </form>
                                        <div className="switch-login">
                                            {errorMessage}
                                            <Link to="/login" className="or-login">Or Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.isModalOpen}
                    message="Đăng ký tài khoản thành công!"
                    modalClosed={this.closeModalHandler}>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isSignedUp: state.auth.isSignedUp
    };
};

const mapDispatchToProps = {
    onRegister: register,
    onResetRegisterState: resetRegisterState
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);