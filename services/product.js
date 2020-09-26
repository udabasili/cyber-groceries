const { db } = require('../loaders/firebase')
const productsRef = db.ref('/products')
class Product {
    constructor(product=null, productId=null){
        this.product = product
        this.productId = productId
    }

    async getAllProducts (){
        let products = []
        let productsRecord = await productsRef.once('value') 

        productsRecord = productsRecord.val()
        for (let value in productsRecord){
            productsRecord[value]._id = value
            products.push(productsRecord[value])
        }
        return products;
    }

     async addProduct(){
        await productsRef.push({
            name: this.product.name,
            price: this.product.price,
            type: this.product.type,
            imageUrl: this.product.imageUrl,
            strain: this.product.strain,
            category: this.product.category,
            quantity: this.product.quantity
        })
        let products = await this.getAllProducts()
        return products

    }

    async removeProduct(){
        await productsRef.child(this.productId).remove()
        const products = await this.getAllProducts()
        return products
    }

    async editProduct(){
        await productsRef.child(this.productId).update({
            name: this.product.name,
            price: this.product.price,
            type: this.product.type,
            imageUrl: this.product.imageUrl,
            strain: this.product.strain,
            category: this.product.category,
            quantity: this.product.quantity
        })
        let products = await this.getAllProducts()
        return products
       
    }

    
}

module.exports = Product