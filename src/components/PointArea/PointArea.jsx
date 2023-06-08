import React, { useState, useCallback, useContext, useReducer } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, Circle } from '@react-google-maps/api';
import { CenterContext } from '../../context/map';
import { PointsContext, pointsReducer } from '../../context/points';
import { PointContext } from '../../context/point';
import AutoComplete from '../AutoComplete/AutoComplete';


const containerStyle = {
    width: '600px',
    height: '600px'
};

const PointArea = () => {

    const [map, setMap] = useState(null)
    const { center } = useContext(CenterContext)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw",
        language: 'he'
    })



    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    })

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const searchGeocoder = useCallback((point) => {
        const currentPoint={lat:point.geometry.location.lat(),lng:point.geometry.location.lng()}
        console.log(currentPoint)
        var geocoder = new window.google.maps.Geocoder
        geocoder.geocode({ 'location': currentPoint }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    console.log(results[1]);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        })
    })


    return (
        <div>
            <AutoComplete getPlace={searchGeocoder}></AutoComplete>

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    defaultZoom={20000}
                    onLoad={onLoad}
                    style={{ width: '10%', height: '10%' }}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                    onUnmount={onUnmount}
                >

                </GoogleMap>

            ) : <></>}
        </div>
    )
}

export default PointArea