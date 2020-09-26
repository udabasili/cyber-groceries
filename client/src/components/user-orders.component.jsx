import React from 'react'

export default function UserOrders({orders}) {
    console.log(orders)
    return (
        < div className = 'user-list order-list' >
            <h3 className='heading-tertiary'>
                User Orders
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Quantity </th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && 
                        orders.map((order) =>(
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.cartItems.length}</td>
                                <td>{order.total}</td>
                            </tr>
                        ))    
                    }
                </tbody>
			
            </table>
            
        </div>
    )
}
