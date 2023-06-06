import { useReducer, useState } from 'react';

import { CenterContext, centerReducer } from './context/map';
import AddArea from './components/addArea/AddArea';
import { PointsContext, pointsReducer } from './context/points';



function App() {
  const [center, setCenter] = useReducer(centerReducer, {lat: 31.7875,lng: 34.6635})
  const [points, setPoints] = useReducer(pointsReducer, [])
  return <>
    <CenterContext.Provider value={{ center, setCenter }}>
      <PointsContext.Provider value={{ points, setPoints }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          <AddArea zoom={1} />
        </div>
      </PointsContext.Provider>
    </CenterContext.Provider>
  </>
}

export default App;
