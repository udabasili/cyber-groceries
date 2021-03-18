import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {deleteProduct} from '../redux/actions/product.action';
import { addItemToCart } from '../redux/actions/cart.action';
import {
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

/**
 *
 * The Card that shows products
 * @param {String, String, String, Boolean, String} {
 *     item,
 *     addItemToCart,
 *     deleteProduct, 
 *     isAdmin,
 *     setToastMessage,
 *   }
 */
function Card({
    item,
    addItemToCart,
    deleteProduct, 
    isAdmin,
    setToastMessage,
  }) {
    const [quantity, setQuantity] = useState(0)
    const [itemUnavailable, setItemUnavailable] = useState(item.quantity <= 0 )
    useEffect(() => {
      setItemUnavailable(item.quantity <= 0 )
      
    }, [item.quantity])


    const setQuantityHandler = (type) =>{
      let value = quantity
      if(type === 'increase'){
        value = value + 1
        
      }else if(type === 'decrease'){
        if(value === 0){
          setQuantity(0)
          return;
        }
        value = value - 1;
      }
      console.log(value)
      setQuantity(value)
    }
    const deleteProductHandler = (id) =>{
      deleteProduct(id)
        .then((result) => {
          setToastMessage('Deleted Successfully', 'success')
        }).catch((err) => {
          setToastMessage('Something went wrong', 'error')

        });
    }

    const addItemToCartHandler = (id) =>{
      if(itemUnavailable){
        setToastMessage('Item is current unavailable. Sorry about that')
        return;
      }
      try {
        addItemToCart(id, quantity)
        setToastMessage('Item added to Cart', 'success')

      } catch (error) {
        setToastMessage('Something went wrong', 'error')

      }
    }
    return (
      <div className="card" id={item._id}>
        <div
          className="card__image"
          style={{ backgroundImage: `url(${item.imageUrl})` }}/>
          {itemUnavailable && (
            <div className='card__item-unavailable'>
                <span>Item Unavailable</span>
            </div>
          )}
        
        <div className="card__heading">{item.name}</div>
        <div className="card__details">
          <div className="price item">
            <span className="label">Price: </span>
            <span className="value">${item.price}</span>
          </div>
          <div className="category item">
            <span className="label">Category: </span>
            <span className="value">{item.category}</span>
          </div>
        </div>
        {!isAdmin && (
          <div className="card__purchase">
              <div className="card__icon" onClick={()=>addItemToCartHandler(item)}>
                <FontAwesomeIcon icon={faCartPlus}  className="icon"  />
              </div>
             <span className="checkout-item__quantity">
              <div
                className="checkout-item__button"
                onClick={()=>setQuantityHandler('decrease')}
              >
                <FontAwesomeIcon size="1x" icon={faMinus}/>
              </div>
              <span className="value">{quantity}</span>
              <div
                className="checkout-item__button"
                onClick={()=>setQuantityHandler('increase')}
              >
                <FontAwesomeIcon size="1x" icon={faPlus}/>
              </div>
            </span>
          </div>
        )}

        {isAdmin && (
          <div className="button-container">
            <a className="btn"  href={`/admin/edit-product/${item._id}`}>
              Edit
            </a>
            <p className="btn" onClick={() => deleteProductHandler(item._id)}>
              Delete
            </p>
            
            
          </div>
        )}
      </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
  deleteProduct : (productId) => dispatch(deleteProduct(productId)),
  addItemToCart: (product, size) => dispatch(addItemToCart(product, size)),

})

export default connect(null, mapDispatchToProps)(Card);

