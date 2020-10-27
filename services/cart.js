const { db } = require("../loaders/firebase");
const loggerFunction = require("../loaders/logger");
const purchaseRef = db.ref('orders');
const { sendGrid, templateId } = require("../config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(sendGrid);
const productsRef = db.ref('/products')

class CartService{
    constructor(email, currentUser, cartItems, total) {
        this.email = email,
        this.currentUser = currentUser,
        this.cartItems = cartItems,
        this.total = total
    }

    async removeItemsFromStock(id, quantity){
        const snapshot = await productsRef.child(id).once('value')
        let data = {...snapshot.val()}
        const exist = snapshot.val() !== null
        if(exist){
            data.quantity = data.quantity - quantity      
            await productsRef.child(id).update({
                quantity: data.quantity
            })

        }

    }

    /**
     *
     * function confirmOrder -send confirmation email to user that order
     * @return {String} success
     * @memberof CartService
     */
    async confirmOrder(){
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const template_params = {
            "toName": this.currentUser.username,
            "userEmail": this.email,
            "total": this.total,
            "userId": this.currentUser.userId,
            "currentDate": date
        }
        const msg = {
          to: this.email,
          from: "juliannapeterpaul@highway420canna.ca", // Use the email address or domain you verified above
          subject: "Sending with Twilio SendGrid is Fun",
          text: "and easy to do anywhere, even with Node.js",
          html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        };
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const response = await sgMail.send({
          from: "juliannapeterpaul@highway420canna.ca",
          personalizations: [
            {
              to: [
                {
                  email: this.email,
                },
              ],
              dynamicTemplateData: {
                username: this.currentUser.username,
                userId: this.currentUser.userId,
                total: this.total,
                currentDate: date,
              },
            },
          ],
          templateId: templateId
        });
        if (response[0].statusCode === 202) {
          await purchaseRef.child(this.currentUser._id).push({
            currentUser: this.currentUser,
            cartItems: this.cartItems,
            orderDate: date,
            userId: this.currentUser._id,
            total: this.total,
            orderFulfilled: false
          });
          const itemArray = []
          const itemQuantity = {}
          const items  = Object.values(this.cartItems).map((item) =>{
              itemQuantity.id= item._id
              itemQuantity.itemTotal = (item._id === itemQuantity.id && itemQuantity.itemTotal !== undefined) ?
                item.quantity * item.size + itemQuantity.itemTotal : (item.quantity * item.size )
            return itemQuantity
          })
          items.forEach(async(item) => {
            await this.removeItemsFromStock(item.id, item.itemTotal)


          })

          return "success";
        } else {
          throw Error("Mail wasn't sent. Please try again later");
        }
           
    }
    
     
}


module.exports = CartService