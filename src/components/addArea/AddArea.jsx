import React, { useState, useCallback, useContext, useReducer } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, Circle } from '@react-google-maps/api';
import { CenterContext } from '../../context/map';
import MarkerInSide from "./../markerInSide/MarkerInSide"
import { PointsContext, pointsReducer } from '../../context/points';
import AddPoligon from '../addPoligon/AddPoligon';
import AddPointAndRadius from '../addPointAndRadius/AddPointAndRadius';
import { PointContext } from '../../context/point';


const containerStyle = {
    width: '600px',
    height: '600px'
};

const areaReducer = (state, object) => {
    console.log(state, 'jjjj', object);
    if (object.radius)
        state.radius = object.radius
    state.location.type = object.type
    state.location.coordinates[0] = object.coordinates[0]
    state.areaName = object.areaName

}

const AddArea = ({ zoom }) => {
    const [state, setState] = useState([])
    const [map, setMap] = useState(null)
    const [area, setArea] = useReducer(areaReducer, { location: { type: 'ppppppp', coordinates: [] }, areaName: '', delete: false })
    const [areaName, setAreaName] = useState('')
    const [pointAndRadius, setPointAndRadius] = useState(false)
    const [poligon, setPoligon] = useState(false)
    // const [closePoligon, setClosePoligon] = useState(false)
    const { center } = useContext(CenterContext)
    const { points, setPoints } = useContext(PointsContext)
    const [radius, setRadius] = useState()
    const [point, setPoint] = useState({})
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw",
        language: 'he'
    })



    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        console.log({ zoom })
        console.log('pointts-----', points);
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    })

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const addArea = () => {
        poligon ?
            setArea({ type: 'poligon', coordinates: points, areaName: areaName }) :
            setArea({ type: 'point', coordinates: point, radius: radius, areaName: areaName })
        // setArea()
    }


    const changeToPointAndRadius = () => {
        setPointAndRadius(true)
        setPoligon(false)
    }
    const changeToPoligon = () => {
        setPoligon(true)
        setPointAndRadius(false)
    }
    return (
        <PointContext.Provider value={{ point, radius }}>
            <div>
                {/* <div><span>{area.location.type}</span> , </div> */}
                <label>area name: </label>
                <input type='text' placeholder='area name' onInput={ev => setAreaName(ev.target.value)}></input>
                <label>point and radius</label>
                <input type='radio' name='a' onClick={changeToPointAndRadius} ></input>
                <label>poligon</label>
                <input type='radio' name='a' onClick={changeToPoligon}></input>
                {pointAndRadius ? <input type='text' onChange={(ev) => setRadius(ev.target.value)} /> : ''}

                <input type={'button'} onClick={addArea} value={'add area'}></input>

                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        // zoom={map.setZoom(8)}
                        defaultZoom={20000}
                        onLoad={onLoad}
                        style={{ width: '10%', height: '10%' }}
                        // containerStyle={{ width: "40%", height: "29%", position: "fixed" }}
                        initialCenter={{ lat: 47.444, lng: -122.176 }}
                        onUnmount={onUnmount}
                        onClick={ev => {
                            pointAndRadius ? setPoint({ lat: ev.latLng.lat(), lng: ev.latLng.lng() }) : <></>
                            poligon ? setPoints({ type: 'add', location: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } }) : <></>
                        }}
                        // zoom={3}
                        onZoomChanged={() => {
                            console.log('zoom---', map.getZoom())
                        }}
                    >
                        {poligon ? <AddPoligon /> : ''}
                        {pointAndRadius ?
                            <AddPointAndRadius /> : ''
                        }


                    </GoogleMap>

                ) : <></>}

                {poligon ?
                    points.map((p, i) => <MarkerInSide key={i} prop={{ location: p, index: i }} />) : ''}
            </div>
        </PointContext.Provider>)
}

export default AddArea