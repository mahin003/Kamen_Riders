import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../App';
import "./Rides.css"


const RideComponent = (props) => {
    console.log("rides ",props.RideInfo.image)
    let rideSelected = useHistory();
    const [loggedinUser,setLoggedUser] = useContext(UserContext);
  
    const Selectride=(n,img)=>{
        const rideInfo={...loggedinUser};
        rideInfo.ride=n;
        rideInfo.img=img;

        console.log("ride info ",rideInfo);
        setLoggedUser(rideInfo);
        rideSelected.push("/destination");
        
       };
    return (
        <div className="RideImgName" onClick={()=>Selectride(props.RideInfo.name,props.RideInfo.image)} >
            <div className="rideImg">
                <img src={props.RideInfo.image} />
            </div>
            <div className="rideName">
                <p>{props.RideInfo.name}</p>
            </div>
        </div>
    );
};

export default RideComponent;