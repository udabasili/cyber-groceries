import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { countCart } from '../redux/selector/cart.selectors';

function CartCount({cartQuantity = 0}) {
    return (
        <div className='cart-count'>
            <div className="count">{cartQuantity}</div>
        </div>
    )
}

CartCount.propTypes = {
    cartQuantity: PropTypes.number
}
const mapStateToProps = (state) => ({
    cartQuantity: countCart(state)
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CartCount)

