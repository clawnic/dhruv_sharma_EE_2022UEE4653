import { useState } from 'react';
import WeatherWidget from './components/weather'

function App() {
  const [inVal,setinVal] = useState('London');
  const [location,setlocation] = useState('London');

  const handleSubmit = (e)=>{
    e.preventDefault();
    setlocation(inVal);
  }
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <input type='text' value={inVal} onChange={(e)=>{
          setinVal(e.target.value)
        }}/>
        <button type='submit'>update</button>
      </form>
      <WeatherWidget location={location}/>

    </div>
  );
}

export default App;
