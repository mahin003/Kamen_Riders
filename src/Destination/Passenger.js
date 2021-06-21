import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import "./Destinatio.css"
const Passenger = (props) => {
    console.log(props.imgDetail)
    return (
        <div className="passenger">
            <img src={props.imgDetail.img}/>
            <p>{props.imgDetail.ride}</p>
            <FontAwesomeIcon icon={faUsers} size="2x" style={{marginTop:"auto",marginBottom:"auto",marginLeft:"20px"}}></FontAwesomeIcon>
            <p>x {props.imgDetail.ppl}</p>
            <p style={{marginLeft:"auto"}} >{props.imgDetail.pr}</p>
        </div>
    );
};

export default Passenger;