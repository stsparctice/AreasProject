import React, { useContext, useEffect, useReducer, useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsService, DirectionsRenderer, PolylineF, Polygon } from '@react-google-maps/api';




const DeletePoint = ({ point }) => {
    console.log("delete ", point);

    const deletePoint=()=>{
        
    }

    return point ? <>
        {
            <p>
                <span onClick={deletePoint}>{point.lat}</span>
            </p>
        }


    </> : <></>


}


export default DeletePoint