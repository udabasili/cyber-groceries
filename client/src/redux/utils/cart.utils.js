export const addToCart = (addedItem , addedQuantity, cartItems) =>{
    try {
        const existingItem = cartItems.find((item) =>(
            item._id === addedItem._id 
        ))

        if(existingItem ){
                if (addedQuantity) {
                    return cartItems.map((item) =>(
                        item._id === addedItem._id  ?
                        ({...item,  quantity: (item.quantity + addedQuantity)}) :
                        item
                    ))
                }
                return cartItems.map((item) =>(
                    item._id === addedItem._id  ?
                        ({...item,  quantity: (item.quantity + 1)}) :
                    item
            ))
            
            
        }
        return [...cartItems, {...addedItem, quantity: addedQuantity}]
    } catch (error) {
        console.error(error)
    }
}

export const removeFromCart = (removedItem , cartItems) =>{
    try {
        const existingItem = cartItems.find((item) =>(
            item._id === removedItem._id
        ))
        
        if(existingItem.quantity === 1 ){
            return cartItems.filter((item) =>(
                item._id !== removedItem._id
            ))

        }
        return cartItems.map((item) => (
            item._id === removedItem._id ?
            ({
                ...item,
                quantity: item.quantity  - 1
            }) :
            item
        ))
    } catch (error) {
        console.error(error)
    }
}