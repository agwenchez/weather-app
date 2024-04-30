import { useEffect, useState } from "react";
import { ForecastData } from "../../@types";
import { formatTime12hr, formatUnixTimestamp } from "../../utils";

interface ForecastProps {
  data: ForecastData;
}

const Forecast = ({ data }: ForecastProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [filterItem, setFilterItem] = useState<string>("");
  const [uniqueDays, setUniqueDays] = useState<string[]>([]);
  console.log("Data", data)

  useEffect(() => {
    const days: Set<string> = new Set();
    data?.list?.forEach((item) => {
      const formattedDay = formatUnixTimestamp(item.dt);
      if (!days.has(formattedDay)) {
        days.add(formattedDay);
      }
    });
    setUniqueDays(["All Days", ...Array.from(days)]);
  }, [data]);

  const handleFilter = (index: number, filterItem: string) => {
    setActiveIndex(index);
    setFilterItem(filterItem);
  };

  const dataToDisplay =
    activeIndex > 0
      ? data?.list?.filter(
          (item) => formatUnixTimestamp(item.dt) === filterItem
        )
      : data?.list;

  return (
    <>
      <div className="heading">Next 5 Days</div>
      <div className="filter-container">
        {uniqueDays?.map((item, index) => (
          <div
            key={item}
            className={`filter-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleFilter(index, item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="daily-forecast-section">
        {dataToDisplay?.map((item) => (
          <>
            <div
              className={`${
                !data
                  ? "loading daily-weather-card"
                  : "daily-weather-forecast-card"
              }`}
            >
              <div className="daily-weather-forecast-date-time">
                <div
                  className={`${
                    !data
                      ? "loading daily-weather-forecast-date"
                      : "daily-weather-forecast-date"
                  }`}
                >
                  {formatUnixTimestamp(item.dt)}
                </div>
                <div
                  className={`${
                    !data
                      ? "loading daily-weather-forecast-time"
                      : "daily-weather-forecast-time"
                  }`}
                >
                  {formatTime12hr(item.dt)}
                </div>
              </div>
              <img
                src={`/static/${item?.weather[0]?.icon}.svg`}
                alt="day_icon"
                className={`${
                  !data
                    ? "loading daily-weather-forecast-icon"
                    : "daily-weather-forecast-icon"
                }`}
              />
              <div
                className={`${
                  !data
                    ? "loading daily-forecast-weather-details"
                    : "daily-forecast-weather-details"
                }`}
              >
                <div
                  className={`${
                    !data
                      ? "loading daily-weather-forecast-temperature"
                      : "daily-weather-forecast-temperature"
                  }`}
                >
                  {item?.main?.temp}
                </div>
                <div
                  className={`${
                    !data
                      ? "loading daily-weather-forecast-description"
                      : "daily-weather-forecast-description"
                  }`}
                >
                  {item?.weather[0]?.main}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Forecast;
