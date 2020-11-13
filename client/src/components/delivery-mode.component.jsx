import React, {useState } from "react";
import { connect } from "react-redux";
import Modal from "./modal.component"
import logo from '../assets/images/HWY420.png'
import { submitOrder } from "../redux/actions/cart.action";
import { toast } from "react-toastify";

const DeliveryMode = ({
    total,
    onClose,
	onSubmitDelivery,
    
  }) => {
  const [deliveryCost, setDeliveryCost] = useState(0)
  const [deliveryMethod, setDeliveryMethod] = useState('pickup')
  const [province, setProvince] = useState('')
  const [address, setAddress] = useState('')

  const setProvinceHandler = (e) => {
    const {name, value} = e.target
    if(value === 'others'){
      toast.error('Sorry delivery is allowed to miramichi and sunny corner')
      setDeliveryMethod('pickup')
      return;
    }
	setProvince(value)
	switch (value){
		case 'Miramichi':
			setDeliveryCost(10.00)
			return;
		case 'Sunny Corner':
			setDeliveryCost(5.00)
			return;
		default:
			setDeliveryCost(0)
	}
  }
  const deliverySubmit = (e) => {
	e.preventDefault();
	if (deliveryMethod === 'delivery'){
		if (province !== 'Miramichi' && province !== 'Sunny Corner'){
			toast.error('Please choose the correct province')
			return;
		}
	}
	let completeAddress ={
		address,
		province
	}
	  let finalTotal = parseFloat(total) + deliveryCost
		onSubmitDelivery(completeAddress, finalTotal, deliveryMethod)


	}

	const onCloseHandler = () =>{
		onClose()
	}
    return(
        <Modal onClose={onCloseHandler}>
            <div className='order__header' >
                <div className="logo-box">
                    <div className="logo"><img src={logo} alt='weblogo'/> </div>
                </div>
                <h3 className='heading-tertiary'>
                    Delivery Mode
                </h3>
            </div>
            <div className='order__content'>
                  <p className='total'>
						<span>Total: ${total} + </span>
						<span>${deliveryCost}</span>
					</p>
                  <form className="form" onSubmit={deliverySubmit}>
                    <div className="form__select">
                      <select
                          className="card__select"
                          name="delivery-method"
                          id="delivery-method"
                          value={deliveryMethod}
                          onChange={e => setDeliveryMethod(e.target.value)}
                        >
                          <option value="pickup">Pick Up</option>
                          <option value="delivery">Delivery</option>
                        </select>
                    </div>
					{deliveryMethod === 'delivery' &&
						<React.Fragment>
							<div className="form__component">
								<div className="form__group">
									<textarea
										type="text"
										name="address"
										title='Please put in address'
										type='address'
										value={address}
										onChange={e => setAddress(e.target.value)}
										id='address'
										required
										rows={5}
										cols={20}
									/>
									<label htmlFor="address" className="form__label">
										Address
                        			</label>
									</div>
								</div>
								<div className="form__component">
									<div className="form__select">
										<select
											className="card__select"
											name="province"
											id="province"
											onChange={setProvinceHandler}
										>
											<option disabled selected value>Chose Province</option>
											<option value="Miramichi">Miramichi</option>
											<option value="Sunny Corner">Sunny Corner</option>
											<option value="others">Others</option>
										</select>
								</div>
							</div>
						</React.Fragment>
					}
                     
                    <input
                      type="submit"
                      className="btn"
                      value="Submit"
                />

                </form>                
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryMode)