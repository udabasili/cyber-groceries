import React, { useState } from 'react'
import { connect } from 'react-redux'
import CardList from './card-list.component';
import Filter from './filter.component';

function ProductOverview({products, history}) {
    let [productsValue, setProducts] = useState(products);
    const setFilter = (value) => {
        let sortedProduct;
        if (value === 'low'){
            sortedProduct = products.sort((a, b) => a.price - b.price)
            setProducts([...sortedProduct])
        }
        else if (value ==='high'){
            sortedProduct = products.sort((a, b) => b.price - a.price)
            setProducts([...sortedProduct])
        }
      }

    return (
      <div className="product-overview">
        <Filter setValue={setFilter} />
        {products.length > 0  ? (
          <CardList products={productsValue} />
        ) : (
          <div className="empty-list">No Item</div>
        )}
      </div>
    );
}


const mapStateToProps = (state) => ({
    products: state.product.products
})


export default connect(mapStateToProps, null)(ProductOverview)

