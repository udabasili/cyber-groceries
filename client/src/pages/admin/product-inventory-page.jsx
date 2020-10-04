import React, { Component } from 'react'

export default class ProductInventory extends Component {
    render() {
        const { inventory } = this.props;
         return (
           <div className="user-list">
             <table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Category</th>
						<th>Strain</th>
						<th>Quantity</th>
					</tr>
				</thead>
               <tbody>
					{(inventory.length > 0 && inventory !== undefined ) &&
					inventory.map((product) => (
					<tr key={product._id}>
						<td>{product.name}</td>
						<td>${product.price}</td>
						<td>{product.category}</td>
						<td>{product.strain}</td>
						<td>{product.quantity}</td>
					</tr>
					))}
               </tbody>
             </table>
           </div>
         );
    }
}
