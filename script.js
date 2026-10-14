const API = "https://api.open-meteo.com/v1/forecast";
const GEO = "https://geocoding-api.open-meteo.com/v1/search";

const $ = (id) => document.getElementById(id);

let currentWeather = null;
let currentForecast = null;
let currentPlace = {
  name: "Hyderabad",
  admin: "Telangana",
  country: "India",
  latitude: 17.385,
  longitude: 78.4867,
  timezone: "Asia/Kolkata"
};

let unit = "C";

const weatherCodes = {
  0: ["Clear sky", "☀️", "sunny"],
  1: ["Mainly clear", "🌤️", "sunny"],
  2: ["Partly cloudy", "⛅", "cloudy"],
  3: ["Overcast", "☁️", "cloudy"],
  45: ["Foggy", "🌫️", "cloudy"],
  48: ["Rime fog", "🌫️", "cloudy"],
  51: ["Light drizzle", "🌦️", "rainy"],
  53: ["Drizzle", "🌦️", "rainy"],
  55: ["Dense drizzle", "🌧️", "rainy"],
  56: ["Freezing drizzle", "🌧️", "rainy"],
  57: ["Heavy freezing drizzle", "🌧️", "rainy"],
  61: ["Light rain", "🌦️", "rainy"],
  63: ["Moderate rain", "🌧️", "rainy"],
  65: ["Heavy rain", "🌧️", "rainy"],
  66: ["Freezing rain", "🌧️", "rainy"],
  67: ["Heavy freezing rain", "🌧️", "rainy"],
  71: ["Light snow", "🌨️", "snowy"],
  73: ["Moderate snow", "❄️", "snowy"],
  75: ["Heavy snow", "❄️", "snowy"],
  77: ["Snow grains", "🌨️", "snowy"],
  80: ["Rain showers", "🌦️", "rainy"],
  81: ["Moderate showers", "🌧️", "rainy"],
  82: ["Violent showers", "⛈️", "rainy"],
  85: ["Snow showers", "🌨️", "snowy"],
  86: ["Heavy snow showers", "❄️", "snowy"],
  95: ["Thunderstorm", "⛈️", "rainy"],
  96: ["Thunderstorm with hail", "⛈️", "rainy"],
  99: ["Severe thunderstorm", "⛈️", "rainy"]
};

function weatherInfo(code) {
  return weatherCodes[code] || ["Unknown conditions", "🌡️", "cloudy"];
}

function temperature(value) {
  if (value == null || !Number.isFinite(value)) return "--°";
  const result = unit === "C" ? value : value * 9 / 5 + 32;
  return `${Math.round(result)}°`;
}

function setStatus(message, error = false) {
  $("status").textContent = message;
  $("status").style.color = error ? "#ffd1c9" : "";
}

function setBackground(code, isDay) {
  const [, , theme] = weatherInfo(code);
  const bg = $("background");
  bg.className = "background";

  if (!isDay) {
    bg.classList.add("night");
  } else {
    bg.classList.add(theme);
  }
}

function formatDate(dateString, options) {
  // Interpret YYYY-MM-DD as a local calendar date,
  // avoiding UTC date shifts.
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(
    undefined,
    options
  );
}

async function getWeather(place) {
  setStatus("Fetching the latest weather...");
  $("searchBtn").disabled = true;

  try {
    const url = new URL(API);

    url.search = new URLSearchParams({
      latitude: place.latitude,
      longitude: place.longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code",
        "surface_pressure",
        "wind_speed_10m"
      ].join(","),
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max"
      ].join(","),
      forecast_days: "6",
      timezone: "auto",
      temperature_unit: "celsius",
      wind_speed_unit: "kmh"
    }).toString();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather service is unavailable. Please try again.");
    }

    const data = await response.json();

    if (!data.current || !data.daily) {
      throw new Error("Weather data is incomplete for this location.");
    }

    currentWeather = data.current;
    currentForecast = data.daily;
    currentPlace = {
      ...place,
      timezone: data.timezone || place.timezone || "auto"
    };

    renderWeather();
    renderForecast();

    setStatus(
      `Updated ${new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })} · Live weather data`
    );
  } catch (error) {
    console.error(error);
    setStatus(error.message || "Unable to load weather.", true);
  } finally {
    $("searchBtn").disabled = false;
  }
}

