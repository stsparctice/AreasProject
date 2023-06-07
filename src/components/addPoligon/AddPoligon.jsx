import { useContext,useEffect } from "react"
import { PointsContext } from "../../context/points"
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, Circle } from '@react-google-maps/api';


const AddPoligon = () => {

    const { points, setPoints } = useContext(PointsContext)
    const [dirService, setDirService] = useState(null)
    const [dirRender, setDirRender] = useState(null)

    // const [points, setPoints] = useReducer(fillRoad, [])
    const [roadPoints, setRoadPoints] = useState([])
    const [map, setMap] = useState(null)
    const [index, setIndex] = useState(0)
    useEffect(() => {
        // if (points.length === 3) {
        //     setPoints({ type: 'more' })
        // }
        if (points.length >= 2) {
            dirService.route({ origin: points[index - 2], destination: points[index - 1], travelMode: window.google.maps.TravelMode.WALKING }, (result, status) => {
                let newPoints = result.routes[0].overview_path.map(p => ({ lat: p.lat(), lng: p.lng() }))
                if (roadPoints.length == 0)
                    setRoadPoints(newPoints)
                else {
                    newPoints.forEach(p => {
                        setRoadPoints(prev => [...prev, p])
                    });

                }
                console.log(roadPoints);
            })
        }
    }, [points])
    return <>
        {points.map((p, i) => <MarkerF key={i} position={p} index={i} />)}
        <PolylineF
         path={roadPoints}
            // path={points}
            geodesic={true}
            options={{
                fillColor: "yellow",
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
        {/* <PolylineF
            path={[points[0], points[points.length - 1]]}
            geodesic={true}
            options={{
                fillColor: "yellow",
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
        /> */}
    </>
}

export default AddPoligon