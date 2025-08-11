const url = 'https://api.open-meteo.com/v1/forecast'
    + '?latitude=49.28&longitude=-123.12'
    + '&current=temperature_2m,rain,snowfall,weather_code'
    + '&timezone=auto'
    + '&temperature_unit=celsius&wind_speed_unit=kmh';

const WMO = new Map([
    [0, 'Clear sky'],
    [1, 'Mainly clear'],
    [2, 'Partly cloudy'],
    [3, 'Overcast'],
    [45, 'Fog'],
    [48, 'Depositing rime fog'],
    [51, 'Drizzle: light'],
    [53, 'Drizzle: moderate'],
    [55, 'Drizzle: dense'],
    [56, 'Freezing drizzle: light'],
    [57, 'Freezing drizzle: dense'],
    [61, 'Rain: slight'],
    [63, 'Rain: moderate'],
    [65, 'Rain: heavy'],
    [66, 'Freezing rain: light'],
    [67, 'Freezing rain: heavy'],
    [71, 'Snowfall: slight'],
    [73, 'Snowfall: moderate'],
    [75, 'Snowfall: heavy'],
    [77, 'Snow grains'],
    [80, 'Rain showers: slight'],
    [81, 'Rain showers: moderate'],
    [82, 'Rain showers: violent'],
    [85, 'Snow showers: slight'],
    [86, 'Snow showers: heavy'],
    [95, 'Thunderstorm: slight or moderate'],
    [96, 'Thunderstorm with slight hail'],
    [99, 'Thunderstorm with heavy hail']
]);

const codeToText = code => WMO.get(Number(code)) ?? `Unknown code ${code}`;

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
