import React,{useCallback} from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
import { NavLink } from "react-router-dom";
import { useProfile } from '../../context/profile.context';
import { Button } from 'react-bootstrap';
import { auth } from '../../misc/firebase';

const Dashboard = ()=>{

       const {profile} = useProfile();

       const onSignOut = useCallback(() => {

        auth.signOut().then(()=>{
            alert("sign out successfull");
        })
        .catch((err)=>{
            alert(err.message);
        }) 
    },[])
      

        return (
            <div
              style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
            >
              <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    Welcome {profile.email};
                    <hr style={{color:'white'}}/>
                </CDBSidebarHeader>
        
                <CDBSidebarContent className="sidebar-content">
                  
                </CDBSidebarContent>
        
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      padding: '20px 5px',
                    }}
                  >
                    <Button variant="danger" onClick={onSignOut}>logout</Button>
                  </div>
                </CDBSidebarFooter>
              </CDBSidebar>
            </div>
          );
  
}

export default Dashboard;