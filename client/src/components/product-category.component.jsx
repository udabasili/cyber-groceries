import React from "react";
import { connect } from "react-redux";
import CardList from "./card-list.component";

/**
 *This filters products based on categories selected from the left nav
 *
 * @param {*} { products, match }
 * @return {*} 
 */
function ProductCategories({ products, match }) {
    const categoryProducts = products.filter((item) => item.category === match.params.categoryType);
    return (
		<div className='product-overview'>
			{products.length > 0 ?
				<CardList products={categoryProducts} /> :
				<div className='empty-list'>No Item</div>
			}
		</div>

  );
}

const mapStateToProps = (state) => ({
  products: state.product.products
});

export default connect(mapStateToProps, null)(ProductCategories);
