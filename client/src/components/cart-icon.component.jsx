import React from 'react'
import CartCount from './cart-count.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default function CartIcon({onClick}) {
    return (
        <div className='cart-icon' onClick={onClick}>
            <FontAwesomeIcon icon={faCartPlus} className='icon'/>
            <CartCount/>
        </div>
    )
}
