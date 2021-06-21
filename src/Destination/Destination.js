import { faRoad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { UserContext } from '../App';
import "./Destinatio.css";
import img from "./Map.png"
import {Cost} from "../Data/cost"
import Passenger from './Passenger';

const Destination = () => {
   
    
    const [loggedInUser, setLoggedUser] = useContext(UserContext);

    const [rideInfo, setRideinfo]= useState({});

    const loc = useHistory();

    const [travel, setTravel] = useState({
        from:'',
        to:'',
        showForm:true
    });

    
    useEffect(()=>{
       
       const x={...Cost}
       x[0].ride=loggedInUser.ride;
       x[1].ride=loggedInUser.ride;
       x[2].ride=loggedInUser.ride;
       x[0].img=loggedInUser.img;
       x[1].img=loggedInUser.img;
       x[2].img=loggedInUser.img;
       setRideinfo(x);
       console.log("XX ",x)
    },[]);
    
    // const [ride,setRide]= useContext(UserContext);
    const LocationSubmitted = (e) => { 
        const trv = {
            from: e.target["from"].value,
            to: e.target["to"].value,
            showForm: false
        };setTravel(trv);
        e.preventDefault();
    }

    if (loggedInUser.ride === '') {
        alert("You didnt choose any ride");
        loc.push("/home");
    }
    return (
        <div className="fullDiv">
            <div className="locationAndResult">
                
                {
                    travel.showForm?<Form onSubmit={LocationSubmitted} className="FromTo">
                    <label>Pick From</label><br />
                    <input type="text" name="from" required placeholder="FROM.." /><br />
                    <label>Pick To</label><br />
                    <input type="text" name="to" required placeholder="TO.." /> <br />
                    <input type="submit" value="Search"/>
                </Form>:<div className="destinationDetails">
                      <div className="destinationShow">
                          <div className="icon"><FontAwesomeIcon icon={faRoad} size="5x"></FontAwesomeIcon> </div>
                          <div className="names">
                              <p>{travel.from}</p>
                              <p>{travel.to}</p>
                          </div>
                         
                      </div>
                      <div className="list">
                          {
                              Cost.map(imgName=><Passenger imgDetail={imgName}></ Passenger>)
                          }
                          </div> 
                </div>
                }
                
               
            </div>
            <div className="map">
               <img src={img} />
            </div>



        </div>
    );
};

export default Destination;
