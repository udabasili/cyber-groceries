const loggerFunction = require("../loaders/logger");
const generateToken = require('../loaders/token');
const { db, auth, adminControl } = require("../loaders/firebase");
const userRef = db.ref('/users')
const { setUserChartData } = require("./admin");

class UserService{
    constructor(user=null, userId=null){
        this.user = user;
        this.userId = userId
    }

    async signUp(){
        let admin = false
        if (this.user.email.split('@')[1] === 'administrator.ca') {
            admin = true
        }
        const response = await adminControl.createUser({
            displayName: this.user.username,
            email: this.user.email,
            password: this.user.password,
        })
        const uid = response.uid
        if(admin){
            await setUserChartData()
            await adminControl.setCustomUserClaims(uid, {admin: true})
        }
        userRef.child(uid).set({    
            _id:  uid,
            name: this.user.name,
            username: this.user.username,
            userId: this.user.userId,
            email: this.user.email,
            isAdmin: admin,
            ageVerified: false

        })
        const newUser = {
            _id: uid,
            name: this.user.name,
            username: this.user.username,
            userId: this.user.userId,
            isAdmin: admin,
            ageVerified: false
        }

        const generateUserToken = generateToken(newUser)
        loggerFunction('info', `token generated  for user ${newUser.username}`)
        loggerFunction('info', `new user ${newUser.username} creation completed`)
        return {newUser, generateUserToken}

    }

    async signIn(){
        
        const response = await auth.signInWithEmailAndPassword(
            this.user.email.trim(), 
            this.user.password
        )
        let uid = response.user.uid
        const snapshot = await userRef.child(uid).once('value')
        if(snapshot.val() === null){
            throw new Error("Email doesn't exist. Please register")

        }        
        const newUser = snapshot.val()
        if ( newUser.isAdmin && this.user.email.split('@')[1] === 'administrator.ca') {
            await setUserChartData()
            await adminControl.setCustomUserClaims(uid, {
                admin: true
            })
        }

        delete newUser.email
        const generateUserToken = generateToken(newUser)
        loggerFunction('info', `token generated  for user ${newUser.username}`)
        loggerFunction('info', `user ${newUser.username} has successfully  logged in`)
            return {
                newUser,
                generateUserToken
            }       
    }

    static async  signOut(userId) {
        await auth.signOut()
        loggerFunction('info', `user has successfully  logged out`)
        return 'Successfully Logged Out'
    }


    static async sentResetPassword(email){
        let url;
        if (process.env.NODE_ENV === 'development'){
            url = 'http://localhost:3000/auth/register'
        }else{
             url = 'https://www.highway420canna.ca/auth/register'
        }
        const actionCodeSettings = {
            url

        };

        await auth.sendPasswordResetEmail(email,actionCodeSettings)
        return 'Email Sent'
    }

    static async  resetPassword(code, password){
        await auth.confirmPasswordReset(code,password)
        const response = 'success'
        return response
        
    }
}

module.exports = UserService;