import React from 'react'
import { connect } from 'react-redux'

/**
 *
 * The dropdown cart components
 * @param {Array} {cartItems}
 */
function CartDropDown({cartItems}) {
    return (
        <div className='dropdown'>
            <ul className="dropdown__list">
                {cartItems.map((item, index) =>  (
                    <li className="dropdown__item" key={index}>
                        <img className="image" src={item.imageUrl} alt={item.name}/>
                        <div className="detail">
                            <div className="detail__name">
                                {item.name}
                            </div>
                            <div className="detail__quantity">
                                <span className='price'>{`$${item.price}/gram`}</span>
                                <span className='price'>{`Size:${item.size} grams`}</span>
                                <span className='quantity'>{`Quantity :${item.quantity}`}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <a href='/checkout' className='btn'>Check out</a>
        </div>
    )
}

const mapStateToProps = (state) => ({
	cartItems: state.cart.cart
})



export default connect(mapStateToProps, null)(CartDropDown)