// Global Variables
let currentCity = 'Bandar Lampung';
let isCelsius = true;
let isDarkMode = false;
let weatherData = null;
let forecastData = [];
let updateInterval = null;
let favoriteCities = ['Bandar Lampung', 'Jakarta', 'Bandung', 'Padang', 'Lampung'];

const cityList = [
    // Sumatera
    'Banda Aceh', 'Lhokseumawe', 'Langsa', 'Sabang', 'Subulussalam',
    'Medan', 'Binjai', 'Tebing Tinggi', 'Pematang Siantar', 'Tanjung Balai',
    'Padang Sidempuan', 'Gunung Sitoli', 'Sibolga',
    'Padang', 'Bukittinggi', 'Solok', 'Payakumbuh', 'Pariaman', 
    'Sawahlunto', 'Padang Panjang',
    'Pekanbaru', 'Dumai', 'Batam', 'Tanjung Pinang',
    'Jambi', 'Sungai Penuh',
    'Palembang', 'Prabumulih', 'Lubuk Linggau', 'Pagar Alam',
    'Bengkulu',
    'Bandar Lampung', 'Metro', 'Lampung',
    
    // Jawa
    'Jakarta', 'Tangerang', 'Tangerang Selatan', 'Depok', 'Bekasi',
    'Bogor', 'Sukabumi', 'Cirebon', 'Tasikmalaya', 'Banjar',
    'Bandung', 'Cimahi',
    'Semarang', 'Salatiga', 'Surakarta', 'Solo', 'Magelang', 'Pekalongan',
    'Tegal', 'Surabaya', 'Malang', 'Batu', 'Blitar', 'Kediri',
    'Mojokerto', 'Madiun', 'Pasuruan', 'Probolinggo',
    'Yogyakarta', 'Bantul', 'Sleman',
    'Serang', 'Cilegon', 'Pandeglang',
    
    // Kalimantan
    'Pontianak', 'Singkawang',
    'Palangkaraya',
    'Banjarmasin', 'Banjarbaru', 'Martapura',
    'Samarinda', 'Balikpapan', 'Bontang', 'Tarakan',
    'Tanjung Selor',
    
    // Sulawesi
    'Manado', 'Bitung', 'Tomohon', 'Kotamobagu',
    'Gorontalo',
    'Palu', 'Poso',
    'Makassar', 'Parepare', 'Palopo',
    'Kendari', 'Bau-Bau',
    'Mamuju',
    
    // Bali & Nusa Tenggara
    'Denpasar', 'Bali', 'Singaraja', 'Ubud', 'Kuta',
    'Mataram', 'Bima', 'Lombok',
    'Kupang', 'Labuan Bajo',
    
    // Maluku & Papua
    'Ambon', 'Tual',
    'Ternate', 'Tidore',
    'Jayapura', 'Sorong', 'Manokwari', 'Merauke', 'Timika',
    
    // Luar Negeri - Asia
    'Singapore', 'Kuala Lumpur', 'Bangkok', 'Manila', 'Hanoi',
    'Ho Chi Minh', 'Phnom Penh', 'Vientiane', 'Yangon', 'Naypyidaw',
    'Bandar Seri Begawan', 'Dili', 'Tokyo', 'Osaka', 'Seoul',
    'Busan', 'Beijing', 'Shanghai', 'Hong Kong', 'Taipei',
    'New Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai',
    'Islamabad', 'Karachi', 'Dhaka', 'Colombo', 'Kathmandu',
    'Dubai', 'Abu Dhabi', 'Doha', 'Riyadh', 'Jeddah',
    'Tehran', 'Baghdad', 'Damascus', 'Beirut', 'Amman',
    'Jerusalem', 'Tel Aviv', 'Ankara', 'Istanbul',
    
    // Luar Negeri - Eropa
    'London', 'Manchester', 'Liverpool', 'Edinburgh',
    'Paris', 'Lyon', 'Marseille', 'Nice',
    'Berlin', 'Munich', 'Frankfurt', 'Hamburg',
    'Rome', 'Milan', 'Venice', 'Florence',
    'Madrid', 'Barcelona', 'Valencia', 'Seville',
    'Amsterdam', 'Rotterdam', 'Brussels', 'Vienna',
    'Zurich', 'Geneva', 'Stockholm', 'Oslo',
    'Copenhagen', 'Helsinki', 'Prague', 'Budapest',
    'Warsaw', 'Athens', 'Moscow', 'Saint Petersburg',
    
    // Luar Negeri - Amerika
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Miami', 'Boston', 'Seattle', 'Denver', 'Las Vegas',
    'Portland', 'San Francisco', 'Washington', 'Atlanta',
    'Toronto', 'Montreal', 'Vancouver', 'Ottawa', 'Calgary',
    'Mexico City', 'Guadalajara', 'Monterrey',
    'Buenos Aires', 'Cordoba', 'Rosario',
    'Sao Paulo', 'Rio de Janeiro', 'Brasilia',
    'Santiago', 'Lima', 'Bogota', 'Caracas', 'Quito',
    
    // Luar Negeri - Afrika
    'Cairo', 'Alexandria', 'Lagos', 'Accra', 'Nairobi',
    'Johannesburg', 'Cape Town', 'Pretoria', 'Durban',
    'Casablanca', 'Algiers', 'Tunis', 'Addis Ababa',
    
    // Luar Negeri - Oceania
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
    'Auckland', 'Wellington', 'Christchurch',
    'Port Moresby', 'Suva', 'Apia'
];

