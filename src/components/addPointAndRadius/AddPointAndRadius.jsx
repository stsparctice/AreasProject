import { MarkerF, CircleF, Circle } from '@react-google-maps/api';
import { useContext, useState } from 'react';
import { PointContext } from '../../context/point';
import { PointsContext } from '../../context/points';


const AddPointAndRadius = () => {
    const { point, radius } = useContext(PointContext)
    return <>
        <div>

            {
                point ?
                    <MarkerF position={point} /> : ''
            }

            {point && radius ?
                <Circle
                    radius={parseFloat(radius)}
                    center={point}
                    options={{
                        fillColor: "rgb(227, 175, 155)",
                        strokeColor: "#ff2527",
                        strokeOpacity: 0.75,
                        strokeWeight: 1,
                        icons: [
                            {

                                offset: "0",
                                repeat: "20px"
                            }
                        ]
                    }}
                >

                </Circle>
                : ''}

        </div>
    </>
}

export default AddPointAndRadius