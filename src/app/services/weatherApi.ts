import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../../constants";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  tagTypes: ['weather'],
  endpoints: (builder) => ({
    getCurrentWeatherReport: builder.query({
      query: (params) => ({
        url: "weather",
        method: "GET",
        params
      }),
      providesTags: ['weather']
    }),
  }),
});

export const { useGetCurrentWeatherReportQuery, useLazyGetCurrentWeatherReportQuery } = weatherApi;
