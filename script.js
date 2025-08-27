const apiKey = '  '; 

const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeather');

const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const errorDiv = document.getElementById('error');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city === '') {
        errorDiv.textContent = 'Please enter a city name.';
        return;
    }

    errorDiv.textContent = '';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if(!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            cityName.textContent = data.name + ', ' + data.sys.country;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.textContent = `Weather: ${data.weather[0].description}`;
        })
        .catch(err => {
            errorDiv.textContent = err.message;
            cityName.textContent = '';
            temperature.textContent = '';
            description.textContent = '';
        });
});
