import React, {useState } from "react";
import { connect } from "react-redux";
import Modal from "./modal.component"
import logo from '../assets/images/icons8-cannabis-96.png'
import { submitOrder } from "../redux/actions/cart.action";
import Loading from "./loading.componet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const MakeOrder = ({
    onClose,
    currentUser,
    submitOrder,
    cartItems,
    onSubmitOrder,
    clearCart,
    ...otherProps
  }) => {
  let {total, completeAddress, deliveryMethod} = otherProps
  const [email, setEmail] = useState('')
  const [ordering, setOrdering] = useState(false)
  const [orderedSuccessful, setOrderedSuccessful] = useState(false)
  const history = useHistory() 
  const setEmailHandler = (e) =>{
    const { value} = e.target; 
    setEmail(value)
  }
  const orderSubmit = (e) => {
    e.preventDefault();
    if (!email){
      alert('Email field cannot be empty')
    }
    setOrdering(true)
    submitOrder(email, cartItems, total, completeAddress, deliveryMethod)
      .then((result) => {
        if(result === 'success'){
          clearCart()
          setOrdering(false)
          setOrderedSuccessful(true)
          onSubmitOrder()

        }
      }).catch((err) => {
        setOrdering(false)
        setOrderedSuccessful(false)
        toast.error("Something went wrong. Please try again later")
      });

  }

  const onCloseHandler = () =>{
    onClose()
    if(orderedSuccessful === true){
        history.push('/')
    }

  }
    return(
        <Modal onClose={onCloseHandler}>
          {ordering && <Loading/>}
            <div className='order__header' >
                <div className="logo-box">
                    <div className="logo"><img src={logo} alt='weblogo'/> </div>
                    
                </div>
                <h3 className='heading-tertiary'>
                    Submit Order
                </h3>
            </div>
            <div className='order__content'>
              {!orderedSuccessful ? 
              <React.Fragment>
                  <p className='total'>Total: ${total}</p>
                <form className="form" onSubmit={orderSubmit}>
                     <div className="form__component">
                      <div className="form__group">
                        <input
                          type="text"
                          name="username"
                          value={currentUser.username}
                          disabled={true}
                          className="form__input"
                          required
                        />
                        <label htmlFor="username" className="form__label">
                          Username
                        </label>
                      </div>
                    </div>
                    <div className="form__component">
                      <div className="form__group">
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={setEmailHandler}
                          className="form__input"
                          placeholder='Input email here..'
                          required
                        />
                        <label htmlFor="email" className="form__label">
                          Email
                        </label>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn"
                      value="Submit"
                />

                </form>
              </React.Fragment> :
              <React.Fragment>
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
                            We have sent an email confirming your order. Thank you for your purchase with us.
                        </span>
                        
                       
                    </p>
              </React.Fragment>
              }
                
            </div>
            
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    currentUser:state.user.currentUser,
    cartItems: state.cart.cart


})

const mapDispatchToProps = {
    submitOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeOrder)

