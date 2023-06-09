import { useReducer, useState } from 'react';

import { CenterContext, centerReducer } from './context/map';
import AddArea from './components/addArea/AddArea';
import { PointsContext, pointsReducer } from './context/points';
import Map2 from './components/Map2';
import Map1 from './components/Map1';
import Map3 from './components/Map3';
import Map4 from './components/Map4';



function App() {
  const [center, setCenter] = useReducer(centerReducer, { lat: 31.7875, lng: 34.6635 })
  const [points, setPoints] = useReducer(pointsReducer, [])
  return <>
    <CenterContext.Provider value={{ center, setCenter }}>
      <PointArea />
    </CenterContext.Provider>

  </>
}


export default App;
