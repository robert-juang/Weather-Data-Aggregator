import bodyParser from "body-parser";
import express from "express"
import cors from "cors"; 
import { Configuration, OpenAIApi } from "openai"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 8080;

app.use(cors());

const api = {
    key: process.env.API_OPENWEATHER_KEY,
    geo_base: process.env.API_GEO_BASE,
    weather_base: process.env.API_WEATHER_BASE,
    weather_meteo: process.env.API_WEATHER_METEO, 
    newsapi: process.env.API_News,
};

const configuration = new Configuration({
    apiKey: process.env.API_OPENAI,
});
const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Server Root')
})

//
app.post('/location', async (req,res) => {
    //fetch longitude and latitude 
    let data = req.body; 
    let location = ""; 
    let weather = ""; 
    let air = ""; 
    let newsData = [];

    const date = new Date();
    date.setDate(date.getDate() - 1);

    await fetch(`${api.geo_base}direct?q=${data.weatherEntry}&limit=1&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
            location = result
        })
        .catch((error) => {
            console.log(error)
        });

    const latitude = location[0].lat;
    const longitude = location[0].lon;

    await fetch(`${api.weather_meteo}forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,windspeed_10m_max,windgusts_10m_max&current_weather=true&timezone=auto${data.temperature}`)
        .then((res) => res.json())
        .then((result) => {
            result["name"] = location[0].name;
            result["country"] = location[0].country;
            result["state"] = location[0].state;
            result["temp"] = data.temperature;
            weather = [result]
        })
        .catch((error) => {
            console.log(error);
        });

    await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,carbon_monoxide&domains=cams_global&past_days=7`)
        .then((res) => res.json())
        .then((result) => {
            air = [result]
        })
        .catch((error) => {
            console.log(error);
        });
    
    await fetch(`https://newsapi.org/v2/everything?q=${weather[0].name}&language=en&apiKey=${api.newsapi}`)
        .then((res) => res.json())
        .then((response) => {
            newsData = response.articles.filter((news) => news.urlToImage !== null); 
            newsData = newsData.splice(0, 6);
        })
        .catch((error) => {
            console.log(error);
        });

    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { "role": "system", "content": "You are a helpful weather assistant who knows how to summarize the weather given some information about the location and provide advice on what activities are nearby for residents to do" },
            { "role": "user", "content": `Can you generate a summary for a given city and give some activities that the user can do.
                                        Here's the city name: ${location[0].name}. Make sure to add <br> everytime a line break happens.
                                        Be concise and don't include words like "Sure!" in the beginning. Start the prompt with "Current, in city ${location[0].name}..."`}
        ],
        temperature: 0.1,
    });

    res.send({ "location": location, "air": air, "weather": weather, "newsdata": newsData, "gptmessage":chat_completion.data.choices }); 
})

app.listen(port, () => console.log("server started"))

