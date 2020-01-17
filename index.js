require('dotenv').config();
const fetch = require('node-fetch');
const Telegram = require('node-telegram-bot-api');
const bot = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

const weatherToken = process.env.WEATHER_API_TOKEN;

const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather") //TODO: Change to zurich
weatherUrl.searchParams.set("zip", "8405,ch")
weatherUrl.searchParams.set("APPID", weatherToken);
weatherUrl.searchParams.set("units", "metric");

const getWeatherData = async () => {
    const response = await fetch(weatherUrl.toString());
    const body = response.json();
    return body;
}

const generateWeatherMessage = 
    weatherData => {
        return `The weather in ${weatherData.name}:
        ${weatherData.weather[0].description}.
        Current temperature is ${weatherData.main.temp} which feels like ${weatherData.main.feels_like}.
        Humidity is ${weatherData.main.humidity}.
        `
    }

const main = async () => {
    const weatherData = await getWeatherData();
    const weatherString = generateWeatherMessage(weatherData);
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString);
    // console.log(weatherData);
}

main();