import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import AddProduct from './add-product-page'
import AdminHome from './admin-home-page'
import AdminProducts from './admin-product-page'
import LeftNav from '../../components/admin-left-nav.component'
import UsersList from './users-list.page'
import { connect } from 'react-redux'
import { getAllUsers, getAllUsersOrder } from '../../redux/actions/admin.action'
import ProductInventory from './product-inventory-page'
import UserProfile from '../../components/userprofile.component'
import { toggleCartDropDown } from '../../redux/actions/cart.action'
import { toggleUserDropdown } from '../../redux/actions/user.action'
import { removeError } from '../../redux/actions/error.action'
import OrdersPage from './orders-page'

function AdminRoute({
	match, 
	getAllUsers, 
	allUsers, 
	getAllUsersOrder,
	products, 
	toggleCartDropDown,
	toggleUserDropdown,
	currentUser
	}) {

		const history = useHistory()
			useEffect(() => {
				const id = currentUser._id
				Promise.all([getAllUsersOrder(), getAllUsers(id)])
					.then(() => {
					}).catch(() => {
						alert('Some went wrong')
				});

			}, [currentUser, getAllUsers, getAllUsersOrder])
			history.listen(() => {
				removeError()
				toggleCartDropDown(true)
				toggleUserDropdown(true)
		})
    return (
      <div className="admin">
        <LeftNav />
        <Switch>
          <Route exact path={`${match.url}`} component={AdminHome} currentUser={currentUser} />
          <Route
            path={`${match.url}/add-product/grams`}
            render={(props) => <AddProduct title="Add product" type='grams' {...props} />}
          />
		  <Route
            path={`${match.url}/add-product/millimeter`}
            render={(props) => <AddProduct title="Add product" type='millimeter' {...props} />}
          />
		  <Route
            path={`${match.url}/orders`}
            render={(props) => <OrdersPage title="Add product" type='millimeter' {...props} />}
          />
		  
          <Route
		  exact
            path={`${match.url}/edit-product/grams/:itemId`}
            render={(props) => (
              <AddProduct title="Edit product" editing {...props} />
            )}
          />
		  <Route
		  exact
            path={`${match.url}/edit-product/millimeter/:itemId`}
            render={(props) => (
              <AddProduct title="Edit product" editing {...props} />
            )}
          />
          <Route
            path={`${match.url}/users/:userId`}
            render={(props) => (
              <UserProfile {...props} />
            )}
          />
			<Route
				exact
				render={(props) => <AdminProducts products={products} isAdmin {...props} />}
				path={`${match.url}/products`}
			/>
			<Route
				exact
				render={(props) => <ProductInventory inventory={products} isAdmin {...props} />}
				path={`${match.url}/inventory`}
			/>
			<Route exact path={`${match.url}/users`} 
				render={(props) => <UsersList isAdmin  allUsers={allUsers} {...props} />} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
}

const mapStateToProps = (state) => ({
	allUsers: state.admin.allUsers,
	products: state.product.products,
	currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) =>({
	toggleUserDropdown: (hideCart) => dispatch(toggleUserDropdown(hideCart)),
	toggleCartDropDown: (hideCart) => dispatch(toggleCartDropDown(hideCart)),
	getAllUsers : (userId) => dispatch(getAllUsers(userId)),
	removeError: () => dispatch(removeError()),
	getAllUsersOrder: () =>dispatch(getAllUsersOrder())

})

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute)
