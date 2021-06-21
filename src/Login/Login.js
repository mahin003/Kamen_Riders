import React, { useContext, useState } from 'react';
import "./Login.css"
import { Form } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGit, faGoogle } from '@fortawesome/free-brands-svg-icons';

// firebase.initializeApp(firebaseConfig);

const Login = () => {
    let loginhistory = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedinUser, setLoggedUser] = useContext(UserContext);
   
    const googleprovider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {

        firebase.auth()
            .signInWithPopup(googleprovider)
            .then((result) => {
                // var credential = result.credential;
                // var token = credential.accessToken;
                const details = result.user;
                console.log(details.displayName);
                const signInUser = {
                    isSignedIn: true,
                    name: details.displayName,
                    email: details.email,
                    ride:loggedinUser.ride,
                    img:loggedinUser.img
                };
                
                setLoggedUser(signInUser);
                loginhistory.replace(from);
                console.log("userr ", signInUser)
            }).catch((error) => {

                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    const gitprovider = new firebase.auth.GithubAuthProvider();
    
    const handleGithubSignIn=(e)=>{
        firebase
        .auth()
        .signInWithPopup(gitprovider)
        .then((result) => {
            const details = result.user;
            console.log(details.displayName);
            const signInUser = {
                isSignedIn: true,
                name: details.displayName,
                email: details.email,
                ride:loggedinUser.ride,
                img:loggedinUser.img
            };
           
            setLoggedUser(signInUser);
            loginhistory.replace(from);
            console.log("userr ", signInUser);
        }).catch((error) => {
            var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log("error ",errorMessage," ",email," ",credential);
                alert(errorMessage);
        });
      
    }
    const handleSubmit = (e) => {

        // console.log("clicked");
        // console.log(e.target["loginEmail"].value," login info ",e.target["loginPassword"].value);
        const email = e.target["loginEmail"].value;
        const password = e.target["loginPassword"].value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log("asdddddd ",loggedinUser.ride)
                const signInUser = {
                    isSignedIn: true,
                    email: user.email,
                    ride:loggedinUser.ride,
                    img:loggedinUser.img
                };
                setLoggedUser(signInUser);
                loginhistory.replace(from);
                console.log("logedIn user ", user)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("submit error ",errorMessage," " ,errorCode )
                alert(errorMessage);
            });
        e.preventDefault();
    }
    return (
        <div className="FormWithGogleAndGit">
        <div className="LogInForm">
            <p className="LogInTag">LOG IN</p>
            <Form className="Form" onSubmit={handleSubmit}>
                <input type="email" name="loginEmail" placeholder="Enter your Email"required /><br />
                <input type="password" name="loginPassword" placeholder="Enter your password" required /><br />
               
                <div className="createAcnt">
                  <div className="ckbox">
                    <input type="checkbox"/> <label> Remember me </label>  
                    </div>            
                  <div className="forget" ><label>Forget Password?</label></div>  
                 </div>
                 <input type="submit" value="Log In" />
            </Form>
            <div className="NewAcnt">Don't Have an Account ? <Link to="/signup" className="NewAcntLink">Create New Account..</Link> </div>
            </div>
            <div className="NewAuth">
                <h5>______________Or______________</h5><br/>
               <div className="authLink"><FontAwesomeIcon icon={faGoogle}  size="2x"></FontAwesomeIcon> <label  onClick={handleGoogleSignIn}>Continue With Google</label><br /></div>
               <div className="authLink"><FontAwesomeIcon icon={faGit} size="2x" style={{marginRight:"10px"}}></FontAwesomeIcon> <label onClick={handleGithubSignIn}>Continue With Github</label></div>

            </div>
            
        </div>
    );
};

export default Login;
