import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { deleteProduct } from '../../redux/actions/product.action';
import {toast } from 'react-toastify';
import Loading from '../../components/loading.componet';
import { connect } from 'react-redux';

 class ProductInventory extends Component {
	 constructor(props){
		 super (props);
		 this.state = {
			isLoading: false
		 }
	 }

	deleteProductHandler = (id) =>{
		this.setState({
			isLoading: true
		})
       this.props.deleteProduct(id)
        .then((result) => {
			this.setState({
			isLoading: false
		})
          toast.success('Deleted Successfully', 'success')
        }).catch((err) => {
			this.setState({
				isLoading: false
			})
            toast.error('Something went wrong', 'error')

        });
	}
	

    render() {
		const { inventory, history } = this.props;
         return (
           <div className="user-list">
			   {this.state.isLoading && <Loading/>}
             <table>
				<thead>
					<tr>
						<th>{"  "}</th>
						<th>Name</th>
						<th>Price</th>
						<th>Category</th>
						<th>Strain</th>
						<th>Quantity</th>
						<th>{"  "}</th>
					</tr>
				</thead>
               <tbody>
					{(inventory.length > 0 && inventory !== undefined ) &&
					inventory.map((product) => (
					<tr key={product._id}>
						<td>
							<FontAwesomeIcon icon={faPencilAlt} onClick={() => history.push({
								pathname: `/admin/edit-product/${product.type}/${product._id}`,
								state: {
									location: history.location.pathname
								}
							})}/>
						</td>
						<td>{product.name}</td>
						<td>${product.price}</td>
						<td>{product.category}</td>
						<td>{product.strain}</td>
						<td>{product.quantity}</td>
						<td>
							<FontAwesomeIcon icon={faTimesCircle} color='red' onClick={() => this.deleteProductHandler(product._id) }/>
						</td>
					</tr>
					))}
               </tbody>
             </table>
           </div>
         );
    }
}

const mapDispatchToProps = (dispatch) => ({
  deleteProduct : (productId) => dispatch(deleteProduct(productId)),

})

export default connect(null, mapDispatchToProps)(ProductInventory);
