const url = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=49.28&longitude=-123.12'
    + '&current=temperature_2m,rain,snowfall,weather_code'
    + '&timezone=auto'
    + '&temperature_unit=celsius&wind_speed_unit=kmh';

function getGenericGroup(code) {
  const n = Number(code);
  if (!Number.isInteger(n) || n < 0) return "unknown";

  if (n === 0) return "clear";
  if (n >= 1 && n <= 3) return "clouds";
  if (n === 45 || n === 48) return "fog";

  if (n === 77) return "snow";          
  if (n === 85 || n === 86) return "snow"; 

  if (n >= 80 && n <= 82) return "rain";

  if ((n >= 50 && n <= 57) || (n >= 60 && n <= 67)) return "rain";

  if (n >= 70 && n <= 75) return "snow";

  if (n === 95 || n === 96 || n === 99) return "thunder";

  return "unknown";
}

const LABEL = {
  clear:   "Clear",
  clouds:  "Cloudy",
  fog:     "Fog",
  rain:    "Rain",
  snow:    "Snow",
  thunder: "Thunderstorm",
  unknown: "Unknown weather"
};

function codeToText(code) {
  const group = getGenericGroup(code);
  return group === "unknown" ? `Unknown (code ${code})` : LABEL[group];
}

fetch(url)
    .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .then(data => {
        const weather = data.current;
        document.querySelector('#title').textContent = "Current Weather";
        document.querySelector('#weather').innerHTML = `
      Temperature: ${weather.temperature_2m}°C<br>
      Rain: ${weather.rain} mm<br>  
      Snowfall: ${weather.snowfall} cm<br>  
      Weather: ${codeToText(weather.weather_code)}<br>  
    `;
    })
    .catch(err => {
        const e = document.querySelector('#error');
        e.hidden = false;
        e.textContent = 'Failed to load weather: ' + err.message;
    });
