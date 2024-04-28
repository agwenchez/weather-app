interface FormattedDate {
  day: number;
  month: string;
  year: number;
  time: string;
}
export const formatDate = (inputDate: string): FormattedDate => {
  // Parse the input date string
  const date = new Date(inputDate);

  // Get day, month, and year components
  const day: number = date.getDate();
  const month: string = date.toLocaleString("default", { month: "long" });
  const year: number = date.getFullYear();

  // Get hours and minutes components
  let hours: number = date.getHours();
  let minutes: number | string = date.getMinutes();

  // Add leading zero if minutes is less than 10
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Determine if it's AM or PM
  const period: string = hours < 12 ? "AM" : "PM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;
  const time = `${hours}:${minutes} ${period}`;

  // Construct the formatted date string
  // const formattedDate: string = `${day} ${month} ${year}, ${hours}:${minutes} ${period}`;

  return { day, month, year, time };
};
