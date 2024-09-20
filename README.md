# Weather Forecast

Welcome to the **Weather Forecast** project! This application allows users to search for cities, view a table of cities with infinite scroll, and access detailed weather information for each city.

## Features

- **Search Cities**: Enter a city name and click ENTER or click search button to view the city weather and forecast details.
- **Infinite Scroll**: Load more cities as you scroll down the table.
- **Detailed Weather Info**: Click on a city name to view detailed weather and forecast information of that city.
- **Switching Units**: Option to switch between Metric and Imperial units.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **React Infinite Scroll Component**: For implementing infinite scrolling.
- **React Loader Spinner**: For showing a loading spinner during data fetches.
- **React Router DOM**: For handling routing between pages.
- **OpenWeather API**: For fetching detailed weather information.
- **OpenDataSoft API**: For fetching cities data.

## Installation

To get started with the project locally, follow these steps:

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/ArvindhMM/weather-forecast.git
    ```

2. **Navigate to the Project Directory**:

    ```bash
    cd weather-forecast
    ```

3. **Install Dependencies**:

    ```bash
    npm install
    ```

4. **Start the Development Server**:

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. **Search for a City**: Use the input field at the top to type in a city name and press Enter or click the search icon.
2. **View City Details**: Click on a city name in the table to view its detailed weather information.
