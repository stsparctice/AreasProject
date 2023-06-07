import React ,{useEffect}from 'react'
import { DrawingManager,drawingManagerRef, GoogleMap, Polygon, useJsApiLoader } from '@react-google-maps/api';
import $ from 'jquery';

import './a.css'

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function MyComponent() {


    //  useEffect(() => {
    //     var mapOptions = {
    //         zoom: 17,
    //         center: { lat: -33.8667, lng: 151.1955, }
    //     };
    //     map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //     // Adds a Places search box. Searching for a place will center the map on that
    //     // location.
    //     map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
    //         document.getElementById('bar'));
    //     var autocomplete = new google.maps.places.Autocomplete(
    //         document.getElementById('autoc'));
    //     autocomplete.bindTo('bounds', map);
    //     autocomplete.addListener('place_changed', function () {
    //         var place = autocomplete.getPlace();
    //         if (place.geometry.viewport) {
    //             map.fitBounds(place.geometry.viewport);
    //         } else {
    //             map.setCenter(place.geometry.location);
    //             map.setZoom(17);
    //         }
    //     });

    //     // Enables the polyline drawing control. Click on the map to start drawing a
    //     // polyline. Each click will add a new vertice. Double-click to stop drawing.
    //     drawingManager = new google.maps.drawing.DrawingManager({
    //         drawingMode: google.maps.drawing.OverlayType.POLYLINE,
    //         drawingControl: true,
    //         drawingControlOptions: {
    //             position: google.maps.ControlPosition.TOP_CENTER,
    //             drawingModes: [
    //                 google.maps.drawing.OverlayType.POLYLINE
    //             ]
    //         },
    //         polylineOptions: {
    //             strokeColor: '#696969',
    //             strokeWeight: 2,
    //             strokeOpacity: 0.3,
    //         }
    //     });
    //     drawingManager.setMap(map);

    //     // Snap-to-road when the polyline is completed.
    //     drawingManager.addListener('polylinecomplete', function (poly) {
    //         var path = poly.getPath();
    //         polylines.push(poly);
    //         placeIdArray = [];
    //         runSnapToRoad(path);
    //     });


    //     // Clear button. Click to remove all polylines.
    //     document.getElementById('clear').addEventListener('click', function (event) {
    //         event.preventDefault();
    //         for (var i = 0; i < polylines.length; ++i) {
    //             polylines[i].setMap(null);
    //         }
    //         polylines = [];
    //         return false;
    //     });
    // }, []);

    // const polygonOptions = {
    //     fillOpacity: 0.3,
    //     fillColor: '#ff0000',
    //     strokeColor: '#ff0000',
    //     strokeWeight: 2,
    //     draggable: true,
    //     editable: true
    // }

    // const drawingManagerOptions = {
    //     polygonOptions: polygonOptions,
    //     drawingControl: true,
    //     drawingControlOptions: {
    //         position: window.google?.maps?.ControlPosition?.TOP_CENTER,
    //         drawingModes: [
    //             window.google?.maps?.drawing?.OverlayType?.POLYGON
    //         ]
    //     }
    // }

    // const onLoadDrawingManager = drawingManager => {
    //     drawingManagerRef.current = drawingManager;
    // }
    // const onOverlayComplete = ($overlayEvent) => {
    //     drawingManagerRef.current.setDrawingMode(null);
    //     if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
    //         const newPolygon = $overlayEvent.overlay.getPath()
    //             .getArray()
    //             .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))

    //         // start and end point should be same for valid geojson
    //         const startPoint = newPolygon[0];
    //         newPolygon.push(startPoint);
    //         $overlayEvent.overlay?.setMap(null);
    //         // setPolygons([...polygons, newPolygon]);
    //     }
    // }


    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: "AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw"
    // })

    // const [map, setMap] = React.useState(null)

    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);

    //     setMap(map)
    // }, [])

    // const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null)
    // }, [])

    // return isLoaded ? (
    //     <GoogleMap
    //         mapContainerStyle={containerStyle}
    //         center={center}
    //         zoom={10}
    //         onLoad={onLoad}
    //         onUnmount={onUnmount}
    //     >
    //         <></>
    //     </GoogleMap>
        
    // ) : <>
    //  <DrawingManager
    //                     onLoad={onLoadDrawingManager}
    //                     onOverlayComplete={onOverlayComplete}
    //                     options={drawingManagerOptions}
    //                 />

    //     <script src="https://www.gstatic.com/external_hosted/jquery2.min.js"></script>
    //     <script
    //         src="https://maps.googleapis.com/maps/api/js?libraries=drawing,places&key=AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw"></script>
    //     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD-44axdMsx-kgh0CQD2HMcnlzg6S1xTjw"></script>
    // </>
}

export default React.memo(MyComponent)