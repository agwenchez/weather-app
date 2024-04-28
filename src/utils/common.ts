import { daysOfWeek, monthsOfYear } from "../constants";

export const formatUnixTimestamp = (timestamp: number): string => {
    // Convert UNIX timestamp to milliseconds
    const milliseconds = timestamp * 1000;
  
    // Create a new Date object
    const date = new Date(milliseconds);
  
    // Get day, month, and year components
    const day: number = date.getDate();
    const month: string = date.toLocaleString('default', { month: 'long' });
    const year: number = date.getFullYear();
  
    // Construct the formatted date string
    const formattedDate: string = `${day} ${month} ${year}`;
  
    return formattedDate;
  };
  
  export const formatTime12hr = (timestamp: number): string => {
    // Convert UNIX timestamp to milliseconds
    const milliseconds = timestamp * 1000;
  
    // Create a new Date object
    const date = new Date(milliseconds);
  
    // Get hours, minutes, and AM/PM components
    let hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const period: string = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
  
    // Construct the formatted time string
    const formattedTime: string = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  
    return formattedTime;
  };
  
 export  const getNextSixDays = (): string[] => {

    const today = new Date();
    const nextSixDays: string[] = [];
  
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
  
      const dayOfWeek = daysOfWeek[date.getDay()].slice(0, 3);
      const month = monthsOfYear[date.getMonth()].slice(0, 3);
      const day = date.getDate();
  
      const formattedDate = `${dayOfWeek} ${month} ${day}`;
      nextSixDays.push(formattedDate);
    }
  
    return nextSixDays;
  };
  
  