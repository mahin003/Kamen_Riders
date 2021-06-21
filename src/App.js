
import './App.css';
import Header from './Header/Header';
import Rides from './Rides/Rides';
import React, {useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Destination from './Destination/Destination';
import Login from './Login/Login';
import Signup from './SignUp/Signup';
import PrivateRoute from './PrivateRoute';
import Blog from './BlogContact/Blog';
import Contact from './BlogContact/Contact';
import PageNotAvailable from './BlogContact/PageNotAvailable';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export const UserContext = createContext();
function App() {
  const [loggedInUser,setLoggedUser] =useState({isSignedIn: false,
    name: '',
    email: '',
    ride:'',
  img:''});
  // const [ride,setRide] =useState({});
  console.log("qw ",loggedInUser)
  return (
    <div className="App">
      {/* /* <h2> email: {loggedInUser.email} ride: {loggedInUser.ride}</h2>}
      {<img src={loggedInUser.img}/>} */}
      <UserContext.Provider value={[loggedInUser,setLoggedUser]}>
      <Router>
        <Header></Header>
        <Switch>       
          <PrivateRoute path="/destination">
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>

          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          
          <Route path="(/|/home)">
            <Rides></Rides>
          </Route>
          <Route path="/([A-Za-z]+)">
            <PageNotAvailable></PageNotAvailable>
          </Route>  
         
        </Switch>

      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