// Initialize
window.addEventListener('load', function() {
    displayFavorites();
    fetchWeatherData(currentCity);
    startAutoUpdate();
});

// Weather Icons
function getWeatherIcon(condition) {
    const icons = {
        'clear': '☀️',
        'sunny': '☀️',
        'clouds': '☁️',
        'cloudy': '☁️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'fog': '🌫️'
    };

    const lowerCondition = condition.toLowerCase();
    for (let key in icons) {
        if (lowerCondition.includes(key)) {
            return icons[key];
        }
    }
    return '🌤️';
}

// Fetch Weather Data using Fetch API from OpenWeatherMap
function fetchWeatherData(city) {
    showStatus('loading', 'Loading weather data...');
    
    const apiKey = '8f0e81119b89d707b293c01d5c7e6e46';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(function(data) {
            const weatherInfo = {
                city: data.name,
                temperature: data.main.temp,
                condition: data.weather[0].main,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed * 3.6,
                feelsLike: data.main.feels_like,
                timestamp: new Date()
            };
            
            weatherData = weatherInfo;
            currentCity = data.name;
            
            displayCurrentWeather(weatherInfo);
            fetchForecastData(data.coord.lat, data.coord.lon);
            showStatus('success', 'Weather data loaded successfully!');
            
            setTimeout(function() {
                hideStatus();
            }, 2000);
        })
        .catch(function(error) {
            showStatus('error', 'Error loading weather data: ' + error.message);
            
            // Fallback to mock data if API fails
            setTimeout(function() {
                const mockData = generateMockWeatherData(city);
                weatherData = mockData;
                displayCurrentWeather(mockData);
                generateForecast(city);
                showStatus('success', 'Showing sample data (API unavailable)');
            }, 1500);
        });
}

// Fetch 5-Day Forecast from OpenWeatherMap
function fetchForecastData(lat, lon) {
    const apiKey = '8f0e81119b89d707b293c01d5c7e6e46';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            forecastData = [];
            const dailyData = {};
            
            // Group forecast by day
            data.list.forEach(function(item) {
                const date = new Date(item.dt * 1000);
                const dateKey = date.toDateString();
                
                if (!dailyData[dateKey]) {
                    dailyData[dateKey] = {
                        temps: [],
                        conditions: [],
                        date: date
                    };
                }
                
                dailyData[dateKey].temps.push(item.main.temp);
                dailyData[dateKey].conditions.push(item.weather[0].main);
            });
            
            // Get 5 days forecast
            let count = 0;
            for (let dateKey in dailyData) {
                if (count >= 5) break;
                
                const dayData = dailyData[dateKey];
                const temps = dayData.temps;
                const mostCommon = getMostCommonCondition(dayData.conditions);
                
                forecastData.push({
                    day: dayData.date.toLocaleDateString('id-ID', { weekday: 'short' }),
                    date: dayData.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
                    condition: mostCommon,
                    maxTemp: Math.max(...temps),
                    minTemp: Math.min(...temps)
                });
                
                count++;
            }
            
            displayForecast();
        })
        .catch(function(error) {
            console.error('Forecast error:', error);
            generateForecast(currentCity);
        });
}

function getMostCommonCondition(conditions) {
    const counts = {};
    let maxCount = 0;
    let mostCommon = conditions[0];
    
    conditions.forEach(function(condition) {
        counts[condition] = (counts[condition] || 0) + 1;
        if (counts[condition] > maxCount) {
            maxCount = counts[condition];
            mostCommon = condition;
        }
    });
    
    return mostCommon;
}

// Generate Mock Weather Data
function generateMockWeatherData(city) {
    const conditions = ['Clear Sky', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Sunny', 'Overcast'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
        city: city,
        temperature: Math.floor(Math.random() * 15 + 20),
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 30 + 50),
        windSpeed: Math.floor(Math.random() * 20 + 5),
        feelsLike: Math.floor(Math.random() * 15 + 18),
        timestamp: new Date()
    };
}

// Display Current Weather
function displayCurrentWeather(data) {
    document.getElementById('currentWeather').style.display = 'block';
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('timestamp').textContent = 'Last updated: ' + formatTime(data.timestamp);
    document.getElementById('weatherIcon').textContent = getWeatherIcon(data.condition);
    document.getElementById('temperature').textContent = convertTemp(data.temperature) + '°';
    document.getElementById('condition').textContent = data.description || data.condition;
    document.getElementById('humidity').textContent = Math.round(data.humidity) + '%';
    document.getElementById('windSpeed').textContent = Math.round(data.windSpeed) + ' km/h';
    document.getElementById('feelsLike').textContent = convertTemp(data.feelsLike) + '°';
    
    updateFavoriteButton();
}

