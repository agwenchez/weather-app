import React, { useEffect, useState } from "react";
import "../src/scss/main.scss";
import {
  useGetCurrentWeatherReportQuery,
  useGetForecastReportQuery,
  useLazyGetCurrentWeatherReportQuery,
  useLazyGetForecastReportQuery,
  useLazyGetHourlyReportQuery,
} from "./app/services";
// import SearchInput from "./components/Search";
import Weather from "./components/Weather";
// import { API_KEY } from "./constants";
// import { API_KEY } from "./constants";
import useGeolocation from "./hooks/useGeolocation";
import useDebounce from "./hooks/useDebounce";
import Forecast from "./components/Forecast";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import { formatUnixTimestamp } from "./utils";

function App() {
  const { coords } = useGeolocation();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<string []>([])
  const [uniqueDays, setUniqueDays] = useState<string[]>([]);

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
  const [forecast , { data: forecastSearchResults, isLoading: isSearchingForecast }] =
    useLazyGetForecastReportQuery();

  const {
    data: forecastReport,
    // isLoading: isForecastReportLoading,
    // isError: isForecastReporError,
    // isFetching: isForecastReportFetching,
  } = useGetForecastReportQuery(params);

  // console.log("Forecast", forecastReport);
  // console.log("Weather", weatherReport);

  const debouncedSearch = useDebounce((searchTerm) => {
    // console.log("Fetching data for", searchTerm);
    trigger({ q: searchTerm, ...params });
    forecast({ q: searchTerm, ...params });
  }, 500);


  useEffect(() => {
    forecast({ q: searchTerm, ...params });
    const days: Set<string> = new Set();
    forecastSearchResults?.list?.forEach((item: { dt: number; }) => {
        const formattedDay = formatUnixTimestamp(item.dt);
        if (!days.has(formattedDay)) {
            days.add(formattedDay);
        }
    });
    setUniqueDays(Array.from(days));

    // Filtering data for the first unique day
    if (Array.from(days).length > 0) {
        const firstDay = Array.from(days)[0];
        const filtered = forecastSearchResults?.list?.filter((item: { dt: number; }) => formatUnixTimestamp(item.dt).includes(firstDay));
        setFilteredData(filtered);
    }
}, [forecastSearchResults, forecast]);

console.log('Filtered days', filteredData)

  return (
    <>
      <div className="header">
        <div className="logo">
          <svg
            width="98"
            height="24"
            viewBox="0 0 98 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C8.25317 4 5.07693 6.72606 4.92098 10.2808C3.19811 11.1021 2 12.8527 2 14.8903C2 17.7232 4.31288 20 7.1417 20L16.3725 20C19.4696 20 22 17.5075 22 14.4086C22 12.2522 20.7729 10.3885 18.986 9.45568C18.4142 6.30972 15.4541 4 12 4Z"
              fill="#0F172A"
            />
            <path
              d="M38.5682 17.7216L36 8.9943H37.7557L39.4659 15.4034H39.5511L41.267 8.9943H43.0227L44.7273 15.375H44.8125L46.5114 8.9943H48.267L45.7045 17.7216H43.9716L42.1989 11.4204H42.0682L40.2955 17.7216H38.5682Z"
              fill="#0F172A"
            />
            <path
              d="M53.375 17.8977C52.5152 17.8977 51.7746 17.714 51.1534 17.3466C50.536 16.9754 50.0587 16.4545 49.7216 15.7841C49.3883 15.1098 49.2216 14.3201 49.2216 13.4148C49.2216 12.5208 49.3883 11.7329 49.7216 11.0511C50.0587 10.3693 50.5284 9.8371 51.1307 9.45452C51.7367 9.07195 52.4451 8.88066 53.2557 8.88066C53.7481 8.88066 54.2254 8.9621 54.6875 9.12498C55.1496 9.28786 55.5644 9.54354 55.9318 9.89202C56.2992 10.2405 56.589 10.6932 56.8011 11.25C57.0133 11.803 57.1193 12.4754 57.1193 13.267V13.8693H50.1818V12.5966H55.4545C55.4545 12.1496 55.3636 11.7538 55.1818 11.4091C55 11.0606 54.7443 10.786 54.4148 10.5852C54.089 10.3844 53.7064 10.2841 53.267 10.2841C52.7898 10.2841 52.3731 10.4015 52.017 10.6363C51.6648 10.8674 51.392 11.1704 51.1989 11.5454C51.0095 11.9166 50.9148 12.3201 50.9148 12.7557V13.75C50.9148 14.3333 51.017 14.8295 51.2216 15.2386C51.4299 15.6477 51.7197 15.9602 52.0909 16.1761C52.4621 16.3882 52.8958 16.4943 53.392 16.4943C53.714 16.4943 54.0076 16.4488 54.2727 16.3579C54.5379 16.2632 54.767 16.1231 54.9602 15.9375C55.1534 15.7519 55.3011 15.5227 55.4034 15.25L57.0114 15.5398C56.8826 16.0132 56.6515 16.428 56.3182 16.7841C55.9886 17.1363 55.5739 17.411 55.0739 17.6079C54.5777 17.8011 54.0114 17.8977 53.375 17.8977Z"
              fill="#0F172A"
            />
            <path
              d="M61.544 17.9148C60.991 17.9148 60.491 17.8125 60.044 17.6079C59.5971 17.3996 59.2429 17.0985 58.9815 16.7045C58.724 16.3106 58.5952 15.8276 58.5952 15.2557C58.5952 14.7632 58.6899 14.3579 58.8793 14.0398C59.0687 13.7216 59.3243 13.4697 59.6463 13.2841C59.9683 13.0985 60.3281 12.9583 60.7259 12.8636C61.1236 12.7689 61.5289 12.6969 61.9418 12.6477C62.4645 12.5871 62.8887 12.5379 63.2145 12.5C63.5402 12.4583 63.777 12.392 63.9247 12.3011C64.0724 12.2102 64.1463 12.0625 64.1463 11.8579V11.8182C64.1463 11.3219 64.0062 10.9375 63.7259 10.6648C63.4493 10.392 63.0365 10.2557 62.4872 10.2557C61.9152 10.2557 61.4645 10.3826 61.1349 10.6363C60.8092 10.8863 60.5838 11.1648 60.4588 11.4716L58.8622 11.1079C59.0516 10.5776 59.3281 10.1496 59.6918 9.82384C60.0592 9.4943 60.4815 9.25566 60.9588 9.10793C61.4361 8.95642 61.938 8.88066 62.4645 8.88066C62.813 8.88066 63.1823 8.92233 63.5724 9.00566C63.9664 9.08521 64.3338 9.23293 64.6747 9.44884C65.0194 9.66475 65.3016 9.97346 65.5213 10.375C65.741 10.7727 65.8509 11.2898 65.8509 11.9261V17.7216H64.1918V16.5284H64.1236C64.0137 16.7481 63.849 16.964 63.6293 17.1761C63.4096 17.3882 63.1274 17.5644 62.7827 17.7045C62.438 17.8447 62.0251 17.9148 61.544 17.9148ZM61.9134 16.5511C62.383 16.5511 62.7846 16.4583 63.1179 16.2727C63.455 16.0871 63.7107 15.8447 63.8849 15.5454C64.063 15.2424 64.152 14.9185 64.152 14.5738V13.4488C64.0914 13.5094 63.974 13.5663 63.7997 13.6193C63.6293 13.6685 63.4342 13.7121 63.2145 13.75C62.9948 13.7841 62.7808 13.8163 62.5724 13.8466C62.3641 13.8731 62.1899 13.8958 62.0497 13.9148C61.7202 13.9564 61.419 14.0265 61.1463 14.125C60.8774 14.2235 60.6615 14.3655 60.4986 14.5511C60.3395 14.7329 60.2599 14.9754 60.2599 15.2784C60.2599 15.6988 60.4152 16.017 60.7259 16.2329C61.0365 16.4451 61.4323 16.5511 61.9134 16.5511Z"
              fill="#0F172A"
            />
            <path
              d="M72.1875 8.9943V10.3579H67.4205V8.9943H72.1875ZM68.6989 6.90339H70.3977V15.1591C70.3977 15.4886 70.447 15.7367 70.5455 15.9034C70.6439 16.0663 70.7708 16.178 70.9261 16.2386C71.0852 16.2954 71.2576 16.3238 71.4432 16.3238C71.5795 16.3238 71.6989 16.3144 71.8011 16.2954C71.9034 16.2765 71.983 16.2613 72.0398 16.25L72.3466 17.6534C72.2481 17.6913 72.108 17.7291 71.9261 17.767C71.7443 17.8087 71.517 17.8314 71.2443 17.8352C70.7974 17.8428 70.3807 17.7632 69.9943 17.5966C69.608 17.4299 69.2955 17.1723 69.0568 16.8238C68.8182 16.4754 68.6989 16.0379 68.6989 15.5113V6.90339Z"
              fill="#0F172A"
            />
            <path
              d="M75.9531 12.5398V17.7216H74.2543V6.08521H75.9304V10.4148H76.0384C76.2429 9.94505 76.5554 9.57195 76.9759 9.29543C77.3963 9.01892 77.9456 8.88066 78.6236 8.88066C79.2221 8.88066 79.7448 9.00377 80.1918 9.24998C80.6425 9.49619 80.991 9.86361 81.2372 10.3523C81.4872 10.8371 81.6122 11.4432 81.6122 12.1704V17.7216H79.9134V12.375C79.9134 11.7348 79.7486 11.2386 79.419 10.8863C79.0895 10.5303 78.6312 10.3523 78.044 10.3523C77.6425 10.3523 77.2827 10.4375 76.9645 10.6079C76.6501 10.7784 76.402 11.0284 76.2202 11.3579C76.0421 11.6837 75.9531 12.0776 75.9531 12.5398Z"
              fill="#0F172A"
            />
            <path
              d="M87.6406 17.8977C86.7808 17.8977 86.0402 17.714 85.419 17.3466C84.8016 16.9754 84.3243 16.4545 83.9872 15.7841C83.6539 15.1098 83.4872 14.3201 83.4872 13.4148C83.4872 12.5208 83.6539 11.7329 83.9872 11.0511C84.3243 10.3693 84.794 9.8371 85.3963 9.45452C86.0024 9.07195 86.7107 8.88066 87.5213 8.88066C88.0137 8.88066 88.491 8.9621 88.9531 9.12498C89.4152 9.28786 89.83 9.54354 90.1974 9.89202C90.5649 10.2405 90.8546 10.6932 91.0668 11.25C91.2789 11.803 91.3849 12.4754 91.3849 13.267V13.8693H84.4474V12.5966H89.7202C89.7202 12.1496 89.6293 11.7538 89.4474 11.4091C89.2656 11.0606 89.0099 10.786 88.6804 10.5852C88.3546 10.3844 87.9721 10.2841 87.5327 10.2841C87.0554 10.2841 86.6387 10.4015 86.2827 10.6363C85.9304 10.8674 85.6577 11.1704 85.4645 11.5454C85.2751 11.9166 85.1804 12.3201 85.1804 12.7557V13.75C85.1804 14.3333 85.2827 14.8295 85.4872 15.2386C85.6956 15.6477 85.9853 15.9602 86.3565 16.1761C86.7277 16.3882 87.1615 16.4943 87.6577 16.4943C87.9796 16.4943 88.2732 16.4488 88.5384 16.3579C88.8035 16.2632 89.0327 16.1231 89.2259 15.9375C89.419 15.7519 89.5668 15.5227 89.669 15.25L91.277 15.5398C91.1482 16.0132 90.9171 16.428 90.5838 16.7841C90.2543 17.1363 89.8395 17.411 89.3395 17.6079C88.8433 17.8011 88.277 17.8977 87.6406 17.8977Z"
              fill="#0F172A"
            />
            <path
              d="M93.2699 17.7216V8.9943H94.9119V10.3807H95.0028C95.1619 9.91096 95.4422 9.54164 95.8438 9.27271C96.2491 8.99998 96.7074 8.86361 97.2188 8.86361C97.3248 8.86361 97.4498 8.8674 97.5938 8.87498C97.7415 8.88255 97.857 8.89202 97.9403 8.90339V10.5284C97.8722 10.5094 97.7509 10.4886 97.5767 10.4659C97.4025 10.4394 97.2282 10.4261 97.054 10.4261C96.6525 10.4261 96.2945 10.5113 95.9801 10.6818C95.6695 10.8485 95.4233 11.0814 95.2415 11.3807C95.0597 11.6761 94.9688 12.0132 94.9688 12.392V17.7216H93.2699Z"
              fill="#0F172A"
            />
          </svg>
        </div>
        <div className="search-box">
          <div className="search-box-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.31573 13.7811L4.04591 13.6098L3.31573 13.7811ZM3.31573 8.324L4.04591 8.49528L3.31573 8.324ZM18.7893 8.324L19.5195 8.15273L18.7893 8.324ZM18.7893 13.781L19.5195 13.9523L18.7893 13.781ZM13.781 18.7893L13.6098 18.0591L13.781 18.7893ZM8.324 18.7893L8.15273 19.5195L8.324 18.7893ZM8.324 3.31573L8.15272 2.58555L8.324 3.31573ZM13.781 3.31573L13.9523 2.58555L13.781 3.31573ZM20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L20.4697 21.5303ZM4.04591 13.6098C3.65136 11.9278 3.65136 10.1773 4.04591 8.49528L2.58555 8.15272C2.13815 10.06 2.13815 12.045 2.58555 13.9523L4.04591 13.6098ZM18.0591 8.49528C18.4537 10.1773 18.4537 11.9278 18.0591 13.6098L19.5195 13.9523C19.9669 12.045 19.9669 10.06 19.5195 8.15273L18.0591 8.49528ZM13.6098 18.0591C11.9278 18.4537 10.1773 18.4537 8.49528 18.0591L8.15273 19.5195C10.06 19.9669 12.045 19.9669 13.9523 19.5195L13.6098 18.0591ZM8.49528 4.04591C10.1773 3.65136 11.9278 3.65136 13.6098 4.04591L13.9523 2.58555C12.045 2.13815 10.06 2.13815 8.15272 2.58555L8.49528 4.04591ZM8.49528 18.0591C6.28757 17.5413 4.56377 15.8175 4.04591 13.6098L2.58555 13.9523C3.23351 16.7147 5.39038 18.8715 8.15273 19.5195L8.49528 18.0591ZM13.9523 19.5195C16.7147 18.8715 18.8715 16.7147 19.5195 13.9523L18.0591 13.6098C17.5413 15.8175 15.8175 17.5413 13.6098 18.0591L13.9523 19.5195ZM13.6098 4.04591C15.8175 4.56377 17.5413 6.28757 18.0591 8.49528L19.5195 8.15273C18.8715 5.39037 16.7147 3.23351 13.9523 2.58555L13.6098 4.04591ZM8.15272 2.58555C5.39037 3.23351 3.23351 5.39037 2.58555 8.15272L4.04591 8.49528C4.56377 6.28756 6.28757 4.56377 8.49528 4.04591L8.15272 2.58555ZM16.8048 17.8655L20.4697 21.5303L21.5303 20.4697L17.8655 16.8048L16.8048 17.8655Z"
                fill="#0F172A"
              />
            </svg>
          </div>
          <input
            className="search-box-input"
            placeholder="Search by city name here..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleSearch(e);
              debouncedSearch(e.target.value);
            }}
            type="search"
          />
        </div>
      </div>
      <CurrentWeather data={searchTerm ? searchResults : weatherReport} />
      <Forecast data={searchTerm ? forecastSearchResults : forecastReport}/>
      <Footer/>
    </>
    // <div className="app_container">
    //   <div className="search_container">
    //     <input
    //       type="search"
    //       className="search"
    //       placeholder="search by city here..."
    //       value={searchTerm}
    //       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //         handleSearch(e);
    //         debouncedSearch(e.target.value);
    //       }}
    //     />
    //   </div>
    //   {isWeatherReportLoading || !weatherReport ? (
    //     <div className="loading_container">
    //       <div className="loading_spinner" />
    //       <p>Loading weather information </p>
    //     </div>
    //   ) : isWeatherReportFetching ? (
    //     <div className="loading_container">
    //       <div className="loading_spinner" />
    //       <p>
    //         Fetching details for {weatherReport?.name},{" "}
    //         {weatherReport?.sys?.country}
    //       </p>
    //     </div>
    //   ) : isWeatherReporError ? (
    //     <div className="error_container">
    //       <p className="error_message">An error occured!</p>
    //     </div>
    //   ) : isSearching ? (
    //     <div className="loading_container">
    //       <p>Searching for weather report</p>
    //     </div>
    //   ) : (
    //     <Weather data={searchTerm ? searchResults : weatherReport} />
    //   )}

    //   <div className="forecast_wrapper">
    //     {forecastReport?.list?.map((item:any) => (
    //       <Forecast />
    //     ))}
    //   </div>
    // </div>
  );
}

export default App;
