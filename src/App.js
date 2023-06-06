import { useReducer } from 'react';
import Map2 from './components/Map2';
import Map1 from './components/Map1';
import Map3 from './components/Map3';
import { CenterContext, centerReducer } from './context/map';
import Map4 from './components/Map4';



function App() {
  const [center, setCenter] = useReducer(centerReducer, {
    lat: 31.7875,
    lng: 34.6635
  })
  return <>
    <CenterContext.Provider value={{ center, setCenter }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {/* <Map1 zoom={3} /> */}
        <Map3 zoom={3} />
      </div>
    </CenterContext.Provider>
    {/* <FindAreasBetweenPoints></FindAreasBetweenPoints> */}
    {/* <MyComponent></MyComponent> */}
    {/* <MapComponent></MapComponent> */}

  </>
} 

export default App;
