import React, { useState } from 'react'
import { connect } from 'react-redux'
import Modal from './modal.component'
import logo from '../assets/images/icons8-cannabis-100.png'
import { setConsent } from '../redux/actions/user.action'
import PropTypes from 'prop-types'

/**
 *  This shows the popup window when you first load the website showing the age verification
 * @param {function} setConsentHandler 
 */
const CheckConsent = ({setConsentHandler}) => {
    const [checkedBox, setCheckedBox] = useState(false)
    const checkedBoxHandler = (e) =>{ 
        setCheckedBox(e.target.checked)
    }
    return (
        <Modal>
            <div className='check-consent__header'>
                <div className="logo-box">
                    <div className="logo"><img src={logo} alt='weblogo'/> </div>
                    <div className="app-name">
                    <span>Marij</span>
                    <span>420</span>

                    </div>
                </div>
                <h2 className='heading-secondary '>
                    Are you 19+?
                </h2>
            </div>
            <div className='check-consent__content'>
                 <p className='paragraph'>
                    Be aware that it is illegal
                    for anyone under age 19 to view cannabis related content, create an account or purchase on this website
                </p>
                <div>
                    <input type='checkbox' className='check-consent__input' id='check-consent' onChange={checkedBoxHandler}/>
                    <label htmlFor='check-consent' className='check-consent__label'>
                        Yes I am 19 years or old
                    </label>
                    
                </div>
                <button className="btn" disabled={!checkedBox} onClick={() => setConsentHandler(true)}>
                    Enter
                </button>
        </div>
           
        </Modal>
    )
}

CheckConsent.propTypes ={
    setConsentHandler: PropTypes.func.isRequired

}

const mapDispatchToProps = (dispatch) => ({
    setConsentHandler: (acceptedTerm) => dispatch(setConsent(acceptedTerm)),
});

export default connect(null, mapDispatchToProps)(CheckConsent)


