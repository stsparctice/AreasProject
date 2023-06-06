import React, { useContext, useState } from "react"
import { useEffect } from "react"
import Geocode from "react-geocode"
import { PointsContext } from "../../context/points"



const MarkerInSide = ({ prop }) => {
    const [address, setAddress] = useState('')
    const { points, setPoints } = useContext(PointsContext)

    useEffect(() => {
        getAddress(prop.location.lat, prop.location.lng)
    })

    const removeMarker = (index) => {
        setPoints({ type: 'remove', index: index })
    }

    const getAddress = (lat, lng) => {
        let address = ''
        Geocode.setApiKey("AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw");
        Geocode.setLanguage("he");
        // // Geocode.setRegion("he");
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                address = response.results[0].formatted_address;
                setAddress(address)
                console.log(address);
            },
            (error) => {
                console.error(error);
            }
        )
    }

    return <>
        <div onClick={() => removeMarker(prop.index)}>
            <img src='https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i…zaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw&token=60555'></img>
            <span>{address}</span>
        </div>
    </>
}

export default MarkerInSide

