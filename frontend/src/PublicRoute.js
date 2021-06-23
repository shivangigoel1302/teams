import React from 'react';
import { Redirect,Route } from 'react-router';
import { useProfile } from './context/profile.context';
import {Spinner} from 'react-bootstrap'

const PublicRoute = ({children, ...routeProps})=>{
    const {profile,loading} = useProfile();

    if(loading && !profile){
        return(
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

    // if profile of user exists then redirect to home page
    if(profile){
        return(
            <Redirect to="/"/>
        )
    }

    // else display the sign in component
    return <Route {...routeProps}>
        {children}
    </Route>
}

export default PublicRoute;