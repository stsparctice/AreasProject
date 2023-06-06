import { useContext } from "react"
import { PointsContext } from "../../context/points"
import { GoogleMap, useJsApiLoader, MarkerF, PolylineF, Circle } from '@react-google-maps/api';


const AddPoligon = () => {

    const { points, setPoints } = useContext(PointsContext)
    return <>
        {points.map((p, i) => <MarkerF key={i} position={p} index={i} />)}
        <PolylineF
            path={points}
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
        <PolylineF
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
        />
    </>
}

export default AddPoligon