import React from 'react';
import { Redirect,Route } from 'react-router';
import { useProfile } from './context/profile.context';
import {Spinner} from 'react-bootstrap'

const PrivateRoute = ({children, ...routeProps})=>{
    const {profile,loading} = useProfile();

    // if profile of user doesn't exist redirect to signin page
    if(loading && !profile){
        return(
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }
    if(!profile){
        return(
            <Redirect to="/signin"/>
        )
    }
    // else display the home component
    return <Route {...routeProps}>
        {children}
    </Route>
}

export default PrivateRoute;