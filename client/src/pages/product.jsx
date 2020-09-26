import React from "react";
import { Route, Switch } from "react-router-dom";
import ProductOverview from "../components/product-overview.component";
import ProductCategory from "../components/product-category.component";
import LeftNav from "../components/left-nav.compnent";


const Product = (props) => {
  const { match } = props;
  console.log(match)
  return (
    <div className="product">
		<LeftNav />
		<Switch>
			<Route exact path={`${match.path}`} render={(props) => (
				<ProductOverview  {...props}/>
				)} 
			/>
			<Route
			exact
			path={`${match.path}/:categoryType`}
			component={ProductCategory}
			/>
		</Switch>
    </div>
  );
};


export default Product;