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
    const [token, setToken] = useState(sessionStorage.getItem('validator'));
    const history = useHistory()
    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response.status === 401) {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('validator')
        setCurrentUser({})
        history.push('/auth/login')
      }
      return new Promise((resolve, reject) => {

        reject(error);
      })
    })
    useEffect(() => {
      setToken(sessionStorage.getItem("validator"));
      



    }, [setCurrentUser]);
    return (
        <Route {...otherProps} render={(props) => (
            token && isAuthenticated ?
                <Component currentUser={currentUser} {...props}/> :
                <Redirect to='/auth/login'/>
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
          if (error.response.status === 401) {
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('validator')
            setCurrentUser({})
            history.push('/auth/login')
          }
          if (error.response.status === 403) {
            history.push('/403')
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
