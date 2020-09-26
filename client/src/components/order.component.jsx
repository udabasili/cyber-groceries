import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from './modal.component'
import { setOrderById } from '../redux/actions/admin.action'

class Order extends Component {
    state ={
        orderFulfilled : false,
    }

    onChange = (e) => {
        let orderFulfilled = false;
        const order = {...this.props.order}
        let {currentUser, cartItems,id} = order
        cartItems.orderFulfilled = false;
        if(e.target.checked === true){
            order.orderFulfilled = true
            
            this.props.setOrderById(currentUser._id, order)
                .then((result) => {
                    this.props.setCheckedValue(this.state.orderFulfilled, id)
                }).catch((err) => {
                    
                });
            orderFulfilled = true
            
        }else {
            orderFulfilled = false
        }
        this.setState({
            orderFulfilled
        })
    }

     onCloseHandler = () =>{
        const orderId = this.props.order.id
        this.props.setCheckedValue(this.state.orderFulfilled,orderId)
    }
    
    render() {
        const {orderFulfilled} = this.state
        const {order} = this.props
        return (
            <Modal onClose={this.onCloseHandler}>
                <div className='user-order__header'>
                    <h2 className='heading-tertiary'>{order.currentUser.username}</h2>
                </div>
                <div className='user-order__body'>
                    {
                    order.cartItems.map((item, index) =>(
                        <div className="checkout-item" key={`${item._id}-${index}`}>
                            <div className="checkout-item__image-container">
                                <img src={item.imageUrl} alt="item" />
                            </div>
                            <span className="checkout-item__name">{item.name}</span>
                            <span className="price">
                                {`${item.size} grams`}
                            </span>
                                <span className="checkout-item__quantity">
                                <span className="value">{item.quantity}</span>
                            </span>
                        </div>
                    ))
                }
                
                </div>
                <label className="user-order__label">
                        Orders Fulfilled
                    <input type="checkbox" onChange={this.onChange} value={orderFulfilled}/>
                    <span className="check-mark"></span>
                </label>      
        </Modal>
        )
    }
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    setCheckedValue: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    setOrderById
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
