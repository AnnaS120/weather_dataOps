# Weather DataOps

A Node.js weather monitoring application that retrieves real-time weather data from the OpenWeatherMap API, stores weather information locally, and visualises historical temperature changes through an interactive dashboard.

## Overview

Weather DataOps is a weather data collection and visualisation project built using Node.js and Express.

The application retrieves current weather information for a configured city using the OpenWeatherMap API. The retrieved data is stored in JSON and CSV files, allowing the application to provide both current weather conditions and historical temperature records.

An Express server exposes REST API endpoints that allow the frontend dashboard to access the stored data. The dashboard displays current weather information and uses Plotly.js to visualise temperature changes over time.

## Live Demo

The application is deployed and accessible online:

**[View Weather DataOps](https://weather-dataops-yz5e.onrender.com)**

The live dashboard allows users to view current weather information and historical temperature visualisations.

## Features

- Fetches current weather data from the OpenWeatherMap API.
- Retrieves weather information for a configurable city.
- Stores the latest weather response in a JSON file.
- Maintains historical weather records in a CSV file.
- Provides REST API endpoints using Express.
- Displays current temperature and weather conditions.
- Visualises historical temperature changes using Plotly.js.
- Supports containerisation using Docker.
- Includes Jest for testing.

## Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript (Node.js) | Application logic and data collection |
| Express.js | Backend server and REST API |
| OpenWeatherMap API | External weather data source |
| JSON | Stores the latest weather response |
| CSV | Stores historical weather records |
| HTML & CSS | Frontend structure and styling |
| Plotly.js | Temperature visualisation |
| dotenv | Environment variable management |
| Docker | Application containerisation |
| Jest | Testing |

## Project Structure

```text
weather_dataOps/
│
├── .github/
│   └── workflows/       # GitHub Actions workflows
│
├── data/
│   ├── weather.json     # Latest weather data
│   └── weather_log.csv  # Historical weather records
│
├── public/
│   ├── index.html       # Dashboard structure
│   ├── client.js        # Frontend JavaScript
│   └── style.css        # Dashboard styling
│
├── tests/               # Test files
│
├── app.js               # Express server and API endpoints
├── fetchWeather.js      # Weather data collection
├── Dockerfile           # Docker configuration
├── package.json         # Project dependencies and scripts
├── package-lock.json    # Dependency lock file
└── .gitignore
```

## Getting Started

### Prerequisites

Before running the application, make sure you have:

- Node.js installed (Node.js 22 recommended).
- npm installed.
- An OpenWeatherMap API key.

### 1. Clone the repository

```bash
git clone https://github.com/AnnaS120/weather_dataOps.git
```

Navigate into the project directory:

```bash
cd weather_dataOps
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
WEATHER_API_KEY=your_api_key
CITY=London
PORT=5000
```

Replace `your_api_key` with your OpenWeatherMap API key and change the city if required.

**Important:** Never commit your API key or `.env` file to GitHub.

### 4. Fetch weather data

Run the data collection script:

```bash
node fetchWeather.js
```

This retrieves the current weather information and updates the files in the `data/` directory.

### 5. Start the Express server

In a separate terminal, run:

```bash
node app.js
```

The server will start on the configured port.

Open the following address in your browser:

```text
http://localhost:5000
```

The dashboard will display the latest collected weather information and the historical temperature chart.

## API Endpoints

The Express server provides the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/weather` | Returns the latest weather information from `weather.json`. |
| GET | `/api/weather-log` | Returns historical timestamps and temperatures from `weather_log.csv`. |

### Example response: `/api/weather-log`

```json
{
  "timestamps": [
    "2026-11-07T10:00:00.000Z",
    "2026-11-07T11:00:00.000Z"
  ],
  "temps": [12.5, 13.2]
}
```

*Example data for illustration.*

## Data Storage

The application uses two local files to store weather information:

**weather.json**

Stores the most recently retrieved weather response from OpenWeatherMap, including information such as temperature, weather conditions and city.

**weather_log.csv**

Maintains a historical record of weather observations, including:

- Timestamp (UTC)
- City
- Temperature
- Weather description

Each successful collection appends a new record to the CSV file.

## Docker

The project includes a Dockerfile for building and running the Express application in a container.

Build the Docker image:

```bash
docker build -t weather-dataops .
```

Run the container:

```bash
docker run -p 5000:5000 weather-dataops
```

Note that the current Docker configuration starts the Express server only. Weather data collection must be performed separately, and the container needs access to the required environment variables and data files.

## Testing

The project uses Jest as its testing framework.

To run the tests:

```bash
npm test
```

## Future Improvements

Potential improvements include:

- Automating periodic weather data collection.
- Storing historical weather data in a database.
- Adding support for multiple cities.
- Improving error handling and API validation.
- Expanding automated test coverage.
- Enhancing the dashboard with additional weather metrics.
