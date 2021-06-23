import React, { useState } from 'react';
import firebase from 'firebase/app';
import '../css/SignIn.css';
import { auth ,database} from '../misc/firebase';
import { useModelState } from '../misc/custom-hooks';
import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


const SignIn = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [SignUpemail,setSignUpEmail] = useState("");
    const [SignUppassword,setSignUpPassword] = useState("");
    const {isopen,open,close} = useModelState();

    const signInWithProvider = async (provider) =>{
        try{
            const {additionalUserInfo,user}= await auth.signInWithPopup(provider);
            if(additionalUserInfo.isNewUser){
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }
            alert("signed in succesful");
        }
        catch(err){
            alert("couldn't sign in");
        }
    }

    const onGoogleSignin = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider());
    };

    const registerUser=  async()=>{

        const {additionalUserInfo,user} =  await auth.createUserWithEmailAndPassword(SignUpemail, SignUppassword)
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            window.alert("Message: "+ errorMessage);
            });
        try{
            if(additionalUserInfo.isNewUser){
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }
            alert("signed in succesful");
        }
        catch(err){
            alert(err.message);
        }
        
       

   }

    const onEmailSignIn = (event) =>{
          event.preventDefault();
          auth.signInWithEmailAndPassword(email,password)
          .then(createdUser=>{
              alert("user Signed in");
          })
          .catch(err=>{
              alert(err.message);
          })
          
    }

    
    const onEmail=(event)=>{
       setEmail(event.target.value);
    }
    const onPassword=(event)=>{
        setPassword(event.target.value);
    }

    const onSignUpEmail=(event)=>{
        setSignUpEmail(event.target.value);
    }
    
    const onSignUpPassword=(event)=>{
        setSignUpPassword(event.target.value);
    }

  

    return(
        <div >
            <div className="form">
               <h3>Sign in using</h3>
               <hr/>
               <button className="signInButton" onClick={onGoogleSignin}>using google</button>
               <br/>
                <div>
                <hr/> 
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={onEmail}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={onPassword} />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={onEmailSignIn} >Sign in</button>
                <button onClick={open}>Sign up</button>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={isopen}
                    onHide={close}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        <h4>Sign up</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control signupEmail" placeholder="Enter email" value={SignUpemail} onChange={onSignUpEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control signupPassword" placeholder="Enter password" value={SignUppassword} onChange={onSignUpPassword} />
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <button type="submit" className="btn btn-dark btn-lg btn-block signin" onClick={registerUser} >Sign up</button>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
      </div>
      
    </div>
    )
}

export default SignIn;