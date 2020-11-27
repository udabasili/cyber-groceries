import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {validateError, validator} from '../components/validator';
import AuthImage from '../assets/images/slides/weed1.jpg'
import { Authenticate } from '../redux/actions/user.action';
import { removeError } from '../redux/actions/error.action';
import Loading from '../components/loading.componet';
import { toast } from 'react-toastify';

/**
 * Class representing authentication form for user
 */

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            errors:{},
            isLoading: false,
            prevRoute: null,
            disableSubmitButton: true,
            auth: props.auth || 'register',
            error: null,
            isMobile: window.innerWidth <= 600,
            loginData: {
                email: '',
                password: '',
            },
            registerData: {
                username: {
                    value: '',
                    focused: false,
                    validated: false
                },
                name: {
                    value: '',
                    focused: false,
                    validated: false
                },
                email: {
                    validated: false,
                    value: '',
                    focused: false
                },
                password: {
                    validated: false,
                    value: '',
                    focused: false

                },
                confirmPassword: {
                    validated: false,
                    value: '',
                    focused: false
                },
            },
        }

    }
    componentDidMount() {
        if (this.props.location.state){
          this.setState((prevState) => ({
              ...prevState,
              prevRoute: this.props.location.state.from.pathname
            })
          )
        }
        window.addEventListener('resize', this.setIsMobile)
    }

    componentDidUpdate(prevProps) {
        if (this.props.auth !== prevProps.auth) {
            this.setState((prevState) => ({
                ...prevState,
                auth: this.props.auth
            })
            )
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setIsMobile)
        this.props.removeError()
    }

    /**
     * Changes state as user types based in the login component tag name and value 
     * @param {*} e 
     */
    onChangeHandlerLogin = (e) => {
        let { name, value } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            loginData: {
                ...prevState.loginData,
                [name]: value
            }
        }))
    }

    setIsMobile = () => {
        this.setState((prevState) => ({
            ...prevState,
            isMobile: window.innerWidth <= 600
        }))
    }

    generateUserId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    /**
     * Changes state as user types based in the register component tag name and value 
     * @param {*} e 
    */
    onChangeHandlerRegister = (e) => {
        const { name, value } = e.target;
        const updatedControls = {
            ...this.state.registerData
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.validated = validator(name,
            name === 'confirmPassword' ? {
                password: this.state.registerData.password.value,
                confirm: value
            } : value)

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].validated;
        }

        this.setState({
            registerData: updatedControls,
            disableSubmitButton: !formIsValid
        });
    }

    /**
     * Submits either through the login link or the register link 
     * based on the current auth state value
     * @param {*} e 
     */
    onSubmitHandler = (e) => {
      e.preventDefault()
      const path = this.state.prevRoute ? this.state.prevRoute : '/'
      this.setState((prevState) =>({
        ...prevState,
        isLoading: true
      }))
        let userData;
        const userId = this.generateUserId()
        if(this.state.auth === 'register'){
            userData = {
                userId,
                name: this.state.registerData.name.value,
                username: this.state.registerData.username.value,
                email: this.state.registerData.email.value,
                password: this.state.registerData.password.value,
            }
        }else{
            userData = this.state.loginData
        }
        this.props.Authenticate(userData, this.state.auth)
        .then(() => {
            this.setState((prevState) => ({
            	...prevState,
            	isLoading: false
            }))
            this.props.history.push(path)
		})
		.catch((error) =>{
			this.setState((prevState) => ({
				...prevState,
				isLoading: false
      }), () => toast.error(error))
		})
		
    }


    changeAuthState = (value) => {
        this.setState({ auth: value })
    }

    errorHandler = (e) => {
      const {name, value} = e.target
      const userData = {
        [name]: value
      }
      const errors = validateError(userData)
      let error = null;
      for (let key in errors){    
        if(key === name){
          error = errors[key]
        }
      }
      this.setState((prevState) =>({
        ...prevState,
        errors: {...prevState.errors, [name]: error}
      }))
    
    }

    render() {
        const { auth, registerData, loginData, isMobile, disableSubmitButton, isLoading,errors } = this.state;
        return (
          <div className="auth-page">
            {isLoading && <Loading/>}
              <div className="auth-page__left-section">
                <nav className="form-nav">
                  <ul className="form-nav__list">
                    <li className="form-nav__item">
                      <NavLink
                        className="form-nav__link"
                        activeClassName="active-auth"
                        to="/auth/login"
                      >
                        login{" "}
                      </NavLink>
                    </li>
                    <li className="form-nav__item">
                      <NavLink
                        className="form-nav__link"
                        activeClassName="active-auth"
                        to="/auth/register"
                      >
                        signUp{" "}
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <form className="form" onSubmit={this.onSubmitHandler}>
                  {auth === "register" ? (
                    <div className="form__inner">
                      <div className="form__component">
                        <i className="form__group__icon">
                          <FontAwesomeIcon icon={faUser} />
                        </i>
                        <div className="form__group">
                          <input
                            type = "text"
                            onBlur = {
                              this.errorHandler
                            }
                            onFocus ={
                              this.errorHandler
                            }
                            name="username"
                            placeholder={isMobile ? "Username" : ""}
                            onChange={this.onChangeHandlerRegister}
                            style={{
                              color: registerData.username.validated
                                ? "black"
                                : "red",
                            }}
                            value={registerData.username.value}
                            className="form__input"
                            required
                          />
                          <label htmlFor="username" className="form__label">
                            Username
                          </label>
                        </div>
                      </div>
                      <div className="form__component">
                        <i className="form__group__icon">
                          <FontAwesomeIcon icon={faUser} />
                        </i>
                        <div className="form__group">
                          <input
                            type="text"
                            name="name"
                            onBlur={this.errorHandler}
                            placeholder={isMobile ? "Name" : ""}
                            onChange={this.onChangeHandlerRegister}
                            style={{
                              color: registerData.name.validated
                                ? "black"
                                : "red",
                            }}
                            value={registerData.name.value}
                            className="form__input"
                            required
                          />
                          <label htmlFor="name" className="form__label">
                            Name
                          </label>
                        </div>
                      </div>
                      <div className="form__component">
                        <i className="form__group__icon">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        <div className="form__group">
                          <input
                            type="email"
                            placeholder={isMobile ? "Email" : ""}
                            onChange={this.onChangeHandlerRegister}
                            value={registerData.email.value}
                            onBlur={this.errorHandler}
                            style={{
                              color: registerData.email.validated
                                ? "black"
                                : "red",
                            }}
                            name="email"
                            className="form__input"
                            required
                          />
                          <label htmlFor="email" className="form__label">
                            Email
                          </label>
                            {(errors && !registerData.email.validated) && 
                              <div className='input-error'>{errors.email}
                            </div>}
                        </div>
                      </div>
                      <div className="form__component">
                        <i className="form__group__icon">
                          <FontAwesomeIcon icon={faKey} />
                        </i>
                        <div className="form__group">
                          <input
                            type="password"
                            onBlur={this.errorHandler}
                            placeholder={
                              isMobile
                                ? "Password (Must be at least 9 characters)"
                                : ""
                            }
                            name="password"
                            onChange={this.onChangeHandlerRegister}
                            title="Must be at least 9 characters"
                            style={{
                              color: registerData.password.validated
                                ? "black"
                                : "red",
                            }}
                            value={registerData.password.value}
                            className="form__input"
                            required
                          />
                          <label htmlFor="password" className="form__label">
                            <span> Password </span>
                            <span> ( Must be at least 9 characters)</span>
                          </label>
                            {(errors && !registerData.password.validated)
                             && <div className='input-error'>
                               {errors.password}
                            </div>}
                        </div>
                      </div>
                      <div className="form__component">
                        <i className="form__group__icon">
                          <FontAwesomeIcon icon={faKey} />
                        </i>
                        <div className="form__group">
                          <input
                            type="password"
                            onBlur={this.errorHandler}
                            name="confirmPassword"
                            placeholder={isMobile ? "Confirm password" : ""}
                            onChange={this.onChangeHandlerRegister}
                            style={{
                              color: registerData.confirmPassword.validated
                                ? "black"
                                : "red",
                            }}
                            value={registerData.confirmPassword.value}
                            className="form__input"
                            required
                          />
                          <label
                            htmlFor="confirm-password"
                            className="form__label"
                          >
                            Confirm Password
                          </label>
                              {
                                
                                  (errors && !registerData.password.validated) && 
                                    <div className = 'input-error' > {
                                      errors.confirmPassword
                                  } </div>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="form__inner">
                      <div className="form__component">
                        <i className="form__group__icon">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                        <div className="form__group">
                          <input
                            type="email"
                            placeholder={isMobile ? "Email" : ""}
                            onChange={this.onChangeHandlerLogin}
                            value={loginData.email}
                            name="email"
                            className="form__input"
                          />
                          <label htmlFor="email" className="form__label">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="form__component">
                        <i className="form__group__icon">
                          <FontAwesomeIcon icon={faKey} />
                        </i>
                        <div className="form__group">
                          <input
                            type="password"
                            name="password"
                            placeholder={isMobile ? "Password" : ""}
                            onChange={this.onChangeHandlerLogin}
                            value={loginData.password}
                            className="form__input"
                          />
                          <label htmlFor="password" className="form__label">
                            Password
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  <input
                    type="submit"
                    className="btn"
                    value="Submit"
                    disabled={disableSubmitButton && auth === "register"}
                  />
                  {auth === 'login' &&
                    <div className='reset-password'>
                      <span>Forgot your password?</span>
                      <a  
                        href='/forgot-password'
                        className='reset-password__button'>Reset now</a>
                    </div>
                  }
                </form>
              </div>
              <div
                className="auth-page__right-section"
                style={{ backgroundImage: `url(${AuthImage})` }}
            ></div>
          </div>
        );
    }
}

const mapStateToProp = state => ({
    error: state.error.error
})

const mapDispatchToProp = {
    Authenticate,
    removeError
}

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(Auth))