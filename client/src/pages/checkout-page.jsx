import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckOutItem from '../components/checkout-item.component';
import DeliveryModeComponent from '../components/delivery-mode.component';
import MakeOrder from '../components/makeorder.component';
import { clearAllItemsFromCart } from '../redux/actions/cart.action';

class CheckOut extends Component {
  constructor(props){
    super (props);
    this.state = {
      loadOrderModal: false,
      loadDeliveryModal: false,
      completeAddress: null,
      total: props.total,
      deliveryMethod: null
    }
  }
  
  componentDidUpdate(prevProps, prevState){
    if(prevState.total !== this.props.total ){
        this.setState((prevState) => ({
          ...prevState,
          total: this.props.total
        }))
    }
  }
  loadOrderModalHandler = () =>{
    this.setState((prevState) => ({
      ...prevState,
      loadOrderModal: true
    }))
  }

  deliveryModalHandler = () => {
    this.setState((prevState) => ({
      ...prevState,
      loadDeliveryModal: true 
    }))
  }

  onSubmitDelivery = (completeAddress, total, deliveryMethod) => {
    this.setState((prevState) => ({
      ...prevState,
      completeAddress,
      loadDeliveryModal: false,
      loadOrderModal: true,
      total,
      deliveryMethod
    }))
  }

  onSubmitOrder = () => {
    this.setState((prevState) => ({
      ...prevState,
      total: 0,
      
    }))
  }


  

  onClose = () =>{
    this.setState({
      loadOrderModal: false,
      loadDeliveryModal: false
    })
  }

  render() {
    const { items, clearAllItemsFromCart } = this.props;
    const {loadOrderModal, loadDeliveryModal, total } = this.state
    return (
      <div className="checkout">
        {
          loadOrderModal && <MakeOrder 
          onClose = {this.onClose}
            onSubmitOrder={this.onSubmitOrder}
          clearCart = {clearAllItemsFromCart}
          {...this.state}
          />}
        {
          loadDeliveryModal && 
          <DeliveryModeComponent 
            onClose={this.onClose}
            onSubmitDelivery={this.onSubmitDelivery}
            total={total}
          />}
        <div className="checkout__header">
            <span>CheckOut</span>
        </div>
        {items.length > 0 && 
          items.map((cartItem) => (
            <CheckOutItem key={cartItem.id} item={cartItem} />
          ))}
        <div className="checkout__total">
          <span  className='total'>
            TOTAL: ${total}
          </span>
        </div>
        <div className='btn' onClick={this.deliveryModalHandler} price={total}>Complete Order</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.cart,
  total: (state.cart.cart.reduce(
    (previous, current) => (
      (previous + (current.quantity * current.price))
    ), 0)).toFixed(2),
});

const mapDispatchToProps = (dispatch) => ({
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
