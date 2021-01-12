import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { confirmUserToken, setCurrentUser } from '../redux/actions/user.action';
import { connect } from 'react-redux';
import axios from 'axios'


function ProtectedRoute({
    component: Component, 
    isAuthenticated,
    confirmUserToken,
    setCurrentUser,
    currentUser, 
    ...otherProps}) {
    const history = useHistory()
    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem('userId');
        error.response.data = 'Please login again'
        setCurrentUser({})
        history.push('/auth/login')
      }
      return new Promise((resolve, reject) => {
        console.log(error.response)
        reject(error);
      })
	})
	
    return (
        <Route {...otherProps} render={(props) => (
            isAuthenticated ?
                <Component currentUser={currentUser} {...props}/> :
                <Redirect to={{
                  pathname:'/auth/login',
                  state: {
                    from :otherProps.location
                  }

                }}/>
            )
        } />
    )
            
}


const mapDispatchToProps = (dispatch) =>({
    confirmUserToken: () => confirmUserToken(),
    setCurrentUser: (user) => dispatch(setCurrentUser(user))

})


export const ProtectedRouteWithRedux = connect(null, mapDispatchToProps)(ProtectedRoute)

export function AdminProtectedRoute({
		component: Component,
		isAuthenticated,
		isAdmin,
		currentUser,
		...otherProps
    }) {
        const [checkIfAdmin, setCheckIfAdmin] = useState(isAdmin);
        const history = useHistory()
        axios.interceptors.response.use((response) => {
          return response;

        }, (error) => {
          if (error.response.status === 403) {
            setCurrentUser({})
            history.push('/auth/login')
            error.response.data = 'Please login again'
          }

          if (error.response.status === 401) {
            sessionStorage.removeItem('userId');
            setCurrentUser({})
            history.push('/auth/login')
            error.response.data = 'Please login again'
          }
          if (error.response.data.toLowerCase().includes('ECONNREFUSED'.toLowerCase())) {
            error.response.data = 'Something went wrong. Try again'
          }
          return new Promise((resolve, reject) => {
            reject(error);
          })
        })
        useEffect(() => {
            setCheckIfAdmin(isAdmin)
        },[isAdmin]);
	return (
		<Route
			{...otherProps}
			render={(props) =>
				checkIfAdmin && isAuthenticated ? (
				<Component currentUser={currentUser} {...props} />
				) : (
				<Redirect to="/403" />
			)
		}
    />
  );
}

export const AdminProtectedRouteWithRedux = connect(null, mapDispatchToProps)(AdminProtectedRoute)
