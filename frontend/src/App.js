import {Switch} from 'react-router-dom';
import { useEffect } from "react";
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { connectwithWebSocket } from "./wssConnection/client";
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { ProfileProvider } from './context/profile.context';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    useEffect(()=>{
        connectwithWebSocket();
    },[]);

    return(
          <ProfileProvider>
            <Switch>
                 {/* if user not signed in direct to signin page */}
                <PublicRoute path="/signin">
                    <SignIn/>                  
                </PublicRoute>
                
                {/* if user signed in direct to home page */}
                <PrivateRoute path="/">
                    <Home/>
                </PrivateRoute>
            </Switch>
            </ProfileProvider>
        
    );
}

export default App;