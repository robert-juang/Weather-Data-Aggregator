import React, { useState, useContext, useRef } from 'react';
import searchicon from '../assets/search.png';
import next from '../assets/arrow2.png';
import DisplayMainInfo from './DisplayMainInfo';
import DisplayExtended from './DisplayExtended';
import GPTSummary from './GPTSummary';
import News from './News'

export const MainData = React.createContext();

function Weather() {
  const [loaded, setLoaded] = useState("not");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);
  const [air, setAir] = useState({});
  const [temperature, setTemperature] = useState("&temperature_unit=fahrenheit") //default is 
  const [newsData, setNewsData] = useState("")
  const [GPTMessage, setGPTMessage] = useState("") 

  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoaded("loading")
    const form = formRef.current; // Access the form using the ref
    const formData = new FormData(form);
    const weatherEntry = formData.get('WeatherData');
    setSearch(weatherEntry);

    //fetch longitude and latitude 

    await fetch("https://weather-aggregator.onrender.com/location", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "weatherEntry": weatherEntry, "temperature": temperature })
    }).then((res) => res.json())
    .then((result) => {
      setAir(result["air"]);
      setWeather(result["weather"]);
      setLocation(result["location"]);
      setNewsData(result["newsdata"]); 
      setGPTMessage(result["gptmessage"][0].message.content)
      console.log(result["gptmessage"])
    })

    setLoaded("loaded");
    form.reset(); //make sure to reset form
  };

  function changeTemperature() {
    if (temperature === "&temperature_unit=fahrenheit") {
      setTemperature("&temperature_unit=celsius");
    }
    else {
      setTemperature("&temperature_unit=fahrenheit");
    }
    console.log(temperature)
  }
  return (
    <div className='search'>
      <h1>Weather Aggregator</h1>
      <div class="input">
        <div className="input-weather">
          <div className="search-icon" onClick={handleSubmit}> 
            <img src={searchicon} alt="Search" />
          </div>
          <form ref={formRef} onSubmit={handleSubmit}> 
            <input
              method="post"
              type="text"
              placeholder="Enter City"
              name="WeatherData"
            />
          </form>
        </div>
        <div class="input-enter">
          <input type="image" src={next} alt="Submit" onClick={handleSubmit} />
        </div>
        <div class="input-option">
          <label class="toggle">
            <input type="checkbox" />
            <span class="slider"></span>
            <span class="labels" data-on="°C" data-off="°F" onClick={changeTemperature}></span>
          </label>
        </div>
      </div>

      {loaded==="loading" && (
          <div className="spinner">
            <span>loading...</span>
            <div className="half-spinner"></div>
          </div>
      )}
        
         

      {loaded==="loaded" && weather.length > 0 && air.length > 0 && (
        <>
          <MainData.Provider value={{ location, setLocation, weather, setWeather, air, setAir }}>
            <DisplayMainInfo/>
            <DisplayExtended />
            <GPTSummary payload={GPTMessage}/>
            <News payload={newsData}/>
          </MainData.Provider>
          <span id="loc3">Site is made by Robert, Anthony, and Ahmed</span>
        </>
      )}
      
      {loaded && weather.length === 0 && air.length === 0 && (
        <div>Application Error</div>
      )}
    </div>

  );
}

export default Weather;
