🌦️ Weather Forecasting Application
A responsive web application that provides real-time weather information and weather forecasts for different locations using the Open-Meteo API.


The application retrieves weather data from the Open-Meteo API and displays important weather details such as temperature, weather conditions, and forecasts. It can also use a geocoding service to convert a location name into geographical coordinates.

This project demonstrates the practical implementation of API integration, asynchronous JavaScript, JSON data handling, and dynamic webpage updates.

🎯 Project Objectives
The main objectives of this project are:

To provide users with convenient access to weather information.
To display current weather conditions for a selected location.
To provide daily and hourly forecasts, where implemented.
To retrieve weather information using an external API.
To display weather conditions through suitable icons and descriptions.
To create an attractive and responsive user interface.
To understand how frontend technologies interact with external APIs.


✨ Features
🌡️ Weather Information
Displays the current temperature.
Shows weather conditions such as sunny, cloudy, and rainy.
Displays additional weather measurements supported by the application.
📍 Location Search
Allows users to search for locations by name, if implemented.
Uses geographical coordinates to retrieve weather information.
Supports a default location for initial weather display.
📅 Weather Forecast
Displays daily weather forecasts, if implemented.
Can show minimum and maximum temperatures.
Can display hourly weather information.
🎨 User Interface
Simple and easy-to-use design.
Weather icons and descriptive labels.
Organized presentation of weather information.
Responsive layout, depending on the CSS implementation.
🌡️ Temperature Units
Supports Celsius and Fahrenheit if unit conversion is implemented.
Presents temperature values in a readable format.
🛠️ Technologies Used
Technology	Purpose
HTML5	Creates the structure of the application
CSS3	Provides styling, layout, and responsive design
JavaScript	Handles application logic and API requests
Open-Meteo Forecast API	Retrieves weather forecast data
Open-Meteo Geocoding API	Searches for locations and coordinates
JSON	Transfers weather data between the API and application


🌐 APIs Used
1. Open-Meteo Forecast API
The Forecast API retrieves weather information using latitude and longitude coordinates.

API endpoint:

https://api.open-meteo.com/v1/forecast

Documentation: https://open-meteo.com/en/docs

2. Open-Meteo Geocoding API
The Geocoding API searches for a location using its name and returns geographical details such as latitude and longitude.

API endpoint:

https://geocoding-api.open-meteo.com/v1/search

Documentation: https://open-meteo.com/en/docs/geocoding-api

⚙️ How the Application Works
The application follows these steps:

The user opens the Weather Forecasting Application.
The application initializes the default location.
If the user searches for a place, the application obtains its coordinates through the Geocoding API.
JavaScript sends a request to the Forecast API.
The API processes the request and returns weather data in JSON format.
JavaScript reads and processes the returned data.
The application updates the webpage with the available weather information.
The user views the weather details through the interface.
🏗️ System Architecture
          USER
            |
            v
     WEB INTERFACE
       HTML + CSS
            |
            v
        JAVASCRIPT
            |
            v
     LOCATION SEARCH
     Geocoding API
            |
            v
     LATITUDE & LONGITUDE
            |
            v
      FORECAST API
            |
            v
       JSON RESPONSE
            |
            v
    DATA PROCESSING
            |
            v
    WEATHER DISPLAY
📂 Project Structure
Weather-Forecasting-Application/
│
├── index.html
│   └── Main webpage structure
│
├── style.css
│   └── Styling and layout
│
├── script.js
│   └── JavaScript logic and API integration
│
└── README.md
    └── Project documentation
Note: Update these filenames if your actual project uses different names or folders.

Steps
Step 1: Download the project

Download the project files or clone the repository.

git clone YOUR_GITHUB_REPOSITORY_URL
Replace YOUR_GITHUB_REPOSITORY_URL with your actual repository URL.

Step 2: Open the project

Open the project folder in Visual Studio Code.

Step 3: Run the application

Open index.html in your browser, or use the Live Server extension in Visual Studio Code.

Step 4: View weather information

Search for a location if the search feature is implemented, and view the displayed weather information.

📊 Example Weather Output
The application may display weather information in the following format:

Weather Detail	Example
Location	Gudur
Temperature	Retrieved from the API
Weather Condition	Sunny, cloudy, or rainy
Humidity	Retrieved from the API
Wind Speed	Retrieved from the API
Maximum Temperature	Retrieved from the daily forecast
Minimum Temperature	Retrieved from the daily forecast
The actual values depend on the API response and selected location.

🔐 Error Handling
The application should handle common errors to provide a better user experience.

Network error: Display a message when the internet connection fails.
API error: Handle unsuccessful HTTP responses.
Invalid location: Inform the user when a location cannot be found.
Missing data: Avoid displaying undefined or unavailable values.
Loading state: Show a loading indicator while retrieving weather information.
✅ Advantages
Easy access to weather information.
Simple and user-friendly interface.
Quick retrieval of weather data.
Location-based weather information.
No separate database is required for basic API-based functionality.
Useful for learning modern frontend development.
Demonstrates asynchronous programming and API integration.
⚠️ Limitations
An internet connection is required to retrieve updated weather data.
Forecast accuracy depends on the underlying weather models.
Weather information may be unavailable when the API or network fails.
Available features depend on the implemented code.
Location search depends on the accuracy of the entered place name and geocoding results.


