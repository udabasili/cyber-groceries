import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckOutItem from '../components/checkout-item.component';
import MakeOrder from '../components/makeorder.component';
import { clearAllItemsFromCart } from '../redux/actions/cart.action';

class CheckOut extends Component {
  state = {
    makeOrder: false
  }
  ;
  makeOrderHandler = () =>{
    this.setState({makeOrder: true})
  }

  onClose = () =>{
    this.setState({
      makeOrder: false
    })
  }

  render() {
    const { items, total, clearAllItemsFromCart } = this.props;
    const {makeOrder} = this.state
    return (
      <div className="checkout">
        {
          makeOrder && < MakeOrder onClose = {
            this.onClose
          }
          clearCart = {
            clearAllItemsFromCart
          }
          total = {
            total
          }
          />}
        <div className="checkout__header">
            <span>CheckOut</span>
        </div>
        {items.length > 0 && 
          items.map((cartItem) => (
            <CheckOutItem key={cartItem.id} item={cartItem} />
          ))}
        <div className="checkout__total">
          <span>
            TOTAL: ${total}
          </span>
        </div>
        <div className='btn' onClick={this.makeOrderHandler} price={total}>Complete Order</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.cart,
  total: state.cart.cart.reduce(
    (previous, current) => (
      previous + (current.quantity * current.price * current.size)
    ), 0,
  ),
});

const mapDispatchToProps = (dispatch) => ({
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
