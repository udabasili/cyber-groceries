import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {deleteProduct} from '../redux/actions/product.action';
import { addItemToCart } from '../redux/actions/cart.action';

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
    const [size, setSize] = useState(item.type !== 'millimeter'? '3.5':'50')
    const [itemUnavailable, setItemUnavailable] = useState(item.quantity <= 0 )
    useEffect(() => {
      setItemUnavailable(item.quantity <= 0 )
      
    }, [item.quantity])
    const setSizeHandler = (e) =>{
      const {value} = e.target;
      setSize(value)
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
        addItemToCart(id, size)
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

            {item.type !== 'millimeter' &&
              <span className="value">/gram</span>
             
            }
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
            {item.type !== 'millimeter' ?
              <select type="text" className="card__select" value={size} onChange={setSizeHandler}>
                <option value="1">1g</option>
                <option value="2">2g</option>
                <option value="3.5">3.5g</option>
                <option value="7">7g</option>
                <option value="14">14g</option>
                <option value="28">28g</option>
              </select> :
            <select type="text" className="card__select" value={size} onChange={setSizeHandler}>
              <option value="50">50ml</option>
              <option value="150">150ml</option>
              <option value="250">250ml</option>
            </select>
             
            }
            
          </div>
        )}

        {isAdmin && (
          <div className="button-container">
            <a className="btn"  href={`/admin/edit-product/${item.type}/${item._id}`}>
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

