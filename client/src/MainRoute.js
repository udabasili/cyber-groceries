import React, { PureComponent } from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import HomePage from './pages/home-page'
import Navigation from './components/navigation.component'
import AuthPage from './pages/auth-page'
import CheckOutPage from './pages/checkout-page'
import ProductPage from './pages/product'
import AboutPage from './pages/contact-page'
import Footer from './components/footer.component'
import AdminRoute from './pages/admin/admin';
import NotFoundPage from './components/not-found'
import { connect } from 'react-redux'
import { toggleUserDropdown, setConsent, confirmUserToken, setCurrentUser, getCsrfToken } from './redux/actions/user.action'
import { toggleCartDropDown } from './redux/actions/cart.action'
import { getAllProducts } from './redux/actions/product.action'
import { removeError } from './redux/actions/error.action'
import AccessDenied from './components/access-denied.component'
import { AdminProtectedRouteWithRedux, ProtectedRouteWithRedux} from './components/protected-route.component'
import CheckConsent from './components/check-consent.component'
import ChangePassword from './components/change-password.component';
import ResetPassword from './pages/reset-password-page'
import { toast, ToastContainer } from 'react-toastify'

getCsrfToken()
class MainRoute extends PureComponent {
    constructor(props){
        super(props);
        this.state = {

        }

    }

    componentDidMount(){
        
        const {toggleCartDropDown, isAuthenticated, toggleUserDropdown} = this.props
        this.props.getAllProducts()
            .then((result) => {
              
            }).catch((err) => {
                toast.error(err)
            });
        toggleCartDropDown(true)
        if(isAuthenticated){
            toggleUserDropdown(true)
        }
       
    }


    componentWillUnmount(){
        localStorage.clear()
    }
    

    render(){
        const {
            currentUser,
            isAdmin,
            isAuthenticated,
            removeError,
            history,
            toggleUserDropdown,
            toggleCartDropDown,
            acceptedTerm
        } = this.props;

        history.listen(()=>{
            removeError()
            toggleCartDropDown(true)
            toggleUserDropdown(true)
        })
        return (
            <React.Fragment>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                />
                <Navigation currentUser={currentUser} isAdmin={isAdmin} isAuthenticated={isAuthenticated}/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/reset-password' component={ChangePassword}/>
                    <Route exact path='/forgot-password' component={ResetPassword}/>
                    <Route exact path ='/auth/login' render={(props) =>(
                        isAuthenticated && sessionStorage.getItem('validator') ?
                        <Redirect to='/'/> :
                        <AuthPage auth='login' {...props}/>
                    )} />
                    <Route exact path ='/auth/register' render={(props) =>(
                        isAuthenticated && sessionStorage.getItem('validator') ?
                        <Redirect to='/'/> :
                        <AuthPage auth='register' {...props}/>
                    )} />
                    <ProtectedRouteWithRedux 
                        exact path ='/checkout' 
                        currentUser={currentUser}  
                        isAuthenticated={isAuthenticated}
                        component={CheckOutPage}/>
                    <Route  path='/products'  component={ProductPage}/>
                    <Route exact path ='/contact' component = {AboutPage}/>
                    <AdminProtectedRouteWithRedux  
                        path='/admin' 
                        currentUser={currentUser} 
                        isAuthenticated={isAuthenticated}
                        isAdmin={isAdmin} 
                        component={AdminRoute}/>
                    <Route  path="/404" component={NotFoundPage} />
                    <Route  path="/403" component={AccessDenied} />
                    <Redirect to='/404'/>
                </Switch>
                <Footer/>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    isAdmin: state.user.isAdmin,
    isAuthenticated: state.user.isAuthenticated,
    acceptedTerm: state.acceptTerms.hasAcceptedTerms,

})

const mapDispatchToProps = (dispatch) => ({
    toggleUserDropdown: (hideCart) => dispatch(toggleUserDropdown(hideCart)),
    toggleCartDropDown: (hideCart) => dispatch(toggleCartDropDown(hideCart)),
    getAllProducts: () => dispatch(getAllProducts()),
    removeError: () => dispatch(removeError()),
    setConsent: (acceptedTerm) => dispatch(setConsent(acceptedTerm)),
    confirmUserToken: () => dispatch(confirmUserToken()),
    setCurrentUser: (user) =>dispatch(setCurrentUser(user))


})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainRoute))