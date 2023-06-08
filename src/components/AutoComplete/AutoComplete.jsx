import React, { useState, useCallback, useContext, useRef, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Autocomplete, MarkerF } from '@react-google-maps/api';
import Geocode from "react-geocode"
import { CenterContext } from '../../context/map';



const containerStyle = {
    width: '600px',
    height: '600px'
};

const AutoComplete = ({ getPlace }) => {

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: "il" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["address"]
    };

    const [map, setMap] = useState(null)
    const { center } = useContext(CenterContext)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw",
        language: 'he'
    })

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );

        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log({ place });
            getPlace(place)
        });
    }, []);

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        console.log('in on load', window.google);
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    })

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])



    return (
        <div>
            <label>enter address :</label>
            <input ref={inputRef} />
        </div>

    );
}

export default AutoComplete;
