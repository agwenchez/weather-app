import { daysOfWeek } from "../../constants";
import styles from "./weather.module.scss";
import { MdLocationOn } from "react-icons/md";
interface WeatherProps {
  data: any;
}

const now = new Date();
const Weather = ({ data }: WeatherProps) => {
  //   console.log("Data", data);
  return (
    <div className={styles.weather_container}>
      {data && (
        <>
          <div className={styles.left_container}>
            <div className={styles.weather_overview}>
              <img
                alt="weather"
                className={styles.weather_icon}
                color="white"
                src={`icons/${data?.weather[0]?.icon}.png`}
              />
              <p className={styles.description}>
                {data?.weather[0]?.description}
              </p>
              <p className={styles.temperature}>
                {Math.round(data?.main?.temp)}
              </p>
              <span className={styles.temp_degrees}>{"°C"}</span>
              <p className={styles.feels_like}>
                Feels like {Math.round(data?.main?.feels_like)}
              </p>
              <span className={styles.feels_like_degrees}>{"°C"}</span>
            </div>
          </div>
          <div className={styles.right_container}>
            <h4 className={styles.name}>
              <MdLocationOn /> {data?.name}, {data?.sys?.country}
            </h4>
            <p className={styles.name}>
              {now.getDate()}/{now.getMonth()}/{now.getFullYear()}
            </p>
            <p className={styles.name}>{daysOfWeek[now.getDay()]}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
