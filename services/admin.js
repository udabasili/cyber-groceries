const { AdminService } = require(".");
const { db,  adminControl } = require("../loaders/firebase");
const loggerFunction = require("../loaders/logger");
const userRef = db.ref('users')
const adminRef = db.ref('admin').child('graphs')
const purchaseRef = db.ref('orders')


class Admin {
    static async getAllUsers(){
        let allUsers = []
        let usersRecord = await userRef.once('value')
        usersRecord = usersRecord.val()
        for (let value in usersRecord) {
            allUsers.push(usersRecord[value])
        }
        loggerFunction('info','all users gotten')
        
        return allUsers
    }

    /**
     *Set the chart showing the numbers of registered users per month
     *
     * @static
     * @memberof Admin
     */
    static async setUserChartData() {
        let childCount = await (await userRef.once('value')).numChildren()
        const d = new Date()
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        await adminRef.child(`${monthNames[d.getMonth()]}-${d.getFullYear()}`).set({
            numberOfUser : childCount,
            date: {
                time: Date.now(),
                month: monthNames[d.getMonth()],
                year: d.getFullYear()
            }
        })
        loggerFunction('info', 'the user chart was set')

    }

    /**
     *
     *Get the user chart created above
     * @static
     * @return {array}  chartData
     * @memberof Admin
     */
    static async getUserChartData() {
        const chartData = []
        let snapshot = await adminRef.once('value')
        const exists = snapshot.val() !== null
        if (exists) {
            const chartRecord = snapshot.val()
            for (let key in chartRecord) {
                chartData.push({
                    numberOfUser: chartRecord[key].numberOfUser,
                    month: chartRecord[key].date.month
                })
            }
            return chartData
        }
    }



    static async editUserEmail(email, uid) {
        await adminControl.updateUser(uid, {
            email: email,
        })
        let allUsers = await this.getAllUsers()
        return allUsers
    }

    static async updateUserById(uid, userData) {
        await adminControl.updateUser(uid, {
            displayName: userData.username,
        })
        await userRef.child(uid).update({
            name: userData.name,
            username: userData.username,
            ageVerified: userData.ageVerified

        })
        let allUsers = await this.getAllUsers()
        loggerFunction('info', 'user was updated')
        return allUsers
    }

    static async deleteUserById(uid) {
        await adminControl.deleteUser(uid)
        await userRef.child(uid).remove()
        let allUsers = await this.getAllUsers()
        loggerFunction('info', 'user was deleted')
        return allUsers
    }

    static async disableUserById(uid) {
        await adminControl.updateUser(uid, {
            disabled: true,
        })
        let allUsers = await this.getAllUsers()
        return allUsers
    }

    static async enableUserById(uid) {
        await adminControl.updateUser(uid, {
            disabled: false,
        })
        let allUsers = await this.getAllUsers()
        return allUsers
    }

    static async getTotalPurchases() {
        let ordersRecord = []
        let snapshot = await purchaseRef.once('value')
        const exists = snapshot.val() !== null
        if(exists){
            let userRecord = snapshot.val()
            for (let value in userRecord) {
                let userId = value
                const orderRecord = userRecord[value]
                let itemTotal = 0
                let username;
                for (let key in orderRecord) {
                    username = orderRecord[key].currentUser.username
                    itemTotal += orderRecord[key].total

                }
                ordersRecord.push({
                    userId,
                    itemTotal,
                    username

                })
            }
        }
        
        return ordersRecord    
        
    }

     async setOrderById(userId, order) {
        await purchaseRef.child(userId).child(order.orderId).update({
            orderFulfilled: order.orderFulfilled
        })
       const ordersRecord = await Admin.getAllOrders()
       return ordersRecord
    }

    async getUserOrderById(userId){
        const orderRecord = []
        const snapshot = await purchaseRef.once('value')
        const exists = snapshot.val() !== null;
        if (exists) {
            const userOrderRecord = snapshot.val()
            for (let key in userOrderRecord) {
                if(userId === key){
                    const record = userOrderRecord[key]
                    for (let k in record) {
                        record[k].id = k
                        orderRecord.push(record[k])

                    }
                }
                
            }
        }
        return orderRecord
       
    }

    static async getAllOrders(){
        const orderRecord = []
        const snapshot = await purchaseRef.once('value')
        const exists = snapshot.val() !== null;
        if (exists) {
            const userOrderRecord = snapshot.val()
            for (let key in userOrderRecord) {
                const record = userOrderRecord[key]
                for(let k in record){
                    record[k].orderId = k
                    orderRecord.push(record[k])

                }
            }
        }
        return orderRecord

    }

     static async setAllOrders(orders) {
         async function removeOrderById() {
             for(let index = 0; index < orders.length; index++)
                await purchaseRef.child(orders[index].currentUser._id).child(orders[index].orderId).remove()

             
         }
        await removeOrderById()
        const orderRecord = await this.getAllOrders()
        return orderRecord

     }
     
}

module.exports = Admin