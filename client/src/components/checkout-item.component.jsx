import React from 'react';
import { connect } from 'react-redux';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../redux/actions/cart.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

/*
 * Component handles the check out of items added to cart
 * @param {object} item 
 * @param {function} removeItem - remove item from cart by one unit
 * @param {function} addItem - add item to cart by one unit
 * @param {function} clearItemFromCart - remove item from cart total

 */


const CheckOutItem = ({item, removeItem, addItem, clearItemFromCart}) => {
  const {_id, name, imageUrl, price, quantity, size} = item;
  console.log(_id)
  return (
    <div className="checkout-item">
      <div
        onClick={() => clearItemFromCart(_id, size)}
        className="checkout-item__remove-button"
      >
        <FontAwesomeIcon size="2x" icon={faTimes}/>
      </div>
      <div className="checkout-item__image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="checkout-item__name">{name}</span>
      <span className="price">
        {`${size} grams`}
      </span>
      <span className="price">
        {`$${price}/gram`}
      </span>
      <span className="checkout-item__quantity">
        <div
          onClick={() => removeItem(item, size)}
          className="checkout-item__button"
        >
          <FontAwesomeIcon size="1x" icon={faMinus}/>
        </div>
        <span className="value">{quantity}</span>
        <div
          onClick={() => addItem(item, size)}
          className="checkout-item__button"
        >
          <FontAwesomeIcon size="1x" icon={faPlus}/>
        </div>
      </span>

      <span className="price">
        ${price * quantity * size}
      </span>

    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (id, size) => dispatch(clearItemFromCart(id, size)),
  removeItem: (cartItem, size) => dispatch(removeItemFromCart(cartItem, size)),
  addItem: (cartItem, size) => dispatch(addItemToCart(cartItem, size)),

});

CheckOutItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  clearItemFromCart: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(CheckOutItem);
