import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth,database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({children}) =>{
    const [profile,setProfile] = useState(null);
    const [loading,setisLoading] = useState(true);

    useEffect(()=>{
        let userRef;
        const authUnsub = auth.onAuthStateChanged(authObj=>{
            if(authObj){
                userRef = database.ref(`profiles/${authObj.uid}`);
                userRef.on('value',snap=>{
                    const {name,createdAt} = snap.val();

                    const data ={
                        name,
                        createdAt,
                        uid:authObj.uid,
                        email:authObj.email,
                    };

                    setProfile(data);
                    setisLoading(false);
                })
             } else{
                    if(userRef){
                        userRef.off()
                    }
                    setProfile(null);
                    setisLoading(false);
            }
        });

        return ()=>{
            authUnsub();
            if(userRef){
                userRef.off();
            }
        }
    },[]);

    return (
    <ProfileContext.Provider value={{loading,profile}}>
        {children}
    </ProfileContext.Provider>
    );
}

export const useProfile = ()=> useContext(ProfileContext);