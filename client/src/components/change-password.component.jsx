import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import formHandler from './change-password-form-handler';
import { resetPassword } from '../redux/actions/user.action';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const validator = (values) => {
	let errors = {};
	if (!values.email) {
		errors.email = 'Email address is required';
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = 'Email address is invalid';
	}
	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 8) {
		errors.password = 'Password must be 8 or more characters';
	}
	if (values.password !== values.confirmPassword) {
		console.log(values)
		errors.confirmPassword = 'Passwords must match';
	}
	return errors;
}

export default function ChangePassword(props) {
	function login() {
		console.log('No errors, submit callback called!');
	}
	const dispatch = useDispatch()
	const resetPasswordHandler = () =>{
		dispatch(resetPassword())
	}
	 const {
	 	userInfo,
	 	errors,
	 	onChangeHandler,
	 	onSubmitHandler,
	 } = formHandler(validator, resetPassword, props);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
    const setIsHandlerMobile = () => {
         setIsMobile(window.innerWidth <= 600)
     }
    useEffect(() => {
		
        window.addEventListener('resize', setIsHandlerMobile)
        return () => {
            window.removeEventListener('resize', setIsHandlerMobile)

        }
    }, [])
	const Submit = (e) =>{
		onSubmitHandler(e)
	}
 
    
    return (
        <div className="change-password">
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				/>
			<h2 className='heading-secondary'>Reset Password</h2>
            <form className="form" onSubmit={Submit}>
                <div className="form__inner">
                  <div className="form__component">
                    <i className="form__group__icon">
                      <FontAwesomeIcon icon={faEnvelopeOpen} />
                    </i>
                    <div className="form__group">
                      <input
                        type="email"
						name="email"
						id='email'
                        placeholder={isMobile ? "Email" : ""}
                        onChange={onChangeHandler}
						autoComplete='off'
						value={userInfo.email|| ''}
                        className="form__input"
                        required
                      />
                      <label htmlFor="email" className="form__label">
                        Email
                      </label>
					  {errors.email &&  (
							<p className="error">{errors.email}</p>
						)}
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
						id='email'
						placeholder={isMobile ? "Password" : ""}
						value={userInfo.password|| ''}
                        onChange={onChangeHandler}
                        className="form__input"
                        required
                      />
                      <label htmlFor="password" className="form__label">
                        Password
                      </label>
					  {errors.password &&  (
							<p className="error">{errors.password}</p>
						)}
                    </div>
                  </div>
                  <div className="form__component">
                    <i className="form__group__icon">
                      <FontAwesomeIcon icon={faKey} />
                    </i>
                    <div className="form__group">
                      <input
                        type = "password"
						name="confirmPassword"
						id='confirmPassword'
						value={userInfo.confirmPassword|| ''}
                        placeholder={isMobile ? "Confirm Password" : ""}
                        onChange={onChangeHandler}
                        className="form__input"
                        required
                      />
                      <label htmlFor="confirmPassword" className="form__label">
                        Confirm Password
                      </label>
					  {errors.confirmPassword &&  (
							<p className="error">{errors.confirmPassword}</p>
						)}
                    </div>
					
                  </div>
				  <input
						type="submit"
						className="btn"
						value="Submit"
						onClick={onSubmitHandler}
						/>
              </div>
          </form>
      </div>
    )
}
