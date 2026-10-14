🌦️ Weather Forecasting Application
📌 Overview
The Weather Forecasting Application is a web-based application that provides current weather conditions and forecast information for different locations. It uses the Open-Meteo API to retrieve weather data and displays it through a simple and user-friendly interface.

The application helps users check temperature, weather conditions, and forecasts to plan their daily activities.

🎯 Objectives
Display current weather conditions.
Provide temperature and weather forecasts.
Show weather conditions using icons and descriptions.
Allow users to search for different locations.
Provide temperature values in Celsius or Fahrenheit.
Create a responsive and easy-to-use user interface.
🛠️ Technologies Used
HTML5 – Structures the web page.
CSS3 – Styles the application and creates a responsive layout.
JavaScript – Handles API requests, processes weather data, and updates the interface.
Open-Meteo API – Provides weather forecast information.
Open-Meteo Geocoding API – Helps find geographical coordinates from location names.
✨ Features
🌡️ Current temperature display.
☀️ Weather conditions with icons and descriptions.
📅 Daily weather forecasts.
🕒 Hourly forecasts, if implemented.
📍 Location-based weather information.
🔍 Search for locations by name.
🌡️ Temperature unit conversion between Celsius and Fahrenheit, if implemented.
📱 User-friendly interface.
🌐 APIs Used
1. Open-Meteo Forecast API
Used to retrieve weather information based on geographical coordinates.

https://api.open-meteo.com/v1/forecast
2. Open-Meteo Geocoding API
Used to search for locations and retrieve their geographical coordinates.

https://geocoding-api.open-meteo.com/v1/search
API documentation: Open-Meteo Documentation

⚙️ How It Works
The user opens the Weather Forecasting Application.
The user enters a location or uses the default location.
The application obtains the latitude and longitude of the selected location.
JavaScript sends a request to the Open-Meteo Forecast API.
The API returns weather information in JSON format.
The application processes the response.
The weather information is displayed on the screen.
📂 Project Structure
Weather-Forecasting-Application/
│
├── index.html       # Application structure
├── style.css        # Application styling
├── script.js        # Application logic and API integration
└── README.md        # Project documentation
Note: Update the file names above to match your actual project structure.

🚀 How to Run the Project
Download or clone the project repository.
Open the project folder in Visual Studio Code or another code editor.
Make sure all HTML, CSS, and JavaScript files are in the correct locations.
Open index.html in a web browser, preferably using the Live Server extension in Visual Studio Code.
Search for a location to view its weather information.
An internet connection is required to retrieve live weather data from the API.

💡 Example API Request
The following example retrieves current weather information and a daily forecast for a location in India.

const API = "https://api.open-meteo.com/v1/forecast";

const response = await fetch(
  `${API}?latitude=14.1463&longitude=79.8504&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata`
);

const data = await response.json();

console.log(data);


✅ Advantages
Provides quick access to weather information.
Helps users plan daily activities.
Supports location-based weather searches.
Uses an external API to retrieve weather data.
Can be accessed through a web browser.
Demonstrates practical use of JavaScript and API integration.

⚠️ Limitations
Requires an internet connection for updated weather data.
Forecast accuracy depends on the underlying weather models.
API errors or invalid location searches may affect results.
Features depend on the functionality implemented in the application.

🔮 Future Enhancements
Automatic location detection with user permission.
Severe-weather alerts and notifications.
Interactive weather maps.
Improved mobile and tablet support.
Historical weather information.
Extended weather forecasts.