// Generate Forecast
function generateForecast(city) {
    forecastData = [];
    const conditions = ['Clear Sky', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Sunny'];
    
    for (let i = 1; i <= 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        forecastData.push({
            day: date.toLocaleDateString('id-ID', { weekday: 'short' }),
            date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            maxTemp: Math.floor(Math.random() * 10 + 28),
            minTemp: Math.floor(Math.random() * 10 + 18)
        });
    }
    
    displayForecast();
}

// Display Forecast
function displayForecast() {
    document.getElementById('forecastSection').style.display = 'block';
    const grid = document.getElementById('forecastGrid');
    let html = '';
    
    forecastData.forEach(function(day) {
        html += `
            <div class="forecast-card">
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-date">${day.date}</div>
                <div class="forecast-icon">${getWeatherIcon(day.condition)}</div>
                <div style="font-size: 14px; margin: 5px 0;">${day.condition}</div>
                <div class="forecast-temps">
                    <span class="temp-max">${convertTemp(day.maxTemp)}°</span>
                    <span class="temp-min">${convertTemp(day.minTemp)}°</span>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Search Functionality
function searchCity() {
    const input = document.getElementById('cityInput').value.trim();
    if (input) {
        currentCity = input;
        fetchWeatherData(input);
        document.getElementById('cityInput').value = '';
        document.getElementById('suggestions').classList.remove('active');
    }
}

function handleSearchInput(event) {
    const value = event.target.value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    
    if (event.key === 'Enter') {
        searchCity();
        return;
    }
    
    if (value.length > 0) {
        const filtered = cityList.filter(function(city) {
            return city.toLowerCase().includes(value);
        });
        
        if (filtered.length > 0) {
            let html = '';
            filtered.forEach(function(city) {
                html += `<div class="suggestion-item" onclick="selectCity('${city}')">${city}</div>`;
            });
            suggestionsDiv.innerHTML = html;
            suggestionsDiv.classList.add('active');
        } else {
            suggestionsDiv.classList.remove('active');
        }
    } else {
        suggestionsDiv.classList.remove('active');
    }
}

function selectCity(city) {
    document.getElementById('cityInput').value = city;
    currentCity = city;
    fetchWeatherData(city);
    document.getElementById('cityInput').value = '';
    document.getElementById('suggestions').classList.remove('active');
}

// Favorites
function displayFavorites() {
    const container = document.getElementById('favorites');
    let html = '';
    
    favoriteCities.forEach(function(city) {
        html += `<button class="favorite-btn" onclick="selectCity('${city}')">⭐ ${city}</button>`;
    });
    
    container.innerHTML = html;
}

function toggleFavorite() {
    const index = favoriteCities.indexOf(currentCity);
    
    if (index > -1) {
        favoriteCities.splice(index, 1);
    } else {
        favoriteCities.push(currentCity);
    }
    
    displayFavorites();
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const btn = document.getElementById('favoriteBtn');
    if (favoriteCities.indexOf(currentCity) > -1) {
        btn.textContent = '⭐ Remove from Favorites';
    } else {
        btn.textContent = '☆ Add to Favorites';
    }
}

// Temperature Conversion
function convertTemp(temp) {
    if (isCelsius) {
        return Math.round(temp);
    } else {
        return Math.round((temp * 9/5) + 32);
    }
}

function toggleUnit() {
    isCelsius = !isCelsius;
    document.getElementById('unitBtn').textContent = isCelsius ? '°C' : '°F';
    
    if (weatherData) {
        displayCurrentWeather(weatherData);
        displayForecast();
    }
}

// Theme Toggle
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    document.getElementById('themeBtn').textContent = isDarkMode ? '☀️ Light' : '🌙 Dark';
}

// Status Messages
function showStatus(type, message) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.className = 'status-message ' + type;
    
    if (type === 'loading') {
        statusDiv.innerHTML = '<div class="spinner"></div>' + message;
    } else {
        const icon = type === 'error' ? '❌' : '✅';
        statusDiv.textContent = icon + ' ' + message;
    }
}

function hideStatus() {
    document.getElementById('statusMessage').className = 'status-message';
}

// Auto Update
function startAutoUpdate() {
    updateInterval = setInterval(function() {
        if (currentCity) {
            fetchWeatherData(currentCity);
        }
    }, 5 * 60 * 1000);
}

function manualRefresh() {
    if (currentCity) {
        fetchWeatherData(currentCity);
    }
}

// Helper Functions
function formatTime(date) {
    return date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit'
    });
}

// Close suggestions when clicking outside
document.addEventListener('click', function(event) {
    const suggestionsDiv = document.getElementById('suggestions');
    const input = document.getElementById('cityInput');
    
    if (!suggestionsDiv.contains(event.target) && event.target !== input) {
        suggestionsDiv.classList.remove('active');
    }
});