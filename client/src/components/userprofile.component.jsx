import React, { Component } from 'react'
 import {
     connect
 } from 'react-redux'
import Modal from './modal.component';
import EditProfile from './edit-profile.component';
import ChangeEmail from './change-email.component';
import { toast } from 'react-toastify';
import { deleteUser, disableUser, getUserOrderById } from '../redux/actions/admin.action';
import UserOrders from './user-orders.component';
import { logOut } from '../redux/actions/user.action';
import Loading from './loading.componet';

class UserProfile extends Component {
     constructor(props){
         super(props);
         this.state = {
             user: {},
             orders:[],
            showModal: false,
            isLoading: false,
            showEditProfileWindow:false,
            showPasswordWindow:false,
            showEmailWindow: false         
        }
     }

     componentDidMount(){
        const {match} = this.props
        if (match.params.userId) {
            this.userOrders(match.params.userId)
        }
     }

     userOrders = (userId) =>{
         
         getUserOrderById(userId)
            .then((result) => {
                this.setState((prevState) =>({
                    ...prevState,
                    orders: result
                }))
            }).catch((err) => {
                toast.error(err)
            });
     }

     showModalWindowHandler = (type)=>{
        switch (type) {
            case 'email':
                this.setState((prevState) => ({
                    ...prevState,
                    showModal: true,
                    showEditProfileWindow: false,
                    showPasswordWindow: false,
                    showEmailWindow: true

                }))
                
                break;
            case 'password':
                this.setState((prevState) => ({
                    ...prevState,
                    showModal: true,
                    showEditProfileWindow: false,
                    showPasswordWindow: true,
                    showEmailWindow: false

                }))

                break;
            case 'profile':
                this.setState((prevState) => ({
                    ...prevState,
                    showModal: true,
                    showEditProfileWindow: true,
                    showPasswordWindow: false,
                    showEmailWindow: false

                }))

                break;
            default:
                break;
        }
     }

     setToastMessage = (type, message) =>{
        switch (type) {
            case 'success':
                toast.success(message)
                break;
            case 'error':
                toast.error(message)
                break;
            default:
                break;
        }
     }
    
     closeModal = () =>{
        this.setState((prevState) =>({
            ...prevState,
            showModal: false,
            showEditProfileWindow:false,
            showPasswordWindow:false,
            showEmailWindow: false,

        }))
     }

    deleteUserUserHandler = (userId) =>{
        const {currentUser, deleteUser, logOut, history} = this.props
        this.setState((prevState) =>({
             ...prevState,
             isLoading: true
         }))
        deleteUser(userId)
            .then((result) => {
                toast.success('Profile Deleted')
                if(userId === currentUser._id){
                    this.setState((prevState) =>({
                        ...prevState,
                        isLoading: false
                    }))
                    logOut()
                    return;
                }
                else{
                    this.setState((prevState) =>({
                        ...prevState,
                        isLoading: false
                    }))
                    history.push('/admin/users')
                }
            }).catch((err) => {
                this.setState((prevState) =>({
                    ...prevState,
                    isLoading: false
                }))
                toast.error('Something Went wrong. Try again later')

            });
    }

    disableUserUserHandler = (userId) => {
        this.setState((prevState) =>({
             ...prevState,
             isLoading: true
         }))
        const {
            currentUser,
            disableUser,
            logOut,
        } = this.props
        disableUser(userId)
            .then((result) => {
                toast.success('Profile Disabled')
                if (userId === currentUser._id) {
                    this.setState((prevState) =>({
                        ...prevState,
                        isLoading: false
                    }))
                    logOut()
                    return;
                }
            }).catch((err) => {
                this.setState((prevState) =>({
                        ...prevState,
                        isLoading: false
                    }))
                toast.error('Something Went wrong. Try again later')

            });
    }

    
     render() {
         const {
                showEditProfileWindow, 
                showModal, 
                showEmailWindow,
                orders
            } = this.state
            const {match, allUsers} = this.props
            let user = null
            if (match.params.userId){
                user = allUsers.find((u) => (
                    u._id === match.params.userId
                ))
            }
            
            return (
                <React.Fragment>
                    {this.state.isLoading && <Loading/>}
                    {showModal &&
                        <Modal onClose={this.closeModal}>
                            {showEmailWindow && (
                            <ChangeEmail userData={user} onClose={this.closeModal} onToastMessage={this.setToastMessage}/>
                            )}
                            {showEditProfileWindow && (
                                <EditProfile userData={user} onClose={this.closeModal} onToastMessage={this.setToastMessage}/>
                            )}

                        </Modal>
                    }
                {
                    (match.params.userId && user) && (
                        <div className='user-profile'>
                            <div className='user-profile__details'>
                                <div className='user-profile__header'>
                                    <div className='user-profile__avatar'>
                                        {user.username[0]}
                                    </div>
                            </div>
                            {Object.entries(user).sort((a,b) => b-a).map(([key, value], index) =>(
                                key !== '_id' &&
                                <div key={index}>
                                    <div className='label'>{`${key}:`}</div>
                                    <div className='value'>{`${value}`}</div>
                                </div>
                            ))}
                        </div>
                        <div className='user-profile__finance'>
                            <UserOrders orders={orders}/>

                        </div>
                        <div className='user-profile__panel'>
                                <p className='btn' onClick={() =>this.showModalWindowHandler('profile')}>
                                    Edit profile
                                </p>
                                <p className='btn' onClick={() =>this.deleteUserUserHandler(user._id)}>
                                    Delete profile
                                </p>
                                <p className='btn' onClick={() =>this.disableUserUserHandler(user._id)}>
                                    Disable profile
                                </p>
                                <p className='btn'  onClick={() =>this.showModalWindowHandler('email')}>
                                    Edit Email
                                </p>
                        </div>
                    </div>
            )}
            </React.Fragment>

        )
     }
 }
 
const mapStateToProps = (state) => ({
    allUsers: state.admin.allUsers,
    currentUser: state.user.currentUser,


})

const mapDispatchToProps = {
    disableUser,
    deleteUser,
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
 


