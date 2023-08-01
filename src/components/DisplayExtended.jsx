import React, { useState, useContext } from 'react'
import { MainData } from './Weather'
import "./DisplayMainInfo.css"
import parse from "../scripts/parseWeather";
import getDay from "../scripts/getDay";

function DisplayMainInfo() {

    const data = useContext(MainData);

    return (
        <>
            <div class="main-info" id="extended">
                <h2 class="title">Extended Forecast</h2>
                <div class="main-info-display">
                    {/* 1 is the left and 2 is the right */}
                    <div id="e3">
                        {data.weather.map((current) => (
                            (current.daily.time).map((time, index) => (
                                <div class="extended-cards">                           
                                    <div id="subtitle">{getDay(time)}</div>
                                    <img src={parse(current.daily.weathercode[index])[1]} alt="weather" />
                                    <div id="subtitle">{parse(current.daily.weathercode[index])[0]} </div> 
                                    <div id="subtitle">High:{current.daily.temperature_2m_max[index]}°</div>
                                    <div id="subtitle">Low:{current.daily.temperature_2m_min[index]}°</div>
                                </div>
                                )) 
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DisplayMainInfo