import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from './modal.component'
import { setOrderById } from '../redux/actions/admin.action'
import Loading from './loading.componet'
import { toast } from 'react-toastify'

class Order extends Component {
    constructor(props){
        super (props);
        this.state = {
            orderFulfilled: props.order.orderFulfilled,
            isLoading: false
        }
    }

    componentDidMount(){
        const order = {...this.props.order}
        let {currentUser, id} = order
    }

    onChange = (e) => {
        const order = {...this.props.order}
        let {currentUser, id} = order
        if(!currentUser.ageVerified){
            toast.error("Current user's age has not been verified");
            return;
        }
        let orderFulfilled = e.target.checked;
        order.orderFulfilled = true
        this.setState(prevState =>({
            ...prevState,
            isLoading: true,
            orderFulfilled
        }))
        this.props.setOrderById(currentUser._id, order)
            .then((result) => {
                this.setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                }))
                toast.success('Order Completed')
                this.props.setCheckedValue(orderFulfilled, id)
            }).catch((err) => {
                this.setState(prevState => ({
                    ...prevState,
                    isLoading: false,
                }))
                toast.success('Something went wrong. Try again later')

        });
    }

     onCloseHandler = () =>{
        const orderId = this.props.order.id
        this.props.setCheckedValue(this.state.orderFulfilled,orderId)
    }
    
    render() {
        const {order} = this.props
        const {orderFulfilled, isLoading} = this.state
        return (
            <Modal onClose={this.onCloseHandler}>
                {isLoading &&<Loading/>}
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
                    <input type="checkbox" onChange={this.onChange} checked={orderFulfilled}/>
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
