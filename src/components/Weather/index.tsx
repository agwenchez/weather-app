import { daysOfWeek } from "../../constants";
import "../../../src/scss/main.scss";
import { MdLocationOn } from "react-icons/md";
interface WeatherProps {
  data: any;
//   loading: boolean
}

const now = new Date();
const Weather = ({ data }: WeatherProps) => {
  //   console.log("Data", data);
  return (
    <div className="weather_container">
      {data && (
        <>
          <div className={"left_container"}>
            <div className="weather_overview">
              <img
                alt="weather"
                className="weather_icon"
                color="white"
                src={`icons/${data?.weather[0]?.icon}.png`}
              />
              <p className="description">{data?.weather[0]?.description}</p>
              <p className="temperature">{Math.round(data?.main?.temp)}</p>
              <span className="temp_degrees">{"°C"}</span>
              <p className="feels_like">
                Feels like {Math.round(data?.main?.feels_like)}
              </p>
              <span className="feels_like_degrees">{"°C"}</span>
            </div>
          </div>
          <div className="right_container">
            <h4 className="name">
              <MdLocationOn /> {data?.name}, {data?.sys?.country}
            </h4>
            <p className="name">
              {now.getDate()}/{now.getMonth()}/{now.getFullYear()}
            </p>
            <p className="name">{daysOfWeek[now.getDay()]}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