function renderWeather() {
  if (!currentWeather) return;

  const w = currentWeather;
  const [description, icon] = weatherInfo(w.weather_code);

  $("cityName").textContent = currentPlace.name;
  $("dateText").textContent =
    new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    }) + (currentPlace.admin ? ` · ${currentPlace.admin}` : "");

  $("temperature").textContent = temperature(w.temperature_2m);
  $("description").textContent = description;
  $("feelsLike").textContent =
    `Feels like ${temperature(w.apparent_temperature)}`;
  $("humidity").textContent = `${w.relative_humidity_2m}%`;
  $("wind").textContent = `${Math.round(w.wind_speed_10m)} km/h`;
  $("pressure").textContent =
    `${Math.round(w.surface_pressure)} hPa`;

  // Open-Meteo provides visibility in hourly data.
  // Use the current hour's value, not a fabricated measurement.
  const visibility = currentForecast
    ? currentForecast.visibility
    : null;

  if (Array.isArray(visibility)) {
    $("visibility").textContent =
      `${(visibility[0] / 1000).toFixed(1)} km`;
  } else {
    $("visibility").textContent = "N/A";
  }

  $("weatherIcon").textContent = icon;
  setBackground(w.weather_code, w.is_day);

  document.querySelectorAll(".unit").forEach((button) => {
    button.classList.toggle("active", button.dataset.unit === unit);
  });
}

function renderForecast() {
  if (!currentForecast) return;

  const daily = currentForecast;
  const forecast = $("forecast");

  // Skip today, and display the next five calendar days.
  const days = daily.time.slice(1, 6);

  forecast.innerHTML = days.map((date, i) => {
    const index = i + 1;
    const [description, icon] = weatherInfo(
      daily.weather_code[index]
    );

    const day = formatDate(date, { weekday: "short" });
    const high = temperature(daily.temperature_2m_max[index]);
    const low = temperature(daily.temperature_2m_min[index]);

    const rain = daily.precipitation_probability_max?.[index];
    const rainText = Number.isFinite(rain)
      ? `<p class="condition">${description}<br>${rain}% rain</p>`
      : `<p class="condition">${description}</p>`;

    return `
      <article class="forecast-day">
        <p class="day">${day}</p>
        <div class="icon" aria-hidden="true">${icon}</div>
        ${rainText}
        <div class="temps">
          <span>${high}</span>
          <span class="low">${low}</span>
        </div>
      </article>
    `;
  }).join("");
}

async function searchCity(city) {
  const query = city.trim();

  if (!query) {
    setStatus("Please enter a city name.", true);
    return;
  }

  setStatus("Searching for your city...");

  try {
    const response = await fetch(
      `${GEO}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error("Could not search for this city.");
    }

    const result = await response.json();
    const place = result.results?.[0];

    if (!place) {
      throw new Error("City not found. Try another spelling.");
    }

    await getWeather({
      name: place.name,
      admin: place.admin1 || "",
      country: place.country || "",
      latitude: place.latitude,
      longitude: place.longitude,
      timezone: place.timezone || "auto"
    });
  } catch (error) {
    setStatus(error.message || "City search failed.", true);
  }
}

$("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  searchCity($("cityInput").value);
});

$("locationBtn").addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus("Your browser does not support location services.", true);
    return;
  }

  setStatus("Requesting your location...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      await getWeather({
        name: "Your location",
        admin: "",
        country: "",
        latitude,
        longitude,
        timezone: "auto"
      });
    },
    (error) => {
      const message = error.code === 1
        ? "Location permission denied. Search for a city instead."
        : error.code === 3
          ? "Location request timed out. Please try again."
          : "Could not get your location. Search for a city instead.";

      setStatus(message, true);
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 }
  );
});

document.querySelectorAll(".unit").forEach((button) => {
  button.addEventListener("click", () => {
    unit = button.dataset.unit;
    renderWeather();
    renderForecast();
  });
});

// Show Hyderabad weather when the app opens.
getWeather(currentPlace);
