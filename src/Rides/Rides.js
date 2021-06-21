import React, { useEffect } from 'react';
import {AllRides} from "../Data/rides";
import {useState} from 'react';
import RideComponent from './RideComponent';
import "./Rides.css";
const Rides = () => {
    const [Ride,setRide]=useState([]);
    
    useEffect(()=>{
        setRide(AllRides);
        console.log("all ",AllRides)
        // console.log("ride ",Ride);
    },[]);
    return (
        <div className="RideCollection">
            {
                Ride.map(rideName=><RideComponent  RideInfo={rideName}></RideComponent>)
            }
        </div>
    );
};

export default Rides;