import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Loading from '../../components/loading.componet'
import Order from '../../components/order.component'
import Search from '../../components/search.component'
import { setAllUsersOrder } from '../../redux/actions/admin.action'

class OrdersPage extends Component {
    state ={
        showModal: false,
        items: null,
        searchString: '',
        order: null,
        isLoading: false,
        orders: null

    }

    modalHandler = (value, order=null) => {
        this.setState((prevState) =>({
            ...prevState,
            showModal: value,
            order
        }))
    }

    allOrderHandled = () =>{
        this.setState((prevState) => ({
            ...prevState,
            isLoading: true
        }))
        const orders = this.state.orders.filter((order) =>(
            order.orderFulfilled === true
        ))
        this.props.setAllUsersOrder(orders)
            .then((result) => {
                this.setState((prevState) => ({
                    ...prevState,
                    isLoading: false
                }))
                toast.success('Orders Successfully Updated ')
            }).catch((err) => {
                this.setState((prevState) => ({
                    ...prevState,
                    isLoading: false
                }))
                toast.error(err)
            });
    }


    componentDidMount(){
        this.setState((prevState) =>({
            ...prevState,
            orders: this.props.orders
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.orders !== this.props.orders){
            this.setState((prevState) =>({
                ...prevState,
                orders: this.props.orders
            }))
        }
    }

    searchUser = (e) => {
        const {value} = e.target
        this.setState((prevState) =>({
            prevState,
            searchString: value
        }))

    }

    setCheckedValue = (orderFulfilled, id) =>{

        const {orders} = this.state
        orders.map((order) =>{
            if(order.id === id){
                order.orderFulfilled = orderFulfilled
            }
            return order
        })
        this.setState((prevState) => ({
            ...prevState,
            orders,
            showModal: false
        }))
        toast.success('Order Completed')

    }

    calculateTotal =(orders) =>{

        return orders.reduce((total, current) =>(
            total += current.total
        ),0)
    }

    

    render() {
        const {orders, isLoading} = this.state
        let filteredOrders = []
        const {showModal, items,  searchString} = this.state
        if(orders !== null && orders !== undefined){
            filteredOrders = orders.filter((order) => {
                if (!searchString) {
                    return order
                } else{
                    return order.currentUser.username.includes(searchString.toLowerCase()) ||
                    order.currentUser.userId.includes(searchString.toLowerCase())
                    
                }
            })
        }
         
        return (
            <div className="orders-list">
                <ToastContainer position='top-center' autoClose={2000} hideProgressBar={true} />
                { showModal &&
                    <Order 
                        items={items} 
                        order={this.state.order}
                        setCheckedValue={this.setCheckedValue}
                        />
                }
                {isLoading &&<Loading/>}
            	<Search searchUsersHandler={this.searchUser}/>
                <table>
                    <thead>
                        <tr>
                            <th>{"  "}</th>
                            <th>UserId</th>
                            <th>Username</th>
                            <th>No of Orders</th>
                            <th>{" "}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {( orders !== undefined && orders ) &&
                            filteredOrders.map((order) => (
                            <tr key={order.id} id={order.id} onClick={() => (
                                this.modalHandler(
                                    true, 
                                    order
                                ))}>
                                <td>
                                    <input 
                                        type='checkbox' 
                                        className='order-fulfilled' 
                                        value = {
                                            order.orderFulfilled
                                        }
                                        id={order.id} checked={order.orderFulfilled}/>
                                </td>
                                <td>{order.currentUser.userId.split('_')[1]}</td>
                                <td>{order.currentUser.username}</td>
                                <td>{order.cartItems.length}</td>
                                <td>${order.total}</td>
                            </tr>
                    ))}
                    </tbody>
                </table>
                <div className='total'>
                    {`Total: $${this.calculateTotal(filteredOrders)}`}
                </div>
                <p className='btn' onClick={this.allOrderHandled}>
                    All Orders Handled
                </p>
           </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orders: state.admin.orders
})

const mapDispatchToProps = {
    setAllUsersOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage)
