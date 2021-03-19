import React, { Component } from 'react';
import { addProduct, editProduct, editProductWithUrl } from '../../redux/actions/product.action';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { addError } from '../../redux/actions/error.action';
import Loading from '../../components/loading.componet';
import { toast } from 'react-toastify';

class AddProduct extends Component {
	constructor(props){
		super(props);
		this.state = {
			data:{
				name:'',
				price:'',
				category:'dairy',
				quantity: '',
				
			},
			imageFile:'',
			imageUrl: null,
			imageUploaded: false,
			isLoading: false,
			nextRoute: null
		}
  }
  
  componentDidMount(){
		if(this.props.editing){
			let filePath = document.querySelector(".image-upload__message");
			let item = this.props.products.find((item) => item._id === this.props.match.params.itemId);
			if(this.props.history.location.state){
				this.setState((prevState) =>({
					...prevState,
					nextRoute: this.props.history.location.state.location
				}))
			}
			if(item){
				filePath.value = item.imageUrl;
				this.setState((prevState) => ({
					...prevState,
					data: {
						name: item.name,
						price: item.price,
						category: item.category,
						quantity: item.quantity,
					},
					imageUrl: item.imageUrl,
				})
			);
					
			}
		}
  }


	onImageUploadHandler = () => {
		let fileUpload = document.querySelector(".image-upload__input");
		let filePath = document.querySelector(".image-upload__message"); 
		fileUpload.click()
		fileUpload.onchange = () => {
			let fileName = fileUpload.value.split("\\")[
				fileUpload.value.split("\\").length - 1
			];
			filePath.value = fileName;
			this.setState((prevState, props) => ({
				...prevState,
				imageFile: fileUpload.files[0],
				imageUploaded: true,
				imageUrl: null
			}));
			
		}
	}

	onChangeHandler = (e) =>{
		const name = e.target.name
		const value = e.target.value
		this.setState((prevState) => ({
			...prevState,
			data:{
				...prevState.data,
				[name]: value
			}
		}))
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		this.setState((prevState) =>({
			...prevState,
			isLoading: true
		}))
		const data = {
			...this.state.data,
		}
		const image = this.state.imageFile
		if(this.props.editing){
			if(this.state.imageUrl){
				data.imageUrl = this.state.imageUrl
				this.props.editProductWithUrl(
					data,
					this.props.match.params.itemId
				).then((result) => {
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
					}))
					this.props.history.push({
						pathname: this.state.nextRoute ? this.state.nextRoute:  '/admin/products',
						state: {
							message: 'Product edited successfully'
						}
					});
				}).catch((error) => {
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
					}))
					toast.error(error)
				})
			}else{
				this.props.editProduct(
					data,
					image,
					this.props.match.params.itemId
				).then((result) => {
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
					}))
					this.props.history.push({
						pathname: '/admin/products',
						state: {
							message: 'Product edited successfully'
						}
					});
				}).catch((err) => {
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
					}))
					toast.error(err)

				})
			}
			
        
		}else{
			if (!this.state.imageUploaded) {
				toast.error('Image must be uploaded')
				return;
			}
			this.props.addProduct(data, image)
				.then((result) => {
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
					}))
					this.props.history.push({
					pathname: '/admin/products',
					state:{message: 'Product added successfully'}
				});
				})
        		.catch((error) =>{
					this.setState((prevState) => ({
						...prevState,
						isLoading: false
					}))
				toast.error(error)
			})

		}
		
	}

	render() {
		const {data} = this.state
		const {title, editing} = this.props
		let item;
		if (this.props.products !== null){
			item = this.props.products.find((item) => item._id === this.props.match.params.itemId);

		}
	let components = ( 
		<div className="add-product">
			{this.state.isLoading && <Loading/>}
			<h2 className="heading-secondary">{title}</h2>
			<form className="form " onSubmit={this.onSubmitHandler}>
				<div className="form__component">
					<div className="form__group">
						<input
							type="text"
							name="name"
							id="name"
							value={data.name}
							onChange={this.onChangeHandler}
							className="form__input"
							required
						/>
						<label htmlFor="name" className="form__label">
							Name
						</label>
						</div>
					</div>
					<div className="form__component">
						<div className="form__group">
						<input
							type="number"
							name="price"
							onChange={this.onChangeHandler}
							value={data.price}
							pattern="[0-9]"
							id="price"
							className="form__input"
							required
						/>
						<label htmlFor="price" className="form__label">
							Unit Price
						</label>
						</div>
					</div>
					<div className="form__component quantity">
						<div className="form__group ">
							<input
								type="number"
								name="quantity"
								onChange={this.onChangeHandler}
								value={data.quantity}
								pattern="[0-9]"
								placeholder='Total amount of item'
								id="quantity"
								className="form__input"
								required
							/> 
						<label htmlFor="quantity" className="form__label">
							Quantity
						</label>
						</div>
						<div className="form__select">
						<select
							className="card__select"
							name="category"
							value={data.category}
							id="category"
							onChange={this.onChangeHandler}
						>
							<option value="dairy">Dairy</option>
							<option value="vegetable">Vegetable </option>
							<option value="fruit">Fruit</option>
							<option value="bakery">Bakery </option>
							<option value="vegan">Vegan</option>
							<option value="meat">Meat</option>
						</select>
						</div>
					</div> 
				
				
					<div className="form__group-image">
						<input
						type="file"
						className="image-upload__input"
						name="image"
						accept="image/*"
						/>
						<input
						type="text"
						className="image-upload__message"
						disabled
						placeholder="Upload Product Image"
						/>
						<button
						className="image-upload__button"
						type="button"
						onClick={this.onImageUploadHandler}
						>
						{" "}
						Browse
						</button>
					</div>
					<input type="submit" className="btn" value="Submit" />
				</form>
		</div>
	)
	return (
		!editing ?
			components :
				item ?
			components :
				<Redirect to='/404'/>			
		);
	}
}


const mapStateToProps = (state) => ({
  products: state.product.products,
  error: state.error.error
});

const mapDispatchToProps = (dispatch) => ({
	addProduct: (product, imageUrl) => dispatch(addProduct(product, imageUrl)),
	editProduct: (product, imageUrl, productId) => dispatch(editProduct(product, imageUrl, productId)),
	editProductWithUrl: (product, productId) => dispatch(editProductWithUrl(product, productId)),
	addError: (error) => dispatch(addError(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);