import React, { useState, useCallback, useContext, useReducer } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF } from '@react-google-maps/api';
import { CenterContext } from '../context/map';
import Autocomplete from "react-google-autocomplete";
import axios from 'axios';


const containerStyle = {
    width: '400px',
    height: '400px'
};




const Map2 = ({ zoom }) => {
    const { center } = useContext(CenterContext)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw",
        language: 'he'
    })

    const [points, setPoints] = useState([])
    const [pointsToRoad, setPointsToRoad] = useState([])

    const [map, setMap] = useState(null)
    

    // למה לא עובד כאן עם useState
    const lastPoint = () => {
        setPointsToRoad([])
        console.log("in");
        let pointsToRoad = []
        points.forEach(p => {
            pointsToRoad.push(`${p.lat},${p.lng}`)
        })
        setPointsToRoad(pointsToRoad)
        console.log(pointsToRoad);


        // axios.get('https://roads.googleapis.com/v1/snapToRoads', {
        //     interpolate: true,
        //     key: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw",
        //     path: pointsToRoad.join('|')
        // }, function (data) {
        //     console.log(data);
        //     processSnapToRoadResponse(data);
        //     drawSnappedPolyline();
        // });

    }
    const processSnapToRoadResponse = (data) => {
        // snappedCoordinates = [];
        // placeIdArray = [];
        // for (var i = 0; i < data.snappedPoints.length; i++) {
        //     var latlng = new google.maps.LatLng(
        //         data.snappedPoints[i].location.latitude,
        //         data.snappedPoints[i].location.longitude);
        //     snappedCoordinates.push(latlng);
        //     placeIdArray.push(data.snappedPoints[i].placeId);
        // }

    }
    const drawSnappedPolyline = () => {

    }

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // console.log({ zoom })
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [zoom])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <div>

            {isLoaded ? (

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    defaultZoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    onRightClick={lastPoint}
                    onClick={ev => {
                        console.log("latitide = ", ev.latLng.lat());
                        console.log("longitude = ", ev.latLng.lng());
                        setPoints(prev => [...prev, { lat: ev.latLng.lat(), lng: ev.latLng.lng() }])
                    }

                    }
                >
                    {points.map((p, i) => <MarkerF key={i} position={p} />)}

                    <PolylineF
                        path={points}
                        geodesic={true}
                        options={{
                            strokeColor: "#ff2527",
                            strokeOpacity: 0.75,
                            strokeWeight: 2,
                            icons: [
                                {

                                    offset: "0",
                                    repeat: "20px"
                                }
                            ]
                        }}
                    />

                    <></>
                </GoogleMap>
            ) : <></>
            }
        </div>)
}

export default Map2