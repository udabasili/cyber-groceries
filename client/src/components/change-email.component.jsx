import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { editUserEmail } from '../redux/actions/admin.action';
import { connect } from 'react-redux';

function ChangeEmail({
  editUserEmail, 
  userData, 
  onToastMessage,
  onClose}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
    const [email, setEmail] = useState('')
    const setIsHandlerMobile = () => {
         setIsMobile(window.innerWidth <= 600)
     }
    useEffect(() => {
        window.addEventListener('resize', setIsHandlerMobile)
        return () => {
            window.removeEventListener('resize', setIsHandlerMobile)

        }
    }, [])
    const onChangeHandler = (e) =>{
        setEmail(e.target.value)

    }

    const onSubmitHandler = (e) =>{
        const emailData = {
            email
        }
        e.preventDefault()
        editUserEmail(emailData, userData._id)
        .then((result) => {
            onToastMessage('success', 'Email Successfully edited')
            onClose()
        }).catch((err) => {
          onToastMessage('error', 'Something Went wrong. Try again later')

        });
    }
    
    return (
         <div className="edit-profile">
              <form className="form" onSubmit={onSubmitHandler}>
                  <div className="form__inner">
                    <div className="form__component">
                      <i className="form__group__icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </i>
                      <div className="form__group">
                        <input
                          type="email"
                          name="email"
                          placeholder={isMobile ? "Email" : ""}
                          onChange={onChangeHandler}
                          value={email}
                          
                          className="form__input"
                          required
                        />
                        <label htmlFor="username" className="form__label">
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    editUserEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail)
