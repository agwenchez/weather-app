import styles from "./app.module.scss";
import { useGetCurrentWeatherReportQuery } from "./app/services";
import SearchInput from "./components/Search";
import Weather from "./components/Weather";
// import { API_KEY } from "./constants";
// import { API_KEY } from "./constants";
import useGeolocation from "./hooks/useGeolocation";

function App() {
  const { coords } = useGeolocation();

  const params = {
    lat: coords.latitude,
    lon: coords.longitude,
    units: "metric",
    APPID: "ab32a51da647d27bbd2ace7810f2a664",
  };
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetCurrentWeatherReportQuery(params, {refetchOnReconnect:true, refetchOnFocus:true});

  return (
    <div className={styles.app_container}>
      <SearchInput />
      {isLoading ? (
        <div className={styles.loading_container}>
          <div className={styles.loading_spinner} />
          <p>Loading weather information </p>
        </div>
      ) : isFetching ? (
        <div className={styles.loading_container}>
          <div className={styles.loading_spinner} />
            <p>Fetching details for {data?.name}, {data?.sys?.country}</p>
        </div>
      ) : isError ? (
        <div className={styles.error_container}>
          <p className={styles.error_message}>An error occured!</p>
        </div>
      ) : (
        <Weather data={data} />
      )}
    </div>
  );
}

export default App;
