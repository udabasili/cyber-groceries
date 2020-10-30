import React, { Component } from 'react'
import CardList from '../../components/card-list.component';
import SortItems from '../../components/sort-items.component';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AdminProducts extends Component {
	constructor(props){
		super(props);
		this.state = {
			products: props.products
		}
  }
	componentDidMount(){
		if (this.props.history.location.state) {
			toast.success(this.props.history.location.state.message);
		}
	}
	

	componentDidUpdate(prevProps, prevState){
		if(prevProps.products !== this.props.products){
		this.setState({products: this.props.products})
		}
	}
		setFilter = (value) => {
			this.setState({
				products:
				value === "low" ? 
				this.state.products.sort((a, b) => a.price - b.price) : 
				this.state.products.sort((a, b) => b.price - a.price)
			});
		
	}
    render() {
		const {isAdmin} = this.props
		const {products} = this.state
        return (
			<div className="admin-products">
				<a href='/admin/add-product/grams' className='btn'>Add Product</a>
				<div className="admin-overview">
				<SortItems setValue={this.setFilter}/>
				<CardList products={products} isAdmin={isAdmin} />
				</div>
			</div>
        );
    }
}



export default AdminProducts;
