// מחיקת נקודה

import React, { useContext, useEffect, useReducer, useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, DirectionsService, DirectionsRenderer, PolylineF, Polygon } from '@react-google-maps/api';
import { CenterContext } from '../context/map';
import DeletePoint from './DeletePoint';
import axios from 'axios'


const containerStyle = {
    width: '400px',
    height: '400px'
};

const fillRoad = (state, item) => {

    if (item.type === 'one') {
        return [item.data]
    }
    if (item.type == 'remove') {
        console.log("in remove");
        // let i = state.findIndex(s => s.lat == item.data)
        // return state.splice(i, 1)
        return state.splice(1, 1)

    }

    // if (item.type === 'start')
    //     return [...state]

    // if (item.type == 'more') {
    //     return state.slice(1, state.length)
    // }

    return [...state, item.data]

}


const Map4 = ({ zoom }) => {
    const { center } = useContext(CenterContext)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw",
        language: 'he'
    })
    const [dirService, setDirService] = useState(null)
    const [dirRender, setDirRender] = useState(null)

    const [points, setPoints] = useReducer(fillRoad, [])
    const [roadPoints, setRoadPoints] = useState([])
    const [map, setMap] = useState(null)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        // if (points.length === 3) {
        //     setPoints({ type: 'more' })
        // }
        console.log(points);
        // if (points.length >= 2) {
        //     for (let i = 0; i < points.length-1; i++) {
        //        dirService.route({ origin: points[i], destination: points[i + 1], travelMode: window.google.maps.TravelMode.WALKING },
        //             (result, status) => {
        //             let newPoints = result.routes[0].overview_path.map(p => ({ lat: p.lat(), lng: p.lng() }))
        //             if (roadPoints.length == 0)
        //                 setRoadPoints(newPoints)
        //             else {
        //                 newPoints.forEach(p => {
        //                     setRoadPoints(prev => [...prev, p])
        //                 });

        //             }
        //         })
        //     }

        // }
       
        let getPoints = async () => {
            if (points.length >= 2) {
                for (let i = 0; i < points.length - 1; i++) {
                    console.log(i, i+1)
                    let {routes, status}= await  dirService.route({ origin: points[i], destination: points[i + 1], travelMode: window.google.maps.TravelMode.WALKING })
                    // let obj = await dirService.route({ origin: points[i], destination: points[i + 1], travelMode: window.google.maps.TravelMode.WALKING })
                    // console.log(status)
                    // console.log(result)
                    // console.log(obj)
                    let newPoints = routes[0].overview_path.map(p => ({ lat: p.lat(), lng: p.lng() }))
                    // if (roadPoints.length == 0)
                    //     setRoadPoints(newPoints)
                    // else {
                        newPoints.forEach(p => {
                            
                            setRoadPoints(prev => [...prev, p])
                        });

                    // }
                    //    cb(result, status)
                }
            }
        }


        getPoints()
    }, [points])



    const addPoint = async (point) => {
        if (points.length === 0)
            setPoints({ type: 'one', data: point })

        else {
            // צריך???????????????????????????????????????????
            // setPoints({ type: 'start' })

            // let lastPoint = points[points.length - 1]

            // console.log({ lastPoint })
            // let pointsToRoad = [lastPoint, point]
            // console.log({ pointsToRoad })


            setPoints({ type: 'two', data: point })
        }
        // console.log("pp ", index);
    }

    const deletePoint = async (point) => {
        console.log("before remove ", points);
        await setPoints({ type: 'remove', data: point })
        console.log("after remove ", points);
    }



    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        const directionsService = new window.google.maps.DirectionsService()
        setDirService(directionsService)
        const directionsRender = new window.google.maps.DirectionsRenderer()
        setDirRender(directionsRender)
        map.fitBounds(bounds);

        // console.log({directionsRender})
        // console.log({directionsService})

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? <>
        {/* {console.log(points)} */}
        {points.length > 1 ? <p onClick={() => deletePoint(points[1])}>{points[0].lat}</p> : <p>no selected area</p>}
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={ev => {
                console.log("latitide = ", ev.latLng.lat());
                console.log("longitude = ", ev.latLng.lng());
                addPoint({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
                setIndex(index + 1)

            }}
        >
            <PolylineF
                path={roadPoints}
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
                }}></PolylineF>
            <></>

        </GoogleMap>


    </> : <></>
}


export default Map4