import styles from "./weather.module.scss";

interface WeatherProps {
  data: any;
}
const Weather = ({ data }: WeatherProps) => {
  console.log("Data", data);
  return (
    <div className={styles.weather_container}>
      <div className={styles.left_container}>
        <div className={styles.weather_overview}>
          <img
            alt="weather"
            className={styles.weather_icon}
            color="white"
            src={`icons/${data.weather[0].icon}.png`}
          />
          <p className={styles.description}>{data.weather[0].description}</p>
          {/* <div className={styles.temperature_container}> */}
            <p className={styles.temperature}>
              {Math.round(data.main.temp)}
            </p>
            <span className={styles.degrees}>&deg;</span>
          {/* </div> */}
        </div>
      </div>
      <div className={styles.right_container}>
        <h4 className={styles.name}>
          {data?.name}, {data?.sys?.country}
        </h4>
      </div>
    </div>
  );
};

export default Weather;
