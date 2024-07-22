import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6381c182fea334510f3d0e2aa8f720e4&units=metric`);
      setData(response.data.main);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <input 
          type="text" 
          placeholder="Enter the city name" 
          onChange={e => setCityName(e.target.value)}
        />
        <button onClick={getWeather}>
          Get Weather
        </button>

        {loading && <h1>Loading...</h1>}
        {data ? (
          <div className="Weather">
            <h2>Weather Data</h2>
            <h3>Temperature: {data.temp} °C</h3>
            <h3>Humidity: {data.humidity}%</h3>
            <h3>Pressure: {data.pressure} hPa</h3>
          </div>
        ) : (
          <h2>Enter a city name</h2>
        )}
      </div>
    </div>
  );
}

export default App;
