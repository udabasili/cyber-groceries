import React,{useState} from 'react'
import { sentPasswordReset } from '../redux/actions/user.action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    
    const onChange = (e) =>{
        setEmail(e.target.value)
    }
    const onSubmitHandler =(e) =>{
        e.preventDefault()
        sentPasswordReset(email)
            .then((result) => {
                setEmailSent(true)
            }).catch((err) => {
                toast.error('This email is not registered in our system')
            });
    }
    return (
        <div className="change-password">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                />
            <h2 className='heading-tertiary'>Forgot Password</h2>
            {!emailSent ?
                <React.Fragment>
                    <form className="form" onSubmit={onSubmitHandler}>
                            <div className="form__inner">
                            <div className="form__component">
                                <div className="form__group">
                                <input
                                    type="email"
                                    name="email"
                                    id='email'
                                    placeholder="Input your email"
                                    onChange={onChange}
                                    autoComplete='off'
                                    value={email}
                                    className="form__input"
                                    required
                                />
                                <label htmlFor="email" className="form__label">
                                    Email
                                </label>
                                </div>
                                
                            </div>
                        </div>
                        <input
                            type="submit"
                            className="btn"
                            value="Submit"
                            />
                    </form> 
                </React.Fragment>
                :
                <div>
                    <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        style={{
                            marginTop: '20px',
                            marginBottom:'20px'
                        }}
                        size='3x' 
                        color='rgb(4, 167, 4)'/>
                    <p className='paragraph'>
                        <span>
                            You will receive a password reset email very soon
                        </span>
                        
                       
                    </p>
                </div>
            }
            
    </div>
    )
}
