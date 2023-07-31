import React, { useState, useContext, useEffect } from 'react'
import { MainData } from './Weather'
import "./DisplayMainInfo.css"
import parse from "../scripts/parseWeather";
import getDay from "../scripts/getDay";
import Highcharts from 'highcharts'
import 'highcharts/modules/exporting'


function DisplayMainInfo() {

  const data = useContext(MainData); 
  const [current, setCurrent] = useState("");

  function handleClick(){
    console.log(data) 
    console.log(air) 
  }

  useEffect( () => {
      Highcharts.chart('container', {
          chart: {
              type: 'line'
          },
          title: {
              text: 'Air Quality Over the Past Week'
            //   style: {
            //       color: rgb(116, 116, 222)
            //   }
          },
          subtitle: {
              text: 'Source: ' +
                  '<a href="https://open-meteo.com/en/docs/air-quality-api" ' +
                  'target="_blank">openmeteo.com</a>'
          },
          xAxis: {
              labels: {
                  formatter: function () {
                      const datetime = this.value.split('T');
                      const date = datetime[0].substring(5); // Extracting month and date
                      const time = datetime[1];

                      return date
                  }
              },
              categories: [...data.air[0].hourly.time]
          },
          yAxis: {
              title: {
                  text: 'μg/m3'
              }
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: false
                  },
                  enableMouseTracking: true
              }
          },
          series: [{
              name: 'pm10',
              data: [...data.air[0].hourly.pm10]
          }, {
              name: 'carbon_monoxide',
              data: [...data.air[0].hourly.carbon_monoxide]
          }]
      });
  }, [])


  return (
    <>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js"></script>
        <div class="main-info">
            <h2 class="title">Current Weather</h2>
            <div class="main-info-display">
                <div id="left">  
                      {data.weather.map((current) => (
                          <>
                              <div id="loc">{current.name ? current.name : ""}</div>
                              <div id="loc">{current.state ? current.state : ""}</div>
                              <div id="loc">{current.country ? current.country : ""}</div>
                              <div id="loc2">
                                <img id="loc-img" src={parse(current.current_weather.weathercode)[1]} alt="cloud" /> 
                                  {current.current_weather.temperature && (
                                      <div>{current.temp === "" ? `${current.current_weather.temperature}°C` : `${current.current_weather.temperature}°F`}</div>
                                  )}
                              </div>
                              <div id="loc3">{parse(current.current_weather.weathercode)[0]}</div> 
                              {current.current_weather.temperature && (
                                  <div id="loc3">Feels like: {current.temp === "" ? `${current.daily.apparent_temperature_max[0]}°C` : `${current.daily.apparent_temperature_max[0]}°F`}</div>
                              )}
                              <div id="loc3">Wind: {current.current_weather.windspeed ? current.current_weather.windspeed : ""} km/h</div>
                              <div id="loc3">Precipitation Sum: {current.current_weather ? current.daily.precipitation_sum[0]: ""} mm</div>
                          </>
                      ))
                    }
                </div>
                <div id="right">
                    <figure class="highcharts-figure">
                        <div id="container"></div>
                        <p class="highcharts-description"></p>
                    </figure>
                </div>
            </div>
        </div>

        {/* <button onClick={handleClick}>Get weather information</button> */}

    </>
  )
}

export default DisplayMainInfo