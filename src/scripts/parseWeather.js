import afternoon from "../assets/afternoon.png";
import cloudLightning from "../assets/cloud-lightning.png";
import cloud from "../assets/cloud.png";
import clouds from "../assets/clouds.png";
import evening from "../assets/evening.png";
import heavyRain from "../assets/heavy-rain.png";
import lightRain from "../assets/light-rain.png";
import lightSnow from "../assets/light-snow.png";
import morning from "../assets/morning.png";
import nightScene from "../assets/night-scene.png";
import night from "../assets/night.png";
import partlyCloud from "../assets/partly-cloudy.png";
import rainCloud from "../assets/rain-cloud.png";
import rain from "../assets/rain.png";
import sleet from "../assets/sleet.png";
import snowStorm from "../assets/snow-storm.png";
import snow from "../assets/snow.png";
import storm from "../assets/storm.png";
import stormyWeather from "../assets/stormy-weather.png";
import wind from "../assets/wind.png";
import sun from "../assets/sun.png";
import fog from "../assets/fog.png";
import hail from "../assets/hail.png";

export default function parse(num) {
    switch (num) {
        case 0:
            return ["Clear", sun];
        case 1:
            return ["Clear", sun]; 
        case 2:
            return ["Clouds", partlyCloud]; 
        case 3:
            return ["Overcast", clouds];
        case 45:
            return ["Fog", fog]; 
        case 48:
            return ["Fog", fog];
        case 51:
            return ["Drizzle", lightRain];
        case 53:
            return ["Drizzle", lightRain];
        case 55:
            return ["Drizzle", lightRain];
        case 56:
            return ["Freezing Drizzle: Light", lightRain];
        case 57:
            return ["Freezing Drizzle: Dense", lightRain];
        case 61:
            return ["Rain: Slight", rain];
        case 63:
            return ["Rain: Moderate", rain];
        case 65:
            return ["Rain: Heavy", heavyRain];
        case 66:
            return ["Freezing Rain: Light", rain];
        case 67:
            return ["Freezing Rain: Heavy", rain];
        case 71:
            return ["Snowfall", snow];
        case 73:
            return ["Snowfall", snow];
        case 75:
            return ["Snowfall", snow];
        case 77:
            return ["Snow", snow];
        case 80:
            return ["Rain", rain];
        case 81:
            return ["Rain", rain];
        case 82:
            return ["Rain", rain];
        case 85:
            return ["Snow", snow];
        case 86:
            return ["Snow", snow];
        case 95:
            return ["Thunderstorm", cloudLightning];
        case 96:
            return ["Thunderstorm", cloudLightning];
        case 99:
            return ["Thunderstorm", cloudLightning];
        default:
            return ["Undefined", null];
    }
}

// Key: 
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail