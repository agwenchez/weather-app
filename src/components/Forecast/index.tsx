import { getNextSixDays } from "../../utils";

interface ForecastProps {}
const Forecast = () => {
  console.log("Next ", getNextSixDays());
  return (
    <>
      <div className="heading">Next 5 Days</div>
      <div className="daily-forecast-section">
        <div className="filter-container">
          {getNextSixDays().map((item) => (
            <div key={item} className="filter-item">{item}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Forecast;
