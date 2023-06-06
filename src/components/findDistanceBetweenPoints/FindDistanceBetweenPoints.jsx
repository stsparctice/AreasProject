import React, { useContext, useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { CenterContext } from '../context/map';




const FindDistanceBetweenPoints = ({ zoom }) => {


    // <DistanceMatrixService
    //         options={{
    //           destinations: [{ lat: 1.296788, lng: 103.778961 }],
    //           origins: [{ lng: 72.89216, lat: 19.12092 }],
    //           travelMode: "DRIVING",
    //         }}
    //         callback={(res) => {
    //           console.log("RESPONSE", res);
    //           this.setState({
    //             totalTime: res.rows[0].elements[0].duration.text,
    //             totalDistance: res.rows[0].elements[0].distance.text,
    //           });
    //         }}
    //       />

    // return <></>
}

export default FindDistanceBetweenPoints