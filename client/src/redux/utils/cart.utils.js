export const addToCart = (addedItem , size, cartItems) =>{
    try {
        const existingItem = cartItems.find((item) =>(
            item._id === addedItem._id && item.size == size
        ))

        if(existingItem ){
            if(addedItem.type === 'grams'){
                
                return cartItems.map((item) =>(
                    item._id === addedItem._id && item.size === size ?
                        ({...item, size, quantity: (item.quantity + 1)}) :
                    item
            ))
            }
            
        }
        console.log(existingItem)
        return [...cartItems, {...addedItem, size, quantity: 1}]
    } catch (error) {
        console.error(error)
    }
}

export const removeFromCart = (removedItem , size, cartItems) =>{
    try {
        const existingItem = cartItems.find((item) =>(
            item._id === removedItem._id
        ))
        
        if(existingItem.quantity === 1 ){
            return cartItems.filter((item) =>(
                item._id !== removedItem._id && item.size === size
            ))

        }
        console.log(existingItem.quantity)
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