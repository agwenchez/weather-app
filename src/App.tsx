import React, { useState } from "react";
import "../src/scss/main.scss";
import {
  useGetCurrentWeatherReportQuery,
  useGetForecastReportQuery,
  useLazyGetCurrentWeatherReportQuery,
} from "./app/services";
// import SearchInput from "./components/Search";
import Weather from "./components/Weather";
// import { API_KEY } from "./constants";
// import { API_KEY } from "./constants";
import useGeolocation from "./hooks/useGeolocation";
import useDebounce from "./hooks/useDebounce";
import Forecast from "./components/Forecast";

function App() {
  const { coords } = useGeolocation();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  const params = {
    lat: coords.latitude,
    lon: coords.longitude,
    units: "metric",
    APPID: "ab32a51da647d27bbd2ace7810f2a664",
  };
  const {
    data: weatherReport,
    isLoading: isWeatherReportLoading,
    isError: isWeatherReporError,
    isFetching: isWeatherReportFetching,
  } = useGetCurrentWeatherReportQuery(params, { refetchOnReconnect: true });
  const [trigger, { data: searchResults, isLoading: isSearching }] =
    useLazyGetCurrentWeatherReportQuery();

  // console.log("Data", searchResults);
  const {
    data: forecastReport,
    isLoading: isForecastReportLoading,
    isError: isForecastReporError,
    isFetching: isForecastReportFetching,
  } = useGetForecastReportQuery(params);

  console.log("Forecast", forecastReport);
  console.log("Weather", weatherReport);

  const debouncedSearch = useDebounce((searchTerm) => {
    // console.log("Fetching data for", searchTerm);
    trigger({ q: searchTerm, ...params });
  }, 1000);

  return (
    <div className="app_container">
      <div className="search_container">
        <input
          type="search"
          className="search"
          placeholder="search by city here..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e);
            debouncedSearch(e.target.value);
          }}
        />
      </div>
      {isWeatherReporError && !isWeatherReportLoading ? (
        <div className="error_container">
          <p className="error_message">An error occured!</p>
        </div>
      ) : isSearching ? (
        <div className="loading_container">
          <p>Searching for weather report</p>
        </div>
      ) : (
        <Weather loading={isWeatherReportLoading || isWeatherReportFetching} data={searchTerm ? searchResults : weatherReport} />
      )}

      <div className="forecast_wrapper">
        {forecastReport?.list?.map((item) => (
          <Forecast />
        ))}
      </div>
    </div>
  );
}

export default App;
