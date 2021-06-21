import React from 'react';
import "./Signup.css"
import { Form } from 'react-bootstrap';
import firebase from "firebase/app";

import { useContext, useState } from 'react';
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { Link } from 'react-router-dom';
import { UserContext} from '../App';
import { useHistory,useLocation} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGit, faGoogle } from '@fortawesome/free-brands-svg-icons';
firebase.initializeApp(firebaseConfig);


const Signup = () => {
    const signInHistory= useHistory();
    var IsPasswordNoMatch = false;
    let loginhistory = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const HandlePassoword = (e) => {
        console.log("asas ", e.target.name)
    };
    const HandleSignUpSubmit = (e) => {
       
        if (e.target["SetPassword"].value === e.target["ConfirmPassword"].value) {
            
            const email = e.target["userEmail"].value;
            const password = e.target["SetPassword"].value;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log(userCredential,"Success");
                    alert("New Account Created Successfully");             
                    signInHistory.push("/login");
 
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
        }
        else{
            console.log("didnt match");
            IsPasswordNoMatch = true;
            alert("Passwords didn't Match ,Try again"+IsPasswordNoMatch );
        }
        e.preventDefault();
    }

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

    return (
       <div className="FormWithGogleAndGit"> 
        <div className="SignUpForm">
            <p className="LogInTag" >Create Account</p>
            <Form className="Form" onSubmit={HandleSignUpSubmit}>
                <input type="text" name="userName" placeholder="Enter your Name" required /><br />
                <input type="email" name="userEmail" placeholder="Enter your Email" required /><br />
                <input type="password" name="SetPassword" onBlur={HandlePassoword} placeholder="Set a password" required /><br />
                <input type="password" name="ConfirmPassword" onBlur={HandlePassoword} placeholder="Confirm password" required /><br />
                <input type="submit" />
            </Form>
            <div className="NewAcnt">Already Have an Account ? <Link to="/login" className="NewAcntLink">Login</Link> </div>
            </div>
            <div className="NewAuth">
                <h5>______________Or______________</h5><br/>
               <div className="authLink"><FontAwesomeIcon icon={faGoogle}  size="2x"></FontAwesomeIcon> <label  onClick={handleGoogleSignIn}>Continue With Google</label><br /></div>
               <div className="authLink"><FontAwesomeIcon icon={faGit} size="2x" style={{marginRight:"10px"}}></FontAwesomeIcon> <label onClick={handleGithubSignIn}>Continue With Github</label></div>

            </div>
            
        </div>
    );
};

export default Signup;
